const { createGunzip } = require("zlib");
process.stdin.pipe(createGunzip()).pipe(process.stdout);
