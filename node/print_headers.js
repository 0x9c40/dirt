const http = require("http");
const through = require("through2");
const qs = require("qs");
const concat = require("concat-stream");

const server = http.createServer(function (req, res) {
  req.pipe(counter()).pipe(concat({ encoding: "string" }, onbody));

  function counter() {
    let size = 0;
    return through(function (buf, enc, next) {
      size += buf.length;
      console.log(size);
      if (size > 20) next(null, null);
      else next(null, buf);
    });
  }

  function onbody(body) {
    let params = qs.parse(body);
    console.log(params);
    res.end("ok\n");
  }
});

server.listen(5000);
