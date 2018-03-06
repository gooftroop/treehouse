console.log(`NODE_CONFIG_DIR as seen from axon: ${process.env.NODE_CONFIG_DIR}`);

const axon = require('./dist/axon');

module.exports = axon;
