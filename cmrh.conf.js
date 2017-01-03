const sass = require('node-sass');

module.exports = {
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  extensions: ['.css', '.scss'],
  preprocessCss: (data, filename) => sass.renderSync({ data }).css,
};
