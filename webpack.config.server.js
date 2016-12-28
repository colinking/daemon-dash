const fs = require('fs');
const path = require('path');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = {
  entry: path.resolve(__dirname, 'server/server.js'),
  target: 'node',
  externals: nodeModules,

  node: {
    __dirname: false,
    __filename: false,
  },

  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'server.bundle.js',
  },

  module: {
    loaders: [{
      loader: 'json-loader',
      include: /server/,
      test: /\.json$/,
    }, {
      test: /\.js$/,
      include: /server/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
      },
    }],
  },
};
