/**
 * @module error/codes
 * @exports DEFAULT_FATAL_ERROR
 * @exports FATAL_ERROR
 * @exports DEFAULT_GENERAL_ERROR
 * @exports GENERAL_ERROR
 * @exports NOT_YET_IMPLEMENTED
 * @exports ILLEGAL_STATE_EXCEPTION
 * @exports DEFAULT_INVALID_REQUEST
 * @exports INVALID_REQUEST
 * @exports DEFAULT_UNAUTHORIZED
 * @exports UNAUTHORIZED
 * @exports DEFAULT_FORBIDDEN
 * @exports FORBIDDEN
 * @exports MISSING_REQUIRED_PARAMETER
 * @exports DEFAULT_SERVICE_UNAVAILABLE
 * @exports SERVICE_UNAVAILABLE
 * @exports DEFAULT_VALIDATION_ERROR
 * @exports VALIDATION_ERROR
 */

/**
 * Default error message to surface to clients for unrecoverable errors.
 * @type {string}
 */
export const DEFAULT_FATAL_ERROR: string =
  'An error occurred. If this error persists, please contact your System Administrator';

/**
 * Factory to generate a 500 Error Message payload from the provided message.
 * Message defaults to DEFAULT_FATAL_ERROR.
 * ```
 * {
 *   status: 500,
 *   code: -1,
 *   category: 'IllegalStateException',
 *   message,
 * }
 * ```
 * @type {Function}
 */
export const FATAL_ERROR: Function = (message: string = DEFAULT_FATAL_ERROR): Object => {
  return {
    status: 500,
    code: -1,
    category: 'IllegalStateException',
    message,
  };
};

/**
 * Whimsical default error message to surface to clients when no additional
 * Error details are available or should be obfuscated when responding with a
 * generalized 400 error.
 * @type {string}
 */
export const DEFAULT_GENERAL_ERROR: string = "Our hamsters don't know how to handle that request";

/**
 * Factory to generate a 400 Error Message payload from the provided message.
 * Message defaults to DEFAULT_GENERAL_ERROR.
 * ```
 * {
 *   status: 400,
 *   code: '0a',
 *   category: 'GeneralException',
 *   message,
 * }
 * ```
 * @type {Function}
 */
export const GENERAL_ERROR: Function = (message: string = DEFAULT_GENERAL_ERROR): Object => {
  return {
    status: 400,
    code: '0a',
    category: 'GeneralException',
    message,
  };
};

/**
 * Not Yet Implemented (501) Error Factory.
 * Returns the payload:
 * ```
 * {
 *   status: 501,
 *   code: 1,
 *   category: 'NotYetImplemented',
 *   message: 'This method must be implmented',
 * }
 * ```
 * @type {Function}
 */
export const NOT_YET_IMPLEMENTED: Function = (): Object => {
  return {
    status: 501,
    code: 1,
    category: 'NotYetImplemented',
    message: 'This method must be implmented',
  };
};

/**
 * Illegal State Exception (500) Error Factory.
 * Returns the payload:
 * ```
 * {
 *   status: 500,
 *   code: 2,
 *   category: 'IllegalStateException',
 *   message: 'Application not configured correctly',
 * }
 * ```
 * @type {Function}
 */
export const ILLEGAL_STATE_EXCEPTION: Function = (): Object => {
  return {
    status: 500,
    code: 2,
    category: 'IllegalStateException',
    message: 'Application not configured correctly',
  };
};

/**
 * Whimsical default error message to surface to clients when no additional
 * Error details are available or should be obfuscated when responding to an
 * invalid request.
 * @type {string}
 */
export const DEFAULT_INVALID_REQUEST: string = "Our hamsters don't know how to handle that request";

/**
 * Invalid Request (400) Error Factory.
 * Generates an Error payload with the provided message, defaulting
 * DEFAULT_INVALID_REQUEST if no message is provided.
 * Returns the payload:
 * ```
 * {
 *   status: 400,
 *   code: 3,
 *   category: 'UserError',
 *   message,
 * }
 * ```
 * @type {Function}
 */
