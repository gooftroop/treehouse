/**
 * @module error
 * @exports ApiError
 * @exports AuthorizationError
 * @exports InternalError
 * @exports InvalidRequestError
 * @exports ServiceUnavailableError
 * @exports codes
 */
import {
  resolveCode,
  resolveMessage,
  resolveStatus,
} from 'treehouse/error/utils';
import * as codes from 'treehouse/error/codes';

/**
 * Base <code>Error</code> class for all Treehouse-specifc Errors.
 * It is recommended to either use this error to wrap generic
 * <code>Error</code>s or to create application/context-specific Error classes
 * that extend <code>ApiError</code> in order to better/more easily consume and
 * alter your application's behavior when Errors are thrown.
 *
 * <code>ApiError</code> provides a <code>message</code> and
 * <code>stack trace</code> as <code>Error</code> does, but also provides a
 * response <code>status</code> and an error </code>code</code> for use in
 * production debugging/support.
 *
 * @class
 * @extends Error
 */
export default class ApiError extends Error {
  code: number;
  error: Object;
  status: number;

  /**
   * Supports both standard and Treehouse-specific paradigms of instantating a new
   * <code>ApiError</code>.
   * Standard instantion of an ApiError:
   * ```
   * new ApiError("some message", 500);
   * ```
   *
   * Non-standard (or Treehouse-specific) instantation expects a payload similar to
   * those found in <code>codes.js</code> and extrats the
   * <code>error code</code>, <code>status</code>, and <code>message</code>.
   * Optionally accepts <code>Error</code> for additional meta information as
   * the second or third argument.
   *
   * @constructor
   * @param  {string|Object} payload  Either the error message or payload.
   * @param  {number} status          Optional. The error status.
   *                                  Error can be supplied instead.
   * @param  {Error} e                Optional. The originating Error.
   * @return {void}
   */
  constructor(payload: string|Object, status: ?number, e: ?Error): void {
    super(resolveMessage(payload));
    this.code = resolveCode(payload);
    this.status = (status != null) ? resolveStatus(status) : resolveStatus(payload);
    this.error = (!(status instanceof Error)) ? status : e;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(this.message)).stack;
    }
  }
}

/**
 * Error used when a request fails security or authorization checks to prompt
 * the User or Client to refresh their session, or to indicate to other
 * services to act similarly.
 *
 * @class
 * @extends ApiError
 */
export class AuthorizationError extends ApiError {
  constructor(e: ?Error) {
    super(codes.NOT_ALLOWED, e);
  }
}

/**
 * Thrown when an unhandled or unrecoverable error is encountered. Optionally
 * accepts a custom message when instantating.
 *
 * @class
 * @extends ApiError
 */
export class InternalError extends ApiError {
  constructor(message: String, e: ?Error) {
    super(codes.FATAL_ERROR(message), e);
  }
}

/**
 * Generic error used to signal to a User/Client that their request was
 * invalid. Optionally accepts a custom message when instantating.
 *
 * @class
 * @extends ApiError
 */
export class InvalidRequestError extends ApiError {
  constructor(message: String, e: ?Error) {
    super(codes.INVALID_REQUEST(message), e);
  }
}

/**
 * Error indicating that an external or internal Service is unreachable or
 * unavailable. Optionally accepts a custom message when instantating.
 *
 * @class
 * @extends ApiError
 */
export class ServiceUnavailableError extends ApiError {
  constructor(message: String, e: ?Error) {
    super(codes.SERVICE_UNAVAILABLE(message), e);
  }
}

export { codes };
