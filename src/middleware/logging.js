import { getLogger } from 'jarvis/utils/logger';

const LOGGER: Object = getLogger('request');

/**
 * TODO use morgan
 */
export function accessLogger(request: Object, response: Object, next: Function): void {
  LOGGER.info({
    method: request.method,
    url: request.url,
    headers: request.headers,
  });
  next();
}
