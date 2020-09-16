const { spawn } = require("child_process");
const ps = spawn("git", ["--no-pager", "log", "--oneline"]);
ps.stdout.pipe(process.stdout);
