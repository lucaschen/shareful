const path = require("path");

const includePaths = [path.resolve(__dirname, "./src"), path.resolve(__dirname, "./node_modules/shareful/")];

module.exports = {
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,
    hot: true,
    watchContentBase: true
  },
  devtool: "source-map",
  entry: path.resolve(__dirname, "./src/App.js"),
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist",
    publicPath: "/"
  },
  resolve: {
    symlinks: false
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: includePaths,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        include: includePaths,
        use: [
          "style-loader",
          "css-loader?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]",
          "sass-loader"
        ]
      }
    ]
  }
};
