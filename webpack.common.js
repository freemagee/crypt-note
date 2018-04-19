const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  entry: {
    main: resolve('src/index.jsx')
  },
  output: {
    path: resolve('dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*.*', 'dist/static', 'dist']),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ],
};
