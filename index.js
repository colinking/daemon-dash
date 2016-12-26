if (process.env.NODE_ENV === 'production') {
  require('./dist/server.bundle.js');
} else {
  // TODO: polyfill server code for dev
  require('./dist/server.bundle.js');
}
