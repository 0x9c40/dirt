const fs = require("fs");

const text = fs.createReadStream("text.txt", {
  encoding: "utf-8",
  highWaterMark: 4,
});

let string_number = 0;

const what = text.on("data", function on_data(chunk) {
  console.log(string_number++, chunk);
  what.removeListener("data", on_data);
});

setTimeout(function () {
  text.resume();
}, 1000);
