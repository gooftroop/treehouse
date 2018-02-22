import 'module-alias/register';
import Exception, { codes } from 'axon/src/exception';

const error = {
  Exception,
  codes,
};

export { Server } from 'axon/src/main';
export { Logger } from 'axon/src/utils/logger';
export { error };
