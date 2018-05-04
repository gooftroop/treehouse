import {
  convertSystemFetchErrorStatus,
  resolveCode,
  resolveError,
  resolveMessage,
  resolveStatus,
} from 'axon/exception/utils';
import * as codes from 'axon/exception/codes';

/**
 * [code description]
 * @type {[type]}
 */
export default class Exception extends Error {
  code: number;
  error: Object;
  status: number;

  /**
   * [constructor description]
   * @param  {[type]} payload [description]
   * @param  {[type]} code    [description]
   * @param  {[type]} status  [description]
   * @param  {[type]} e       [description]
   * @return {[type]}         [description]
   */
  constructor(payload: string | Object, status, e: Error) {
    super(resolveMessage(payload));
    this.code = resolveCode(payload);
    this.status = resolveStatus(payload, status);
    this.error = resolveError(e || status);

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(this.message)).stack;
    }
  }
}

/**
 * [error description]
 * @type {[type]}
 */
export class AuthorizationException extends Exception {
  /**
   * [constructor description]
   * @param {[type]} errors [description]
   */
  constructor(e: ?Error) {
    super(codes.NOT_ALLOWED, e);
  }
}

/**
 * [errors description]
 * @type {[type]}
 */
export class GraphQLException extends Exception {
  /**
   * [constructor description]
   * @param {[type]} errors [description]
   */
  constructor(e: ?Error) {
    super(codes.GENERAL_ERROR(e.message), e);
  }
}

/**
 * [message description]
 * @type {[type]}
 */
export class InternalException extends Exception {
  constructor(message: String, e: ?Error) {
    super(codes.FATAL_ERROR(message), e);
  }
}

/**
 * [message description]
 * @type {[type]}
 */
export class InvalidRequestException extends Exception {
  /**
   * [constructor description]
   * @param {[type]} errors [description]
   */
  constructor(message: String, e: ?Error) {
    super(codes.INVALID_REQUEST(message), e);
  }
}

/**
 * [error description]
 * @type {[type]}
 */
export class NetworkException extends Exception {
  /**
   * [constructor description]
   * @param {[type]} error [description]
   */
  constructor(e: ?FetchError) {
    super(codes.NETWORK_ERROR(convertSystemFetchErrorStatus(e)), e);
  }
}

/**
 *
 */
export class ServiceUnavailableException extends Exception {
  /**
   * [constructor description]
   * @param {[type]} errors [description]
   */
  constructor(message: String, e: ?Error) {
    super(codes.SERVICE_UNAVAILABLE(message), e);
  }
}

export { codes };
