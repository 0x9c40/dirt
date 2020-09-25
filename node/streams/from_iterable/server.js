const net = require("net");

const stream_of_integers = require("./generated_stream_of_integers");

net
  .createServer(function(socket) {
    stream_of_integers.pipe(socket);
  })
  .listen(5000);
