import mainImage from "./images/main.png";
// import mainImage2 from "./images/inside/SUN.jpg";
const mainImage3 = require("./images/inside/SUN.jpg?lol=111");

// console.log("success", mainImage, mainImage2, mainImage3);
console.log("success", mainImage, mainImage3);
console.log(module.loaded);
console.log(module.id, require.resolve("./index.js"));
