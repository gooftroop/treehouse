import 'module-alias/register';
// import moduleAlias from 'module-alias';
//
// console.log(__dirname);
// moduleAlias.addAlias('axon', `${__dirname}/src`);

import Exception, { codes } from 'axonSrc/exception';
const error = {
  Exception,
  codes,
}

export { Server } from 'axonSrc/main';
export { Logger } from 'axonSrc/utils/logger';
export { error }
