/**
 * @module exception
 * @exports ApiException
 * @exports AuthorizationException
 * @exports Exception
 * @exports InternalException
 * @exports InvalidRequestException
 * @exports ServiceUnavailableException
 */
import {
  resolveCode,
  resolveMessage,
  resolveStatus,
} from 'treehouse/exception/utils';
import * as codes from 'treehouse/exception/codes';

/**
 * <code>ApiException</code> provides a <code>message</code> and
 * <code>stack trace</code> as <code>Exception</code> does, but also provides a
 * response <code>status</code> and an error </code>code</code> for use in
 * production debugging/support.
 *
 * @class
 * @extends Error
 */
export default class Exception extends Error {
  code: number;

  error: Object;

  details: Any;

  /**
   * Supports both <code>Error</code>-compliant and Treehouse-specific
   * paradigms of instantating a new <code>Exception</code>.
   * <code>Error</code>-compliant instantion of an Exception:
   * ```
   * new Exception("some message", 1);
   * ```
   *
   * Non-standard (or Treehouse-specific) instantation expects a payload
   * similar to those found in <code>codes.js</code> and extracts the
   * <code>error code</code>, and the <code>message</code>.
   * Optionally accepts <code>Error</code> for additional meta information as
   * the second or third argument.
   *
   * @constructor
   * @param  {string|Object}      payload  Either the error message or payload.
   * @param  {number|Error|null}  code     Optional. The error status.
   *                                       Error can be supplied instead.
   * @param  {Error|null}         e        Optional. The originating Error.
   * @return {void}
   */
  constructor(payload: String | Object, code: ?Number | ?Error, e: ?Error): void {
    super(resolveMessage(payload));
    this.code = (typeof code === 'number') ? code : resolveCode(payload);
    this.error = e;
    this.details = (typeof payload === 'object') && payload.details;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(this.message)).stack;
    }
  }
}

/**
 * Base <code>Exception</code> class for all Treehouse-specifc API
 * <code>Exception</code>.
 * It is recommended to either use this error to wrap generic
 * <code>Exception</code>s or to create application/context-specific Exception
 * classes that extend <code>ApiException</code> in order to better/more easily
 * consume and  alter your application's behavior when <code>Exception</code>
 * are thrown.
 *
 * @class
 * @extends Exception
 */
export class ApiException extends Exception {
  status: number;

  /**
   * Follows the same pattern of instantation as <code>Exception</code>, except
   * constructor accepts the additional, optional parameter.
   * <code>status</code> after <code>payload</code>. The remaining signature
   * remains unaltered.
   *
   * @constructor
   * @param  {string|Object}      payload Either the error message or payload.
   * @param  {number|Error|null}  status  Optional. The error status.
   *                                      Only Error can be supplied instead.
   * @param  {number|Error|null}  code    Optional. The error status.
   *                                      Error can be supplied instead.
   * @param  {Error|null}         e       Optional. The originating Error.
   * @return {void}
   */
  constructor(payload: String | Object, status: ?Number | ?Error, code: ?Number | ?Error, e: ?Error): void {
    super(payload, code, ((status instanceof Error) ? status : e));

    this.status = (typeof status === 'number') ? resolveStatus(status) : resolveStatus(payload);
  }
}

/**
 * Exception used when a request fails security or authorization checks to
 * prompt the User or Client to refresh their session, or to indicate to other
 * services to act similarly.
 *
 * @class
 * @extends ApiException
 */
export class AuthorizationException extends ApiException {
  constructor(e: ?Error) {
    super(codes.NOT_ALLOWED, e);
  }
}

/**
 * Thrown when an unhandled or unrecoverable exception is encountered.
 * Optionally accepts a custom message when instantating.
 *
 * @class
 * @extends ApiException
 */
export class InternalException extends ApiException {
  constructor(message: String, e: ?Error) {
    super(codes.FATAL_ERROR(message), e);
  }
}

/**
 * Generic exception used to signal to a User/Client that their request was
 * invalid. Optionally accepts a custom message when instantating.
 *
 * @class
 * @extends ApiError
 */
export class InvalidRequestException extends ApiException {
  constructor(message: String, e: ?Error) {
    super(codes.INVALID_REQUEST(message), e);
  }
}

/**
 * Exception indicating that an external or internal service is unreachable or
 * unavailable. Optionally accepts a custom message when instantating.
 *
 * @class
 * @extends ApiError
 */
export class ServiceUnavailableException extends ApiException {
  constructor(message: String, e: ?Error) {
    super(codes.SERVICE_UNAVAILABLE(message), e);
  }
}
