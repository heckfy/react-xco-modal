const webpack = require("webpack")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

var reactExternal = {
  root: "React",
  commonjs2: "react",
  commonjs: "react",
  amd: "react"
}
var reactDOMExternal = {
  root: "ReactDOM",
  commonjs2: "react-dom",
  commonjs: "react-dom",
  amd: "react-dom"
}

module.exports = {
  entry: "./src/index.tsx",
  devtool: false,
  mode: "production",
  externals: {
    react: reactExternal,
    "react-dom": reactDOMExternal
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json"
      })
    ]
  },
  output: {
    filename: "index.js",
    path: __dirname + "/dist",
    publicPath: "/",
    libraryTarget: "commonjs2"
  }
}
