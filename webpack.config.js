const path = require('path');

module.exports = {
  entry: './src/app.jsx',
  output: {
      path: path.join(__dirname, 'app'),
      publicPath: '/app',
      filename: 'app.bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
  watch: true
};
