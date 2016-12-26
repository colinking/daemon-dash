const fs = require('fs');
const path = require('path');

let nodeModules = {};
fs.readdirSync('node_modules').filter(x => {
  return ['.bin'].indexOf(x) === -1;
}).forEach(mod => {
  nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
  entry: path.resolve(__dirname, 'server/server.js'),
  target: 'node',
  externals: nodeModules,

  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'server.bundle.js'
  },

  module: {
    loaders: [{
      loader: 'json-loader',
      test: /\.json$/
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  }
};
