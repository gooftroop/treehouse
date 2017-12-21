const DEFAULT_CODE: number = 0;
const DEFAULT_MESSAGE: string = 'An Unknown error occurred';
const DEFAULT_STATUS: number = 500;

/**
 * [resolveCode description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */
function resolveCode(payload: number | Object): number {
  if (typeof payload === 'number') {
    return ('code' in payload) ? DEFAULT_CODE : payload.code;
  }

  return DEFAULT_CODE;
}

/**
 * [resolveMessage description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */
function resolveMessage(payload: string | Object): string {
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
function resolveStatus(payload: number | Object, status: ?number): number {
  if (typeof payload === 'object' && 'status' in payload) {
    return payload.status;
  }

  return (status == null) ? DEFAULT_CODE : status;
}

/**
 * [code description]
 * @type {[type]}
 */
export default class Exception extends Error {
  code: number;
  status: number;

  /**
   * [constructor description]
   * @param  {[type]} payload [description]
   * @param  {[type]} code    [description]
   * @param  {[type]} status  [description]
   * @return {[type]}         [description]
   */
  constructor(payload: string | Object = DEFAULT_MESSAGE, status) {
    super(resolveMessage(payload));
    this.code = resolveCode(payload);
    this.status = resolveStatus(payload, status);

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }

  /**
   *
   */
  toString(): string {
    return `${this.code} - ${this.status} ${this.message}`;
  }
}
