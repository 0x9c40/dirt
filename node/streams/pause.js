const fs = require("fs");

const text = fs.createReadStream("text.txt", {
  encoding: "utf-8",
  highWaterMark: 4,
});

text.on("data", chunk => {
  console.log(`Received ${chunk.length} bytes of data.`);
  text.pause();
  console.log("There will be no additional data for 1 second.");
  setTimeout(() => {
    console.log("Now data will start flowing again.");
    text.resume();
  }, 1000);
});

text.on("readable", function() {
  console.log(`${this.read()}`);
});

text.on("end", function() {
  console.log("Fin...");
});
