/* eslint-disable global-require */

/*
 * Run the bundled server code in production, and run the runtime-generated
 * server code in development.
 */
if (process.env.NODE_ENV !== 'development') {
  process.env.NODE_ENV = 'production';
  require('./dist/server.bundle.js');
} else {
  require('css-modules-require-hook/preset');
  require('./server/server.js');
}
/* eslint-enable global-require */
