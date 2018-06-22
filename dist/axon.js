module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/v1/handlers/health.js":
/*!***************************************!*\
  !*** ./src/api/v1/handlers/health.js ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Health check handler.
 * Responds to requests with a 200 and an 'OK'.
 * Used by external services to determine if the application is alive or not.
 * @param  {Object} ctx  The Koa context
 * @return {void}
 * @async
 */
exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.status = 200;
            ctx.body = 'OK';

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function health(_x) {
    return _ref.apply(this, arguments);
  }

  return health;
}();

/***/ }),

/***/ "./src/api/v1/routes/index.js":
/*!************************************!*\
  !*** ./src/api/v1/routes/index.js ***!
  \************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _koaRouter = __webpack_require__(/*! koa-router */ "koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _health = __webpack_require__(/*! ../handlers/health */ "./src/api/v1/handlers/health.js");

var _health2 = _interopRequireDefault(_health);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * V1 Router.
 * Defines the health check route.
 * @module api/v1/routes
 * @exports V1 Router
 */

var router = new _koaRouter2.default();

router.get('/health', _health2.default);

exports.default = router;

/***/ }),

/***/ "./src/error/codes.js":
/*!****************************!*\
  !*** ./src/error/codes.js ***!
  \****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * [DEFAULT_FATAL_ERROR description]
 * @type {[type]}
 */
var DEFAULT_FATAL_ERROR = exports.DEFAULT_FATAL_ERROR = 'An error occurred. If this error persists, please contact your System Administrator';

/**
 * [FATAL_ERROR description]
 * @type {[type]}
 */
var FATAL_ERROR = exports.FATAL_ERROR = function FATAL_ERROR() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_FATAL_ERROR;

  return {
    status: 500,
    code: -1,
    category: 'IllegalStateException',
    message: message
  };
};

/**
 * [DEFAULT_GENERAL_ERROR description]
 * @type {[type]}
 */
var DEFAULT_GENERAL_ERROR = exports.DEFAULT_GENERAL_ERROR = "Our hamsters don't know how to handle that request";

/**
 * [GENERAL_ERROR description]
 * @type {[type]}
 */
var GENERAL_ERROR = exports.GENERAL_ERROR = function GENERAL_ERROR() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_GENERAL_ERROR;

  return {
    status: 400,
    code: '0a',
    category: 'GeneralException',
    message: message
  };
};

/**
 * [NOT_YET_IMPLEMENTED description]
 * @type {[type]}
 */
var NOT_YET_IMPLEMENTED = exports.NOT_YET_IMPLEMENTED = function NOT_YET_IMPLEMENTED() {
  return {
    status: 501,
    code: 1,
    category: 'NotYetImplemented',
    message: 'This method must be implmented'
  };
};

/**
 * [ILLEGAL_STATE_EXCEPTION description]
 * @type {[type]}
 */
var ILLEGAL_STATE_EXCEPTION = exports.ILLEGAL_STATE_EXCEPTION = function ILLEGAL_STATE_EXCEPTION() {
  return {
    status: 500,
    code: 2,
    category: 'IllegalStateException',
    message: 'Application not configured correctly'
  };
};

/**
 * [DEFAULT_INVALID_REQUEST description]
 * @type {[type]}
 */
var DEFAULT_INVALID_REQUEST = exports.DEFAULT_INVALID_REQUEST = "Our hamsters don't know how to handle that request";

/**
 * [INVALID_REQUEST description]
 * @type {[type]}
 */
var INVALID_REQUEST = exports.INVALID_REQUEST = function INVALID_REQUEST() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_INVALID_REQUEST;

  return {
    status: 400,
    code: 100,
    category: 'UserError',
    message: message
  };
};

/**
 * [DEFAULT_UNAUTHORIZED description]
 * @type {[type]}
 */
var DEFAULT_UNAUTHORIZED = 'Your session is no longer valid. Please login and rety';

/**
 * [UNAUTHORIZED description]
 * @type {[type]}
 */
var UNAUTHORIZED = exports.UNAUTHORIZED = function UNAUTHORIZED() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_UNAUTHORIZED;

  return {
    status: 401,
    code: 4,
    category: 'SecurityException',
    message: message
  };
};

/**
 * [DEFAULT_FORBIDDEN description]
 * @type {[type]}
 */
var DEFAULT_FORBIDDEN = exports.DEFAULT_FORBIDDEN = 'You are not allowed to access that resource';

/**
 * [FORBIDDEN description]
 * @type {[type]}
 */
var FORBIDDEN = exports.FORBIDDEN = function FORBIDDEN() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_FORBIDDEN;

  return {
    status: 403,
    code: 5,
    category: 'SecurityException',
    message: message
  };
};

