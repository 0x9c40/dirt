const through = require("through2");
const wsock = require("websocket-stream");
const stream = wsock(`ws://${location.host}`);

var app = new Vue({
  el: "#app",

  data: {
    output: [],
  },

  methods: {
    submit(ev) {
      ev.preventDefault();
      stream.write(my_form.elements.msg.value + "\n");
      my_form.reset();
    },
  },
});

stream.pipe(
  through(function (buf, enc, next) {
    app.output.push(buf.toString());
    next();
  })
);
