const path = require("path");
const webpack = require("webpack");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  mode: "development",
  entry: {
    main: resolve('src/index.jsx')
  },
  output: {
    path: resolve("app"),
    publicPath : '/app/',
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|svg)$/,
        include: path.join(__dirname, "img"),
        loader: "url-loader?limit=30000&name=images/[name].[ext]"
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    },
    runtimeChunk: {
      name: "manifest",
    },
  },
  resolve: {
    modules: [resolve("app"), resolve("app/styles"), "node_modules"],
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin()
  // ],
  devtool: "cheap-module-eval-source-map"
};
