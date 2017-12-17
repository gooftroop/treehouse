import { getLogger } from 'jarvis/utils/logger';

const LOGGER: Object = getLogger('root');

/**
 * [errorParser description]
 * @param  {[type]}   error    [description]
 * @param  {[type]}   request  [description]
 * @param  {[type]}   response [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
export function errorMiddleware(error: any, request: Object, response: Object, next: Function): void {
  const e: Object = { ...error };

  if (!('status' in e)) {
    e.status = 500;
  }

  if (!('code' in e)) {
    e.code = -1;
  }

  LOGGER.error(e);
  response.status(e.code).send(e);
}

/**
 * [notFoundError description]
 * @param  {[type]}   request  [description]
 * @param  {[type]}   response [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
export function notFoundError(request: Object, response: Object): void {
  response.status(404).send();
}
