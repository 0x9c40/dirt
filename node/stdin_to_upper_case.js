const { Transform } = require("stream");

const to_upper = new Transform({
  transform(chunk, enc, callback) {
    this.push(chunk.toString().toUpperCase());
  },
});

process.stdin.pipe(to_upper).pipe(process.stdout);
