import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

function run(cmd, options = {}) {
    if (options.dry) {
        console.log("[dry-run] " + cmd);
        return;
    }

    try {
        execSync(cmd, { stdio: "inherit" });
    } catch (err) {
        console.error("Command failed:", cmd);
        throw err;
    }
}

function runSilent(cmd) {
    try {
        return execSync(cmd).toString().trim();
    } catch (err) {
        console.error("Command failed:", cmd);
        throw err;
    }
}

function copyRecursive(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function removeRecursive(targetPath) {
    if (!fs.existsSync(targetPath)) return;
    fs.rmSync(targetPath, { recursive: true, force: true });
}

function cleanWorkingDirectory() {
    const items = fs.readdirSync(".", { withFileTypes: true });

    for (const item of items) {
        if (item.name === ".git") continue;
        if (item.name === ".gitignore") continue;
        if (item.name === ".gitattributes") continue;

        removeRecursive(item.name);
    }
}

// ----------------------------------------------------------------------
// Parse Arguments
// ----------------------------------------------------------------------

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const force = args.includes("--force");

// ----------------------------------------------------------------------
// MAIN SCRIPT
// ----------------------------------------------------------------------

const originalBranch = runSilent("git rev-parse --abbrev-ref HEAD");

async function main() {
    try {
        console.log("Checking current branch...");
        const currentBranch = runSilent("git rev-parse --abbrev-ref HEAD");
        if (currentBranch !== "main" && !force) {
            console.error("You are not on the 'main' branch. Use --force to override.");
            process.exit(1);
        }

        console.log("Fetching remote...");
        run("git fetch origin");

        // Check local working tree cleanliness
        const diff = runSilent("git status --porcelain");
        if (diff.length > 0 && !force) {
            console.error("Working tree is not clean. Commit or stash changes first.");
            console.error("Use --force to skip this check.");
            process.exit(1);
        }

        // Hash comparison
        const localHash = runSilent("git rev-parse main");
        const remoteHash = runSilent("git rev-parse origin/main");

        if (localHash !== remoteHash && !force) {
            console.error("Local main is not up to date with origin/main. Run 'git pull'.");
            console.error("Use --force to skip this check.");
            process.exit(1);
        }

        console.log("main is clean and up-to-date.");

        // ------------------------------------------------------------------
        // BUILD
        // ------------------------------------------------------------------

        console.log("Installing dependencies...");
        if (fs.existsSync("package-lock.json")) {
            run("npm ci", { dry: dryRun });
        } else {
            run("npm install", { dry: dryRun });
        }

        console.log("Building project...");
        run("npm run build", { dry: dryRun });

        if (!fs.existsSync("dist") && !dryRun) {
            console.error("Build failed: dist folder missing.");
            process.exit(1);
        }

        // ------------------------------------------------------------------
        // DEPLOY
        // ------------------------------------------------------------------

        console.log("Checking out publish branch...");
        run("git checkout publish", { dry: dryRun });

        console.log("Cleaning working directory...");
        if (!dryRun) cleanWorkingDirectory();

        console.log("Copying build files...");
        if (!dryRun) copyRecursive("dist", ".");

        console.log("Removing dist folder...");
        if (!dryRun) removeRecursive("dist");

        console.log("Staging all files...");
        run("git add .", { dry: dryRun });

        console.log("Committing...");
        run(`git commit -m "Auto deploy from main branch"`, { dry: dryRun });

        console.log("Pushing...");
        run("git push origin publish", { dry: dryRun });

        console.log("Switching back to main...");
        run(`git checkout ${originalBranch}`, { dry: dryRun });

        console.log("Deployment complete.");
    } catch (err) {
        console.error("Deployment failed!");

        // Try to recover original branch
        try {
            if (originalBranch) {
                console.log("Returning to original branch:", originalBranch);
                run(`git checkout ${originalBranch}`);
            }
        } catch {}

        process.exit(1);
    }
}

main();

