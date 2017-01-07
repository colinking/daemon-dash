const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

/*
 * Load environment variables.
 */
if (fs.existsSync(path.join(__dirname, '.env'))) {
  dotenv.config();
}

/*
 * Run the bundled server code in production, and run the runtime-generated
 * server code in development.
 */

/* eslint-disable global-require */
if (process.env.NODE_ENV !== 'development') {
  process.env.NODE_ENV = 'production';
  require('./dist/server.bundle.js');
} else {
  require('css-modules-require-hook/preset');
  require('./server/server.js');
}
/* eslint-enable global-require */
