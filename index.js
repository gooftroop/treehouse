const moduleAlias = require('module-alias');

moduleAlias(`${__dirname}/package.json`);

const axon = require('./dist/axon');

module.exports = axon;
