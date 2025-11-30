import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

function run(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

function runSilent(cmd) {
  return execSync(cmd).toString().trim();
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    if (entry === ".git") continue;
    fs.rmSync(path.join(dir, entry), { recursive: true, force: true });
  }
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, item.name);
    const destPath = path.join(dest, item.name);
    if (item.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const PUBLISH_DIR = ".publish";

async function main() {
  try {
    // Make sure .publish exists as a worktree
    if (!fs.existsSync(PUBLISH_DIR)) {
      console.error(`Worktree '${PUBLISH_DIR}' missing!`);
      console.error(`Run: git worktree add ${PUBLISH_DIR} publish`);
      process.exit(1);
    }

    console.log("Checking branch...");
    const branch = runSilent("git rev-parse --abbrev-ref HEAD");
    if (branch !== "main") {
      console.error("You must be on 'main' to deploy.");
      process.exit(1);
    }

    console.log("Fetching remote...");
    run("git fetch origin");

    // Check clean state
    const diff = runSilent("git status --porcelain");
    if (diff.length > 0) {
      console.error("Working tree not clean. Commit or stash first.");
      process.exit(1);
    }

    console.log("Installing dependencies...");
    if (fs.existsSync("package-lock.json")) run("npm ci");
      else run("npm install");

    console.log("Building...");
    run("npm run build");

    if (!fs.existsSync("dist")) {
      console.error("Build failed: dist missing.");
      process.exit(1);
    }

    console.log(`Cleaning ${PUBLISH_DIR}...`);
    emptyDir(PUBLISH_DIR);

    console.log(`Copying dist → ${PUBLISH_DIR}...`);
    copyRecursive("dist", PUBLISH_DIR);

    // --- Fügt .htaccess für SPA-Fallback hinzu ---
    const htaccessPath = path.join(PUBLISH_DIR, ".htaccess");
    const htaccessContent = `
RewriteEngine On
RewriteBase /
RewriteRule ^index\\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
`.trim() + "\n";

    fs.writeFileSync(htaccessPath, htaccessContent, { encoding: "utf8" });
    console.log(".htaccess for SPA routing added.");


    console.log("Committing...");
    run(`git -C ${PUBLISH_DIR} add .`);
    run(`git -C ${PUBLISH_DIR} commit -m "Auto deploy"`);

    console.log("Pushing...");
    run(`git -C ${PUBLISH_DIR} push origin publish`);

    console.log("Deployment complete.");
  } catch (err) {
    console.error("\nDeployment failed!");
    console.error(err);
    process.exit(1);
  }
}

main();

