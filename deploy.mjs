import { execSync } from "node:child_process";
const run = cmd => execSync(cmd, { stdio: "inherit" });

run("npm install");
run("npm run build");
run("git checkout publish");
run("git rm -rf .");
run("cp -R dist/* .");
run("rm -rf dist");
run("git add index.html assets vite.svg");
run('git commit -m "Auto deploy from main branch"');
run("git push origin publish");
run("git checkout main");

console.log("Deployment complete!");
