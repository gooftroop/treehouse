// import moduleAlias from 'module-alias';
//
// moduleAlias.addAlias('axon', './src')
import 'module-alias/register';


import Exception, { codes } from './src/exception';
const error = {
  Exception,
  codes,
}

export { Server } from './src/main';
export { Logger } from './src/utils/logger';
export { error }