/**
 * [MISSING_REQUIRED_PARAMETER description]
 * @type {[type]}
 */
var MISSING_REQUIRED_PARAMETER = exports.MISSING_REQUIRED_PARAMETER = function MISSING_REQUIRED_PARAMETER() {
  return {
    status: 400,
    code: 6,
    category: 'GeneralException',
    message: 'A required parameter was missing'
  };
};

/**
 * [DEFAULT_SERVICE_UNAVAILABLE description]
 * @type {[type]}
 */
var DEFAULT_SERVICE_UNAVAILABLE = exports.DEFAULT_SERVICE_UNAVAILABLE = 'Our hamsters appear to be taking a siesta';

/**
 * [SERVICE_UNAVAILABLE description]
 * @type {[type]}
 */
var SERVICE_UNAVAILABLE = exports.SERVICE_UNAVAILABLE = function SERVICE_UNAVAILABLE() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_SERVICE_UNAVAILABLE;

  return {
    status: 503,
    code: 7,
    category: 'NetworkException',
    message: message
  };
};

/**
 * [DEFAULT_VALIDATION_ERROR description]
 * @type {[type]}
 */
var DEFAULT_VALIDATION_ERROR = exports.DEFAULT_VALIDATION_ERROR = 'Hmmm...the hamsters found a problem with that data';

/**
 * [VALIDATION_ERROR description]
 * @type {[type]}
 */
var VALIDATION_ERROR = exports.VALIDATION_ERROR = function VALIDATION_ERROR() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_VALIDATION_ERROR;

  return {
    status: 400,
    code: 200,
    category: 'ValidationException',
    message: message
  };
};

/***/ }),

/***/ "./src/error/index.js":
/*!****************************!*\
  !*** ./src/error/index.js ***!
  \****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.codes = exports.ServiceUnavailableError = exports.InvalidRequestError = exports.InternalError = exports.AuthorizationError = exports.default = undefined;

var _utils = __webpack_require__(/*! ./utils */ "./src/error/utils.js");

var _codes = __webpack_require__(/*! ./codes */ "./src/error/codes.js");

var codes = _interopRequireWildcard(_codes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * [code description]
 * @type {[type]}
 */
var ApiError = function (_Error) {
  _inherits(ApiError, _Error);

  /**
   * [constructor description]
   * @param  {[type]} payload [description]
   * @param  {[type]} code    [description]
   * @param  {[type]} status  [description]
   * @param  {[type]} e       [description]
   * @return {[type]}         [description]
   */
  function ApiError(payload, status, e) {
    _classCallCheck(this, ApiError);

    var _this = _possibleConstructorReturn(this, _Error.call(this, (0, _utils.resolveMessage)(payload)));

    _this.code = (0, _utils.resolveCode)(payload);
    _this.status = (0, _utils.resolveStatus)(payload, status);
    _this.error = (0, _utils.resolveError)(e || status);

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_this, _this.constructor);
    } else {
      _this.stack = new Error(_this.message).stack;
    }
    return _this;
  }

  return ApiError;
}(Error);

/**
 * [error description]
 * @type {[type]}
 */


exports.default = ApiError;

var AuthorizationError = exports.AuthorizationError = function (_ApiError) {
  _inherits(AuthorizationError, _ApiError);

  /**
   * [constructor description]
   * @param {[type]} errors [description]
   */
  function AuthorizationError(e) {
    _classCallCheck(this, AuthorizationError);

    return _possibleConstructorReturn(this, _ApiError.call(this, codes.NOT_ALLOWED, e));
  }

  return AuthorizationError;
}(ApiError);

/**
 * [message description]
 * @type {[type]}
 */


var InternalError = exports.InternalError = function (_ApiError2) {
  _inherits(InternalError, _ApiError2);

  function InternalError(message, e) {
    _classCallCheck(this, InternalError);

    return _possibleConstructorReturn(this, _ApiError2.call(this, codes.FATAL_ERROR(message), e));
  }

  return InternalError;
}(ApiError);

/**
 * [message description]
 * @type {[type]}
 */


var InvalidRequestError = exports.InvalidRequestError = function (_ApiError3) {
  _inherits(InvalidRequestError, _ApiError3);

  /**
   * [constructor description]
   * @param {[type]} errors [description]
   */
  function InvalidRequestError(message, e) {
    _classCallCheck(this, InvalidRequestError);

    return _possibleConstructorReturn(this, _ApiError3.call(this, codes.INVALID_REQUEST(message), e));
  }

  return InvalidRequestError;
}(ApiError);

/**
 *
 */


