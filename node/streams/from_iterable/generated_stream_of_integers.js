const { Readable } = require("stream");

async function* generate() {
  let counter = 0;
  while (true) {
    await new Promise(function(resolve) {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    yield `${counter++}`;
  }
}

module.exports = Readable.from(generate());
