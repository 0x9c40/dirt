const fs = require("fs");

const text = fs.createReadStream("text.txt", {
  encoding: "utf-8",
  highWaterMark: 4,
});

async function print(readable) {
  readable.setEncoding("utf8");
  let data = "";
  let count = 0;
  for await (const chunk of readable) {
    data += `${count++} ${chunk}`;
  }
  console.log(data);
}

print(text).catch(console.error);
