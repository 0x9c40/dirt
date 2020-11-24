module.exports = 42;
const file2 = require("./file2.js?required_from_file1");
const file3 = require("./file3");

console.log("all modules are loaded in file1");
console.log("__resourceQuery", __resourceQuery);
