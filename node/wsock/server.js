const http = require("http");
const through = require("through2");
const wsock = require("websocket-stream");
const finalhandler = require("finalhandler");
const serve_static = require("serve-static");

const serve = serve_static(__dirname + "/public", { index: ["index.html"] });

const server = http.createServer((req, res) => {
  serve(req, res, finalhandler(req, res));
});

server.listen(5000);

wsock.createServer({ server }, (stream) => {
  stream.pipe(louder()).pipe(stream);
});

function louder() {
  return through(function (buf, enc, next) {
    next(null, buf.toString().toUpperCase());
  });
}
