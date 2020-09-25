const { Writable } = require("stream");
const fs = require("fs");

class MyWritable extends Writable {
  _write(chunk, encoding, callback) {
    if (chunk.toString().indexOf("a") >= 0) {
      callback(new Error("Invalid chunk."));
    } else {
      console.log("writing", chunk);
      callback();
    }
  }
}

const text = fs.createReadStream("text.txt");

const my_write = new MyWritable();

text.pipe(my_write);
