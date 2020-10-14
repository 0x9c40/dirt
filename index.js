const execa = require('execa');

const commit = execa.sync('git', ['rev-parse', 'HEAD']).stdout.slice(0, 7);

console.log("Commit:", commit);
