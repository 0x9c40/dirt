const _ = require("lodash");
const chokidar = require("chokidar");

const playlist = [];

const watcher = chokidar.watch("./container/*.mp3");

watcher.on("add", path => {
  playlist.push(path);
  console.log(playlist);
});