var ServiceUnavailableError = exports.ServiceUnavailableError = function (_ApiError4) {
  _inherits(ServiceUnavailableError, _ApiError4);

  /**
   * [constructor description]
   * @param {[type]} errors [description]
   */
  function ServiceUnavailableError(message, e) {
    _classCallCheck(this, ServiceUnavailableError);

    return _possibleConstructorReturn(this, _ApiError4.call(this, codes.SERVICE_UNAVAILABLE(message), e));
  }

  return ServiceUnavailableError;
}(ApiError);

exports.codes = codes;

/***/ }),

/***/ "./src/error/utils.js":
/*!****************************!*\
  !*** ./src/error/utils.js ***!
  \****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.resolveCode = resolveCode;
exports.resolveError = resolveError;
exports.resolveMessage = resolveMessage;
exports.resolveStatus = resolveStatus;
var DEFAULT_CODE = 0;
var DEFAULT_MESSAGE = 'An Unknown error occurred';
var DEFAULT_STATUS = 500;

/**
 * [resolveCode description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */
function resolveCode(payload) {
  if (typeof payload === 'number') {
    return 'code' in payload ? DEFAULT_CODE : payload.code;
  }

  return DEFAULT_CODE;
}

/**
 * [resolveError description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function resolveError(e) {
  return _extends({}, e);
}

/**
 * [resolveMessage description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */
function resolveMessage(payload) {
  if ((typeof payload === 'undefined' ? 'undefined' : _typeof(payload)) === 'object') {
    return 'message' in payload ? DEFAULT_MESSAGE : payload.message;
  }

  return payload;
}

/**
 * [resolveStatus description]
 * @param  {[type]} payload [description]
 * @param  {[type]} status  [description]
 * @return {[type]}         [description]
 */
function resolveStatus(payload, status) {
  if ((typeof payload === 'undefined' ? 'undefined' : _typeof(payload)) === 'object' && 'status' in payload) {
    return payload.status;
  }

  var typeStatus = typeof status === 'undefined' ? 'undefined' : _typeof(status);

  return typeStatus !== 'number' || typeStatus !== 'string' ? DEFAULT_STATUS : status;
}

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.ServiceUnavailableError = exports.Logger = exports.InvalidRequestError = exports.InternalError = exports.codes = exports.AuthorizationError = exports.ApiError = undefined;

var _error = __webpack_require__(/*! ./error */ "./src/error/index.js");

var _error2 = _interopRequireDefault(_error);

var _logger = __webpack_require__(/*! ./utils/logger */ "./src/utils/logger.js");

var _logger2 = _interopRequireDefault(_logger);

var _server = __webpack_require__(/*! ./server */ "./src/server.js");

var _server2 = _interopRequireDefault(_server);

var _codes = __webpack_require__(/*! ./error/codes */ "./src/error/codes.js");

var codes = _interopRequireWildcard(_codes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Main entry point for the built Axon dist/library.
 * @module main
 * @exports Allthethings
 */

exports.default = _server2.default;
exports.ApiError = _error2.default;
exports.AuthorizationError = _error.AuthorizationError;
exports.codes = codes;
exports.InternalError = _error.InternalError;
exports.InvalidRequestError = _error.InvalidRequestError;
exports.Logger = _logger2.default;
exports.ServiceUnavailableError = _error.ServiceUnavailableError;

/***/ }),

/***/ "./src/middleware/accessLogger.js":
/*!****************************************!*\
  !*** ./src/middleware/accessLogger.js ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.formatter = undefined;

var _koaMorgan = __webpack_require__(/*! koa-morgan */ "koa-morgan");

var _koaMorgan2 = _interopRequireDefault(_koaMorgan);

var _logger = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.js");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGGER = _logger2.default.getLogger('access');

/**
 * Morgan log formatter.
 * Returns an object containing the desired request and response attributes.
 * The expected output should be a JSON string as <code>bunyan</code> will
 * take the string and merge that JSON with the output (which is the desired
 * result). The expected format is:
 * ```
 * {
 *   remote-addr: <string>,
 *   date: <clf>,
 *   method: <string>,
 *   url: <fqd string>,
 *   HTTP: <version string>,
 *   user-agent: <string>,
 *   referrer: <string>,
 *   status: <number>,
 *   res[content-length]: <number>,
 *   response-time: <number> ms,
 * }
 * ```
 *
 * @see {@link https://www.npmjs.com/package/koa-morgan}
 *
 * @param  {Object} tokens    The map of morgan tokens
 * @param  {Object} request   The request context
 * @param  {Object} response  The response context
 * @return {Object}           The format meta object
 */
