/* eslint-disable global-require */
const index = require('./index-web');
/**
 * @fileOverview Main Node entry point
 */
module.exports = {
  ...index,
  // Node.js specific utilities
  ...(require('./utils/cli')),
  ...(require('./utils/encodings')),
  ...(require('./utils/fs')),
};
