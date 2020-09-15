const fs = require("fs");
const { Transform } = require("stream");

fs.createReadStream(process.argv[2]).pipe(swap_e_for_a).pipe(to_upper).pipe(process.stdout);

const swap_e_for_a = new Transform({
  transform(chunk, enc, callback) {
    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i] == 101) {
        chunk[i] = 97;
      }
    }
    this.push(chunk);
  },
});

const to_upper = new Transform({
  transform(chunk, enc, callback) {
    this.push(chunk.toString().toUpperCase());
  },
});
