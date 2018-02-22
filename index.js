import 'module-alias/register';

import Exception, { codes } from '@axon/exception';
const error = {
  Exception,
  codes,
}

export { Server } from '@axon/main';
export { Logger } from '@axon/utils/logger';
export { error }
