const fs = require("fs");

const text = fs.createReadStream("text.txt", {
  encoding: "utf-8",
  highWaterMark: 4,
});

console.log(text.isPaused()); // === false
text.pause();
console.log(text.isPaused()); // === true
text.resume();
console.log(text.isPaused()); // === false
