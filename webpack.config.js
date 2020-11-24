const path = require("path");

module.exports = {
  // mode: "development",
  target: "node",
  devtool: "source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.jpg/,
        type: "asset/resource",
      },
      {
        test: /\.png/,
        type: "asset/resource",
        generator: {
          filename: "../public/lol/lol/[hash][ext][query]",
        },
      },
    ],
  },
};
