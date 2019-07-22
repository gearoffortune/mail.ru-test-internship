/*global require: readonly, module: writable*/
const path = require('path');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader']
      }
    ]
 }
};
