import Logger from 'axon/utils/logger';

const LOGGER: Object = Logger.getLogger();

/**
 * [sigIntHandler description]
 * @param  {[type]} void [description]
 * @return {[type]}      [description]
 */
function sigIntHandler(): void {
  if (LOGGER) {
    LOGGER.info('Captured ctrl-c');
  }

  process.exit(0);
}

export { sigIntHandler };
