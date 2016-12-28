const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/main.jsx'),

  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      include: /client/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015'],
      },
    }, {
      test: /\.css$/,
      include: /client/,
      loaders: ['style', 'css'],
    }],
  },
};
