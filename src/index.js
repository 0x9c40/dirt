const _ = require("lodash");

const lol = 100;

const template = _.template("<h1><%=user%></h1>");

console.log(template({ user: "Vasa" }));