var formatter = exports.formatter = function formatter(tokens, request, response) {
  var responseTime = tokens['response-time'](request, response);

  return JSON.stringify({
    'remote-addr': tokens['remote-addr'](request),
    date: tokens.date(request, response, 'clf'),
    method: tokens.method(request),
    url: tokens.url(request),
    HTTP: tokens['http-version'](request),
    'user-agent': tokens['user-agent'](request),
    referrer: tokens.referrer(request),
    status: tokens.status(request, response),
    'res[content-length]': tokens.res(request, response, 'content-length'),
    'response-time': responseTime + ' ms'
  });
};

/**
 * @exports Function The access logger middleware
 */
exports.default = (0, _koaMorgan2.default)(formatter, {
  stream: {
    write: function write(message) {
      LOGGER.info(JSON.parse(message));
    }
  }
});

/***/ }),

/***/ "./src/middleware/error.js":
/*!*********************************!*\
  !*** ./src/middleware/error.js ***!
  \*********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _error = __webpack_require__(/*! ../error */ "./src/error/index.js");

var _error2 = _interopRequireDefault(_error);

var _logger = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.js");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var LOGGER = _logger2.default.getLogger('root');

/**
 * Wraps all subsequent async calls to middleware or handlers in a
 * <code>try/catch</code> block to properly handle and format errors
 * prior to sending an error reponse.
 * If the caught <code>Error</code> is not a subclass of the
 * <code>ApiError</code>, it is converted into either an
 * <code>InternalError</code> if no <code>status</code> is attached to the
 * error or the <code>status</code> is 500, or a generic <code>ApiError</code>.
 * The error is logged, the response status is set to the error
 * <code>status</code>, and the response body is set to the error. Finally the
 * `error` event is emitted on the <code>app</code>.
 *
 * @see {@link ApiError}
 * @see {@link InternalError}
 * 
 * @param  {Object}   ctx  The Koa context
 * @param  {Function} next The next middleware or handler in the connect chain
 * @return {void}
 * @async
 */

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
    var err;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return next();

          case 3:
            _context.next = 13;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);
            err = _context.t0;


            if (!(_context.t0 instanceof _error2.default)) {
              err = !err.status || err.status === 500 ? new _error.InternalError(_context.t0.message, _context.t0) : new _error2.default(_context.t0.message, _context.t0);
            }

            LOGGER.error(err, ctx);
            ctx.status = err.status;
            ctx.body = err;

            ctx.app.emit('error', err, ctx);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 5]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/middleware/transaction.js":
/*!***************************************!*\
  !*** ./src/middleware/transaction.js ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _domain = __webpack_require__(/*! domain */ "domain");

var _domain2 = _interopRequireDefault(_domain);