export const INVALID_REQUEST: Function = (message: string = DEFAULT_INVALID_REQUEST): Object => {
  return {
    status: 400,
    code: 3,
    category: 'UserError',
    message,
  };
};

/**
 * Default error message to surface to clients when they are no longer
 * authorized to access a particular resource or service.
 * @type {string}
 */
const DEFAULT_UNAUTHORIZED: string = 'Your session is no longer valid. Please login and rety';

/**
 * Unauthorized (401) Error Factory.
 * Generates an Error payload with the provided message, defaulting
 * DEFAULT_UNAUTHORIZED if no message is provided.
 * Returns the payload:
 * ```
 * {
 *   status: 401,
 *   code: 4,
 *   category: 'SecurityException',
 *   message,
 * }
 * ```
 * @type {Function}
 */
export const UNAUTHORIZED: Function = (message: string = DEFAULT_UNAUTHORIZED): Object => {
  return {
    status: 401,
    code: 4,
    category: 'SecurityException',
    message,
  };
};

/**
 * Default error to surface to requests that are forbidden to make that
 * request.
 * @type {string}
 */
export const DEFAULT_FORBIDDEN: string = "Whoops! You aren't allowed to do that";

/**
 * Forbidden (403) Error Factory.
 * Generates an Error payload with the provided message, defaulting
 * DEFAULT_FORBIDDEN if no message is provided.
 * Returns the payload:
 * ```
 * {
 *   status: 403,
 *   code: 5,
 *   category: 'SecurityException',
 *   message,
 * }
 * ```
 * @type {Function}
 */
export const FORBIDDEN: Function = (message: string = DEFAULT_FORBIDDEN): Object => {
  return {
    status: 403,
    code: 5,
    category: 'SecurityException',
    message,
  };
};

/**
 * Missing Required Request Parameter (malformed request) (400) Error Factory.
 * Returns the payload:
 * ```
 * {
 *   status: 400,
 *   code: 6,
 *   category: 'GeneralException',
 *   message: 'A required parameter was missing',
 * }
 * ```
 * @type {Function}
 */
export const MISSING_REQUIRED_PARAMETER: Function = (): Object => {
  return {
    status: 400,
    code: 6,
    category: 'GeneralException',
    message: 'A required parameter was missing',
  };
};

/**
 * Whimsical default error message to surface to clients when no additional
 * Error details are available or should be obfuscated when a service is not
 * available.
 * @type {string}
 */
export const DEFAULT_SERVICE_UNAVAILABLE: string = 'Hmmm...our hamsters appear to be taking a siesta';

/**
 * Service Unavailable (503) Error Factory.
 * Generates an Error payload with the provided message, defaulting
 * DEFAULT_SERVICE_UNAVAILABLE if no message is provided.
 * Returns the payload:
 * ```
 * {
 *   status: 503,
 *   code: 7,
 *   category: 'NetworkException',
 *   message,
 * }
 * ```
 * @type {Function}
 */
export const SERVICE_UNAVAILABLE: Function = (message: string = DEFAULT_SERVICE_UNAVAILABLE): Object => {
  return {
    status: 503,
    code: 7,
    category: 'NetworkException',
    message,
  };
};

/**
 * Whimsical default error message to surface to clients when no additional
 * Error details are available or should be obfuscated when validating a
 * request fails.
 * @type {string}
 */
export const DEFAULT_VALIDATION_ERROR: string = 'Hmmm...the hamsters found a problem with that data';

/**
 * Validation Failure (400) Error Factory.
 * Generates an Error payload with the provided message, defaulting
 * DEFAULT_VALIDATION_ERROR if no message is provided.
 * Returns the payload:
 * ```
 * {
 *   status: 400,
 *   code: 8,
 *   category: 'ValidationException',
 *   message,
 * }
 * ```
 * @type {Function}
 */
export const VALIDATION_ERROR: Function = (message: string = DEFAULT_VALIDATION_ERROR): Object => {
  return {
    status: 400,
    code: 8,
    category: 'ValidationException',
    message,
  };
};
