const file1 = require("./file1.js?required_from_index");
const file2 = require("./file2.js?required_from_index");
const file3 = require("./file3.js");

console.log("file", file1, file2, file3);
