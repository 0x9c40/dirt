const net = require("net");

net
  .createServer(function (socket) {
    socket.pipe(socket);
  })
  .listen(5000);
