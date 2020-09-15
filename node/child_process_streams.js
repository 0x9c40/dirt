const { spawn } = require("child_process");

const ps = spawn("grep", ["apple"]);

ps.stdout.pipe(process.stdout);

ps.stdin.write("hello\n");
ps.stdin.write("apple\n");
ps.stdin.write("hello cucumber\n");
ps.stdin.write("apple > cucumber\n");
ps.stdin.end();
