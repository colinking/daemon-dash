if (process.env.NODE_ENV === 'production') {
  require('./dist/server.bundle.js');
} else {
  require('./server/server.js');
}