var _v = __webpack_require__(/*! uuid/v4 */ "uuid/v4");

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Adds a transaction identifier to every request to track a request's control
 * flow through the entire lifetime of the request, including across
 * asynchronous calls. We use a transactoin ID instead of the session ID or
 * user since both are persistent(ish) identification.
 *
 * @see {@link https://nodejs.org/api/domain.html}
 *
 * @param  {Object}   ctx  The Koa context
 * @param  {Function} next The next middleware or handler in the connect chain
 * @return {void}
 */
exports.default = function (ctx, next) {
  var transactionId = (0, _v2.default)();
  var transaction = _domain2.default.create();

  // eslint-disable-next-line no-param-reassign
  ctx.transactionId = transactionId;

  transaction.add(ctx);
  transaction.data = {
    id: transactionId,
    ctx: ctx
  };

  return new Promise(function (resolve, reject) {
    transaction.run(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return next();

            case 3:
              return _context.abrupt('return', resolve());

            case 6:
              _context.prev = 6;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', reject(_context.t0));

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 6]]);
    })));
  });
};

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _koaRouter = __webpack_require__(/*! koa-router */ "koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _routes = __webpack_require__(/*! ./api/v1/routes */ "./src/api/v1/routes/index.js");

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Builds and exports the Axon router.
 * Typically version Routers (i.e. v1) would be mounted to the root Router with
 * a url prefix like <code>/v1</code>, but in this case, the Axon Router only
 * provides global endpoints like a health check and does not need to be
 * versioned. However, this file does establish a good pattern for organizing
 * and building application-specific Routers, so I do recommend using this as
 * boilerplate.
 * @see {@link https://github.com/alexmingoia/koa-router}
 * @module router
 * @exports Router
 */

var router = new _koaRouter2.default();

router.use(_routes2.default.routes());

exports.default = router;

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _koaBody = __webpack_require__(/*! koa-body */ "koa-body");

var _koaBody2 = _interopRequireDefault(_koaBody);

var _koaCompress = __webpack_require__(/*! koa-compress */ "koa-compress");

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _koaCors = __webpack_require__(/*! koa-cors */ "koa-cors");

var _koaCors2 = _interopRequireDefault(_koaCors);

var _events = __webpack_require__(/*! events */ "events");

var _events2 = _interopRequireDefault(_events);

var _fs = __webpack_require__(/*! fs */ "fs");

var _fs2 = _interopRequireDefault(_fs);

var _koaHelmet = __webpack_require__(/*! koa-helmet */ "koa-helmet");

var _koaHelmet2 = _interopRequireDefault(_koaHelmet);

var _https = __webpack_require__(/*! https */ "https");

var _https2 = _interopRequireDefault(_https);

var _koa = __webpack_require__(/*! koa */ "koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaMount = __webpack_require__(/*! koa-mount */ "koa-mount");

var _koaMount2 = _interopRequireDefault(_koaMount);

var _koaStatic = __webpack_require__(/*! koa-static */ "koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _accessLogger = __webpack_require__(/*! ./middleware/accessLogger */ "./src/middleware/accessLogger.js");

var _accessLogger2 = _interopRequireDefault(_accessLogger);

var _error = __webpack_require__(/*! ./middleware/error */ "./src/middleware/error.js");

var _error2 = _interopRequireDefault(_error);

var _logger = __webpack_require__(/*! ./utils/logger */ "./src/utils/logger.js");

var _logger2 = _interopRequireDefault(_logger);

var _router = __webpack_require__(/*! ./router */ "./src/router.js");

var _router2 = _interopRequireDefault(_router);

var _sigInitHandler = __webpack_require__(/*! ./utils/sigInitHandler */ "./src/utils/sigInitHandler.js");

var _sigInitHandler2 = _interopRequireDefault(_sigInitHandler);

var _transaction = __webpack_require__(/*! ./middleware/transaction */ "./src/middleware/transaction.js");

var _transaction2 = _interopRequireDefault(_transaction);

var _uncaughtExceptionHandler = __webpack_require__(/*! ./utils/uncaughtExceptionHandler */ "./src/utils/uncaughtExceptionHandler.js");

var _uncaughtExceptionHandler2 = _interopRequireDefault(_uncaughtExceptionHandler);

var _unhandledRejectionHandler = __webpack_require__(/*! ./utils/unhandledRejectionHandler */ "./src/utils/unhandledRejectionHandler.js");

var _unhandledRejectionHandler2 = _interopRequireDefault(_unhandledRejectionHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Catches ctrl+c event
process.on('SIGINT', _sigInitHandler2.default);

// Catches uncaught exceptions and rejections
process.on('uncaughtException', _uncaughtExceptionHandler2.default);
process.on('unhandledRejection', _unhandledRejectionHandler2.default);

/**
 * This class encapsulates a <code>Koa</code> application and provides an API
 * for controlling the configuration and lifecycle of application server.
 * <code>Server</code> extends <code>EventEmitter</code> to provide the following
 * event-based lifecycle triggers:
 * - `ready`
 * - `before:start`
 * - `start`
 * - `after:start`
 * - `before:stop`
 * - `destroy`
 * - `after:stop`
 *
 * <code>Server</code> contains the following public variables:
 * - `app`     The instantiated Koa application
 * - `config`  The application-specific configuration object
 * - `logger`  A reference to the app logger
 * - `router`  The combined universal and application-specific router
 *
 * @class
 * @extends {EventEmitter}
 */

var Server = function (_EventEmitter) {
  _inherits(Server, _EventEmitter);

  /**
   * Configures and initializes the <code>Server</code> instance.
   * Calls <code>initialize</code>, which will call
   * </code>initializeMiddleware</code>, and <code>initializeRouter</code>
   * prior to emitting the `ready` event.
   * @constructor
   * @param {Object} config
   * @param {Object} appRouter
   * @return {void}
   */
  function Server(config, appRouter) {
    _classCallCheck(this, Server);

    // atexit handler
    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

    process.on('exit', _this.destroy);

    _this.config = config;

    // Initialize the express server
    _this.app = new _koa2.default();

    // Create the logger
    _this.logger = _logger2.default.getLogger('app');

    // Configure the app with common middleware
    _this.initialize();

    _this.initializeRouter(_router2.default, appRouter);

    _this.emit('ready');
    return _this;
  }

  /**
   * Creates and makes the NodeJS HTTP(s) server available.
   * If the <code>secure</code> configuration option is true, then this method
   * calls <code>createHttpsServer</code>; otherwise the default HTTP Koa
   * server is used.
   * @see {@link createHttpsServer}
   * @see {@link start}
   * @return {void}
   */


  Server.prototype.createServer = function createServer() {
    return this.config.server.secure ? this.createHttpsServer() : this.app;
  };

  /**
   * Creates a NodeJS HTTPS server using the <code>ssl</code> configuration option.
   * Setups a HTTP redirect to force all traffic to HTTP.
   * @return {void}
   */


  Server.prototype.createHttpsServer = function createHttpsServer() {
    this.app.all('*', function cb(request, response, next) {
      if (request.secure) {
        return next();
      }

      return response.redirect('https://' + request.hostname + ':' + this.config.server.port + request.url);
    });

    var sslConfig = this.config.server.ssl;
    var httpsConfig = Object.assign({}, sslConfig, {
      key: _fs2.default.readFileSync(sslConfig.get('key')),
      cert: _fs2.default.readFileSync(sslConfig.get('cert'))
    });

    return _https2.default.createServer(httpsConfig, this.app.callback());
  };

  /**
   * Returns a Function to be used as a callback to the server start.
   * The custom callback is invoked first, if provided. The callback function
   * will then emit the `start` event, notify any watching proceeses via
   * <code>process.send('ready')</code>, if <code>send</code> is available on
   * <code>process</code>, and finally log a start message.
   * @see {@link start}
   * @param {Function} callback
   * @return {Function}
   */


  Server.prototype.getListenCallback = function getListenCallback(callback) {
    var _this2 = this;

    return function () {
      if (callback != null) {
        callback();
      }

      _this2.emit('start');

      if (process.send) {
        process.send('ready');
      }

      _this2.logger.info('Server listening at ' + _this2.config.server.hostname + ':' + _this2.config.server.port + '...');
    };
  };

  /**
   * Initializes and attaches common middleware to the app.
   * <code>initializeMiddleware</code> is called prior to attaching the
   * <code>error</code> middleware in order for implementations to easily
   * attach custom middleware.
   * @return {void}
   */


  Server.prototype.initialize = function initialize() {
    // Add common request security measures
    this.app.use((0, _koaHelmet2.default)());

    // Enabled CORS (corss-origin resource sharing)
    this.app.use((0, _koaCors2.default)(this.config.get('cors')));

    // request compression
    this.app.use((0, _koaCompress2.default)(this.config.get('compress')));

    // Initialize body parser before routes or body will be undefined
    this.app.use((0, _koaBody2.default)(this.config.get('body')));

    // Trace a single request process (including over async)
    this.app.use(_transaction2.default);

    // Configure Request logging
    this.app.use(_accessLogger2.default);

    // Configure the request error handling
    this.app.use(_error2.default);

    this.initializeMiddleware();
  };

  /**
   * Abstract function.
   * Called when initializing middleware to expose an entry point to attach
   * additional custom, application-specific middleware. Any middleware
   * attached to the <code>app</code> that throws an <code>Error</code> will be
   * handled by the <code>error</code> middleware.
   * @return {void}
   */


  Server.prototype.initializeMiddleware = function initializeMiddleware() {}
  // Override to provide custom middleware


  /**
   * Given the common/core <code>Router</code> and an application-specific
   * <code>Router</code>, merge the app-specific <code>Router</code> into the
   * core <code>Router</code> and mount the product to the <code>app</code>.
   * @param  {Object} router
   * @param  {Object} appRouter
   * @return {void}
   */
  ;

  Server.prototype.initializeRouter = function initializeRouter(router, appRouter) {
    // Combine with application-specific router
    router.use(appRouter.routes());

    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
  };

  /**
   * Performs any common cleanup and notifies any listeners of the tear-down
   * by emitting the `destroy` event locally and on the <code>process</code>.
   * @see {@link stop}
   * @return {void}
   */


  Server.prototype.destroy = function destroy() {
    // TODO logger destroy?
    this.emit('destroy');
    process.emit('destroy');
  };

  /**
   * Starts the server.
   * Starting the server will create an HTTP or HTTPS server, depending on
   * configuration, with the provided callback and begin listening on the
   * configured hostname/port.
   * If any errors are encountered while starting the server, the error is
   * logged and <code>destroy</code> is called prior to the process exiting.
   * Returns the created server instance upon successful startup.
   * @see {@link https://nodejs.org/api/http.html}
   * @see {@link createServer}
   * @see {@link getListenCallback}
   * @see {@link destroy}
   * @param {Function|null = null} callback
   * @return {Object}
   */


  Server.prototype.start = function start() {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (!this.app) {
      throw new Error('Cannot start server: the express instance is not defined');
    }

    try {
      this.emit('before:start');
      this.app.server = this.createServer().listen(this.config.get('port'), this.config.get('hostname'), this.config.get('backlog'), this.getListenCallback(callback));
      this.emit('after:start');
      return this.app.server;
    } catch (e) {
      this.logger.error(e);
      this.destroy();
      throw e;
    }
  };

  /**
   * Stops the server by executing the following routines:
   * 1. Emits `before:stop`
   * 2. Invokes the provided callback, if one is provided
   * 3. Stops the server from accepting any new connections
   * 4. Calls <code>destroy</code>
   * 5. Emits `after:stop`
   * @see {@link https://nodejs.org/api/net.html#net_server_close_callback}
   * @see {@link destroy}
   * @param  {Function|null = null} callback
   * @return {void}
   */


  Server.prototype.stop = function stop() {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    this.logger.info('Server (' + this.config.hostname + ':' + this.config.port + ') stopping...');

    this.emit('before:stop');
    if (callback) {
      callback();
    }

    this.app.server.close();
    this.destroy();
    this.emit('after:stop');
  };

  return Server;
}(_events2.default);

exports.default = Server;

/***/ }),

/***/ "./src/utils/logger.js":
/*!*****************************!*\
  !*** ./src/utils/logger.js ***!
  \*****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _class, _temp;

var _bunyan = __webpack_require__(/*! bunyan */ "bunyan");

var _bunyan2 = _interopRequireDefault(_bunyan);

var _config = __webpack_require__(/*! config */ "config");

var _config2 = _interopRequireDefault(_config);

var _process = __webpack_require__(/*! process */ "process");

var _process2 = _interopRequireDefault(_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_LOGGER_NAME = 'root';

/*
 * BEGIN NOTE: example of stream config
  streamConfig = Object.assign({}, streamsConfig.get('cloudwatch'));
  streamConfig.logStreamName += `-${process.pid}-${uuidv4()}`;
  logger.addStream({
    name: 'cloudwatch',
    type: 'raw',
    stream: createCWStream(Object.assign({}, streamConfig)),
  });
 * END NOTE
 */

/**
 * Implementation of the <code>Bunyan</code> logger that provides a static
 * access method to retrieve configuration logger instances and to extend the
 * logging output behavior to include our request <code>trasnaction</code>
 * data as additional log metadata.
 *
 * @see {@link https://github.com/trentm/node-bunyan}
 *
 * @class
 * @extends Bunyan
 */
var Logger = (_temp = _class = function (_Bunyan) {
  _inherits(Logger, _Bunyan);

  function Logger() {
    _classCallCheck(this, Logger);

    return _possibleConstructorReturn(this, _Bunyan.apply(this, arguments));
  }

  /**
   * Extends <code>Bunyan</code>'s functionality to include the
   * <code>transaction</code> data in the log output. Calls
   * <code>Bunyan._emit</code> with the modified log record.
   * <code>_emit</code> is responsible for writing a log record to the logger
   * instance's output.
   *
   * @param  {Object} rec     The log record to emit
   * @param  {boolean} noemit Flag controlling if the current record should be
   *                          emitted or not
   * @return {void}
   */
  Logger.prototype._emit = function _emit(rec, noemit) {
    var r = this.serializeTransaction(rec);

    // eslint-disable-next-line no-underscore-dangle
    return _Bunyan.prototype._emit.call(this, r, noemit);
  };

  /**
   * Generates a formatted object from the <code>transaction</code> data
   * attached to the current <code>process.domain</code>. If such a
   * <code>transaction</code> exists, get the <code>transaction</code>'s
   * ID and the request context (Koa context).
   * Attach the <code>transaction</code> ID to the record, as well as
   * the session ID, if a session exists, and some basic information about the
   * current logged-in user, if a user exists.
   *
   * The session is found on the context as <code>ctx.session</code>, and the
   * use is found on the context as <code>ctx.user</code>.
   *
   * @param  {rec} Object The log record to emit
   * @return {Object}     The modified log record
   */

  // loggers cache


  Logger.prototype.serializeTransaction = function serializeTransaction(rec) {
    var r = rec;
    var transaction = _process2.default.domain;

    if (transaction && transaction.data) {
      var ctx = transaction.data.ctx;


      r.transactionId = transaction.data.id;
      if (ctx.session) {
        r.sessionId = ctx.session.id;
      }

      if (ctx.user) {
        r.user = {
          id: ctx.user.id,
          username: ctx.user.username
        };
      }
    }

    return rec;
  };

  /**
   * Retrieve a logger instance by name by looking up the looger in the logger
   * cache. If no logger name is provide, the default logger
   * (<code>root</code>) is returned. If no logger by the provided name exists
   * and the logger name is found in the configuration, then a new logger is
   * created and returned; otherwise an <code>Error</code> is thrown.
   *
   * @param  {string = null} name
   * @return {Object}
   */


  Logger.getLogger = function getLogger() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    var handlersConfig = _config2.default.loggers.handlers;
    var loggerName = name == null ? DEFAULT_LOGGER_NAME : name.toLowerCase();

    if (!(loggerName in Logger.loggers)) {
      if (!(loggerName in handlersConfig)) {
        throw new Error('Unable to create logger: no logger for ' + loggerName + ' found in configuration');
      }

      Logger.loggers[loggerName] = new Logger(handlersConfig.loggerName);
    }

    return Logger.loggers[loggerName];
  };

  return Logger;
}(_bunyan2.default), _class.loggers = {}, _temp);
exports.default = Logger;

/***/ }),

