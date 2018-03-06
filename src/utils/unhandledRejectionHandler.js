import Logger from 'axon/utils/logger';

const LOGGER: Object = Logger.getLogger('error');

/**
 * [unhandledRejectionHandler description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function unhandledRejectionHandler(e: Error): void {
  if (LOGGER) {
    LOGGER.error(`An unhandled promise rejection occurred: ${e}`);
  }
}

export { unhandledRejectionHandler };
