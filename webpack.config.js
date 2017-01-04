const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: path.resolve(__dirname, 'client/main.jsx'),

  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
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
      test: /\.scss$/,
      include: /client/,
      loader: ExtractTextPlugin.extract('style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'sass-loader'),
    }],
  },

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
      }
    }),
  ],
};

const serverConfig = {
  entry: path.resolve(__dirname, 'server/server.js'),
  target: 'node',
  externals: [nodeExternals()],

  node: {
    __dirname: false,
    __filename: false,
  },

  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'server.bundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
      },
    }, {
      test: /\.scss$/,
      include: /client/,
      loader: 'css-loader/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader',
    }],
  },
};

module.exports = [config, serverConfig];
