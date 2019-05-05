const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
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
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: "[name]__[local]___[hash:base64:5]"
              }
            },
            "sass-loader"
          ]
        })
      },
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "index.css"
    })
  ],
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
    publicPath: "/"
  }
}
