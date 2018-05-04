const DEFAULT_CODE: number = 0;
const DEFAULT_MESSAGE: string = 'An Unknown error occurred';

/**
 * [error description]
 * @type {[type]}
 */
export function convertSystemFetchErrorStatus(error: FetchError): Number {
  if (error.type === 'system') {
    switch (error.errno) {
      case 'ENOTFOUND':
        return 503;
      case 'ECONNRESET':
        return 503;
      case 'ECONNREFUSED':
        return 503;
      default:
        return 500;
    }
  }

  switch (error.type) {
    case 'body-timeout':
      return 503;
    case 'invalid-json':
      return 400;
    case 'max-redirect':
      return 503;
    case 'max-size':
      return 400;
    case 'no-redirect':
      return 503;
    case 'request-timeout':
      return 503;
    default:
      return 500;
  }
}

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

  return (typeStatus !== 'number' || typeStatus !== 'string') ? DEFAULT_CODE : status;
}
