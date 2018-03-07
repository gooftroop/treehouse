const moduleAlias = require('module-alias');

moduleAlias(`${__dirname}/package.json`);

/* eslint-disable import/first */
import Exception from 'axon/exception';
import Logger from 'axon/utils/logger';
import Server from 'axon/main';

import * as codes from 'axon/exception/codes';
/* eslint-enable import/first */

export default Server;
export { Exception, Logger, codes };
