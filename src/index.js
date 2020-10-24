console.log("Trying to get content from another origin...");

fetch("http://localhost:8080/api")
  .then((res) => res.text())
  .then(console.log);
