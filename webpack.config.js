const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, { mode }) => {
  return {
    mode,
    devServer: {
      contentBase: "./dist",
      hot: true,
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          pathRewrite: { "^/api": "" },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        favicon: "./assets/favicon.ico",
      }),
      new webpack.ProgressPlugin(),
    ],
  };
};
