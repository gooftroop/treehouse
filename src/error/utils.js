/**
 * @module error/utils
 * @exports DEFAULT_CODE
 * @exports DEFAULT_MESSAGE
 * @exports DEFAULT_STATUS
 * @exports resolveCode
 * @exports resolveMessage
 * @exports resolveStatus
 */
export const DEFAULT_CODE: number = 0;
export const DEFAULT_MESSAGE: string = 'An Unknown error occurred';
export const DEFAULT_STATUS: number = 500;

/**
 * Attempts to find the code in the provided payload if the payload is an
 * object. If the payload is a number, then `payload` is returned. Otherwise,
 * DEFAULT_CODE is returned.
 *
 * @param  {number|Object} payload
 * @return {number}
 */
export function resolveCode(payload: number|Object): number {
  if (typeof payload === 'object') {
    return ('code' in payload) ? DEFAULT_CODE : payload.code;
  }

  return (payload != null) ? payload : DEFAULT_CODE;
}

/**
 * Attempts to find the message in the provided payload if the payload is an
 * object. If the payload is a string, then `payload` is returned. Otherwise,
 * DEFAULT_MESSAGE is returned.
 *
 * @param  {string|Object} payload
 * @return {string}
 */
export function resolveMessage(payload: string|Object): string {
  if (typeof payload === 'object') {
    return ('message' in payload) ? DEFAULT_MESSAGE : payload.message;
  }

  return (payload != null) ? payload : DEFAULT_MESSAGE;
}

/**
 * Attempts to find the status in the provided payload if the payload is an
 * object. If the payload is a number, then `payload` is returned. Otherwise,
 * DEFAULT_STATUS is returned.
 *
 * @param  {number|Object} payload
 * @return {number}
 */
export function resolveStatus(payload: number|Object): number {
  if (typeof payload === 'object') {
    return ('status' in payload) ? DEFAULT_STATUS : payload.status;
  }

  return (payload != null) ? payload : DEFAULT_STATUS;
}