/***/ "./src/utils/sigInitHandler.js":
/*!*************************************!*\
  !*** ./src/utils/sigInitHandler.js ***!
  \*************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = sigInitHandler;

var _logger = __webpack_require__(/*! ./logger */ "./src/utils/logger.js");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGGER = _logger2.default.getLogger();

/**
 * Handler for capturing a the <code>siginit</code> event and stopping the
 * current process.
 * @return {void}
 */
function sigInitHandler() {
  if (LOGGER) {
    LOGGER.info('Captured ctrl-c');
  }

  process.exit(0);
}

/***/ }),

/***/ "./src/utils/uncaughtExceptionHandler.js":
/*!***********************************************!*\
  !*** ./src/utils/uncaughtExceptionHandler.js ***!
  \***********************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = uncaughtExceptionHandler;

var _logger = __webpack_require__(/*! ./logger */ "./src/utils/logger.js");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGGER = _logger2.default.getLogger('error');

/**
 * Called when the process encounters an uncaught <code>Error</code>.
 * The <code>Error</code> is logged and the process exits in error.
 * @param  {Error} e
 * @return {void}
 */
function uncaughtExceptionHandler(e) {
  if (LOGGER) {
    LOGGER.error('An unhandled exception occurred. Server is exiting...');
    LOGGER.error(e);
  }

  process.exit(1);
}

