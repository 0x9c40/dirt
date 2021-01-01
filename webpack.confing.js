module.exports = {
  module: {
    rules: [
      { test: /\.jpg$/, loader: "file-loader" },
      { test: /\.png$/, loader: "url-loader" },
    ],
  },
  output: {
    publicPath: "http://cdn.example.com/[hash]/",
  },
};
