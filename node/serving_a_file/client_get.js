const http = require("http");
const req = http.request(
  {
    port: 5000,
  },
  (res) => {
    console.log(res.statusCode);
    res.pipe(process.stdout);
  }
);
req.end();
