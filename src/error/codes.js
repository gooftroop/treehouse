
export const DEFAULT_FATAL_ERROR: String =
  'An error occurred. If this error persists, please contact your System Administrator';

export const FATAL_ERROR: Function = (message: String = DEFAULT_FATAL_ERROR): Object => {
  return {
    status: 500,
    code: -1,
    category: 'IllegalStateException',
    message,
  };
};

export const DEFAULT_GENERAL_ERROR: String = "Our hamsters don't know how to handle that request";

export const GENERAL_ERROR: Function = (message: String = DEFAULT_GENERAL_ERROR): Object => {
  return {
    status: 400,
    code: '0a',
    category: 'GeneralException',
    message,
  };
};

export const DEFAULT_NETWORK_ERROR: String = 'The network request failed';

export const NETWORK_ERROR: Function = (message: String = DEFAULT_NETWORK_ERROR, status: Number = 500): Object => {
  return {
    status,
    code: '0b',
    category: 'NetworkException',
    message,
  };
};

export const NOT_YET_IMPLEMENTED: Function = (): Object => {
  return {
    status: 501,
    code: 1,
    category: 'NotYetImplemented',
    message: 'This method must be implmented',
  };
};

export const ILLEGAL_STATE_EXCEPTION: Function = (): Object => {
  return {
    status: 500,
    code: 2,
    category: 'IllegalStateException',
    message: 'Application not configured correctly',
  };
};

export const DEFAULT_INVALID_REQUEST: String = "Our hamsters don't know how to handle that request";

export const INVALID_REQUEST: Function = (message: String = DEFAULT_INVALID_REQUEST): Object => {
  return {
    status: 400,
    code: 100,
    category: 'UserError',
    message,
  };
};

const DEFAULT_UNAUTHORIZED: String = 'Your session is no longer valid. Please login and rety';

export const UNAUTHORIZED: Function = (message: String = DEFAULT_UNAUTHORIZED): Object => {
  return {
    status: 401,
    code: 4,
    category: 'SecurityException',
    message,
  };
};

export const DEFAULT_FORBIDDEN: String = 'You are not allowed to access that resource';

export const FORBIDDEN: Function = (message: String = DEFAULT_FORBIDDEN): Object => {
  return {
    status: 403,
    code: 5,
    category: 'SecurityException',
    message,
  };
};

export const MISSING_REQUIRED_PARAMETER: Function = (): Object => {
  return {
    status: 400,
    code: 6,
    category: 'GeneralException',
    message: 'A required parameter was missing',
  };
};

export const DEFAULT_SERVICE_UNAVAILABLE: String = 'Our hamsters appear to be taking a siesta';

export const SERVICE_UNAVAILABLE: Function = (message: String = DEFAULT_SERVICE_UNAVAILABLE): Object => {
  return {
    status: 503,
    code: 7,
    category: 'NetworkException',
    message,
  };
};

export const DEFAULT_VALIDATION_ERROR: String = 'Hmmm...the hamsters found a problem with that data';

export const VALIDATION_ERROR: Function = (message: String = DEFAULT_VALIDATION_ERROR): Object => {
  return {
    status: 400,
    code: 200,
    category: 'ValidationException',
    message,
  };
};