/***/ }),

/***/ "./src/utils/unhandledRejectionHandler.js":
/*!************************************************!*\
  !*** ./src/utils/unhandledRejectionHandler.js ***!
  \************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = unhandledRejectionHandler;

var _logger = __webpack_require__(/*! ./logger */ "./src/utils/logger.js");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGGER = _logger2.default.getLogger('error');

/**
 * Called when the process encounteres an unhandled Promise rejection.
 * The <code>Error</code> from the rejected Promise is logged and the event
 * loop is allowed to continue.
 * @param  {Error} e
 * @return {void}
 */
function unhandledRejectionHandler(e) {
  if (LOGGER) {
    LOGGER.error('An unhandled promise rejection occurred: ' + e);
  }
}

/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.js ***!
  \***************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/gooftroop/Development/Harmonizly/axon/src/main.js */"./src/main.js");


/***/ }),

/***/ "bunyan":
/*!*************************!*\
  !*** external "bunyan" ***!
  \*************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("bunyan");

/***/ }),

/***/ "config":
/*!*************************!*\
  !*** external "config" ***!
  \*************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("config");

/***/ }),

/***/ "domain":
/*!*************************!*\
  !*** external "domain" ***!
  \*************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("domain");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-body":
/*!***************************!*\
  !*** external "koa-body" ***!
  \***************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("koa-body");

/***/ }),

/***/ "koa-compress":
/*!*******************************!*\
  !*** external "koa-compress" ***!
  \*******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("koa-compress");

/***/ }),

/***/ "koa-cors":
/*!***************************!*\
  !*** external "koa-cors" ***!
  \***************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("koa-cors");

/***/ }),

/***/ "koa-helmet":
/*!*****************************!*\
  !*** external "koa-helmet" ***!
  \*****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("koa-helmet");

/***/ }),

/***/ "koa-morgan":
/*!*****************************!*\
  !*** external "koa-morgan" ***!
  \*****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("koa-morgan");

/***/ }),

/***/ "koa-mount":
/*!****************************!*\
  !*** external "koa-mount" ***!
  \****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("koa-mount");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),

/***/ "koa-static":
/*!*****************************!*\
  !*** external "koa-static" ***!
  \*****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("process");

/***/ }),

/***/ "uuid/v4":
/*!**************************!*\
  !*** external "uuid/v4" ***!
  \**************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("uuid/v4");

/***/ })

/******/ });
//# sourceMappingURL=axon.js.map