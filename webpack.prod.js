const common = require('./webpack.common.js');
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].css'
});

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = merge(common, {
  mode: 'production',
  // entry: {
  //   main: resolve('src/index.jsx')
  // },
  // output: {
  //   path: resolve('app'),
  //   publicPath: '/app/',
  //   filename: '[name].[chunkhash:8].js',
  //   chunkFilename: '[name].[chunkhash:8].chunk.js',
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ],
        })
      },
      {
        test: /\.(png|jpg|svg)$/,
        include: resolve('img'),
        loader: 'url-loader?limit=30000&name=images/[name].[ext]'
      }
    ]
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all'
  //       }
  //     }
  //   },
  //   runtimeChunk: {
  //     name: 'manifest'
  //   }
  // },
  devtool: 'source-map',
  plugins: [
    extractSass,
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
    // new ExtractTextPlugin({
    //   filename: '[name].[contenthash:8].css'
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: function(module) {
    //     // this assumes your vendor imports exist in the node_modules directory
    //     return module.context && module.context.indexOf('node_modules') !== -1;
    //   }
    // }),
    // //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   comments: false, // remove comments
    //   compress: {
    //     unused: true,
    //     dead_code: true, // big one--strip code that will never execute
    //     warnings: false, // good for prod apps so users can't peek behind curtain
    //     drop_debugger: true,
    //     conditionals: true,
    //     evaluate: true,
    //     drop_console: true, // strips console statements
    //     sequences: true,
    //     booleans: true,
    //   }
    // }),
    // new webpack.optimize.AggressiveMergingPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    // new ManifestPlugin({
    //   fileName: 'app-manifest.json'
    // }),
    // new InlineManifestWebpackPlugin({
    //   name: 'webpackManifest'
    // })
  ]
});
