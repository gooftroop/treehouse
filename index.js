// import 'module-alias/register';
import moduleAlias from 'module-alias';

console.log(__dirname);
moduleAlias.addAlias('@axon', `${__dirname}/src`);

import Exception, { codes } from '@axon/exception';
const error = {
  Exception,
  codes,
}

export { Server } from '@axon/main';
export { Logger } from '@axon/utils/logger';
export { error }
