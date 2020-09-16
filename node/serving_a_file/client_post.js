const http = require("http");
const req = http.request(
  {
    method: "POST",
    port: 5000,
  },
  (res) => {
    console.log(res.statusCode);
    res.pipe(process.stdout);
  }
);
req.end("END\n");
