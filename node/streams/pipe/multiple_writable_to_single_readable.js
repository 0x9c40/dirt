const fs = require("fs");

const first = fs.createReadStream("first.txt", {
  encoding: "utf-8",
  highWaterMark: 12,
});

const second = fs.createReadStream("second.txt", {
  encoding: "utf-8",
  highWaterMark: 12,
});

const writable = fs.createWriteStream("output.txt");

first.pipe(writable, { end: false });
second.pipe(writable, { end: false });
