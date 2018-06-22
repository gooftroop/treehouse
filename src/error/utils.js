/**
 * @module error/utils
 * @exports DEFAULT_CODE
 * @exports DEFAULT_MESSAGE
 * @exports DEFAULT_STATUS
 * @exports resolveCode
 * @exports resolveError
 * @exports resolveMessage
 * @exports resolveStatus
 */
export const DEFAULT_CODE: number = 0;
export const DEFAULT_MESSAGE: string = 'An Unknown error occurred';
export const DEFAULT_STATUS: number = 500;

/**
 * [resolveCode description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */
export function resolveCode(payload: number | Object): number {
  if (typeof payload === 'number') {
    return ('code' in payload) ? DEFAULT_CODE : payload.code;
  }

  return DEFAULT_CODE;
}

/**
 * [resolveError description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
export function resolveError(e: Error): Object {
  return { ...e };
}

/**
 * [resolveMessage description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */
export function resolveMessage(payload: string | Object): string {
  if (typeof payload === 'object') {
    return ('message' in payload) ? DEFAULT_MESSAGE : payload.message;
  }

  return payload;
}

/**
 * [resolveStatus description]
 * @param  {[type]} payload [description]
 * @param  {[type]} status  [description]
 * @return {[type]}         [description]
 */
export function resolveStatus(payload: number | Object, status: ?number): number {
  if (typeof payload === 'object' && 'status' in payload) {
    return payload.status;
  }

  const typeStatus: String = typeof (status);

  return (typeStatus !== 'number' || typeStatus !== 'string') ? DEFAULT_STATUS : status;
}
