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
 * [ping description]
 * @param  {[type]} ctx  [description]
 * @return {[type]}      [description]
 */
exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ctx.status = 200;
            ctx.body = 'ok';

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

var router = new _koaRouter2.default();

router.get('/heath', _health2.default);

exports.default = router;

/***/ }),

/***/ "./src/exception/codes.js":
/*!********************************!*\
  !*** ./src/exception/codes.js ***!
  \********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var DEFAULT_FATAL_ERROR = exports.DEFAULT_FATAL_ERROR = 'An error occurred. If this error persists, please contact your System Administrator';

var FATAL_ERROR = exports.FATAL_ERROR = function FATAL_ERROR() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_FATAL_ERROR;

  return {
    status: 500,
    code: -1,
    category: 'IllegalStateException',
    message: message
  };
};

var DEFAULT_GENERAL_ERROR = exports.DEFAULT_GENERAL_ERROR = "Our hamsters don't know how to handle that request";

var GENERAL_ERROR = exports.GENERAL_ERROR = function GENERAL_ERROR() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_GENERAL_ERROR;

  return {
    status: 400,
    code: '0a',
    category: 'GeneralException',
    message: message
  };
};

var DEFAULT_NETWORK_ERROR = exports.DEFAULT_NETWORK_ERROR = 'The network request failed';

var NETWORK_ERROR = exports.NETWORK_ERROR = function NETWORK_ERROR() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_NETWORK_ERROR;
  var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

  return {
    status: status,
    code: '0b',
    category: 'NetworkException',
    message: message
  };
};

var NOT_YET_IMPLEMENTED = exports.NOT_YET_IMPLEMENTED = function NOT_YET_IMPLEMENTED() {
  return {
    status: 501,
    code: 1,
    category: 'NotYetImplemented',
    message: 'This method must be implmented'
  };
};

var ILLEGAL_STATE_EXCEPTION = exports.ILLEGAL_STATE_EXCEPTION = function ILLEGAL_STATE_EXCEPTION() {
  return {
    status: 500,
    code: 2,
    category: 'IllegalStateException',
    message: 'Application not configured correctly'
  };
};

var DEFAULT_INVALID_REQUEST = exports.DEFAULT_INVALID_REQUEST = "Our hamsters don't know how to handle that request";

var INVALID_REQUEST = exports.INVALID_REQUEST = function INVALID_REQUEST() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_INVALID_REQUEST;

  return {
    status: 400,
    code: 100,
    category: 'UserError',
    message: message
  };
};

var DEFAULT_UNAUTHORIZED = 'Your session is no longer valid. Please login and rety';

var UNAUTHORIZED = exports.UNAUTHORIZED = function UNAUTHORIZED() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_UNAUTHORIZED;

  return {
    status: 401,
    code: 4,
    category: 'SecurityException',
    message: message
  };
};

var DEFAULT_FORBIDDEN = exports.DEFAULT_FORBIDDEN = 'You are not allowed to access that resource';

var FORBIDDEN = exports.FORBIDDEN = function FORBIDDEN() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_FORBIDDEN;

  return {
    status: 403,
    code: 5,
    category: 'SecurityException',
    message: message
  };
};

var MISSING_REQUIRED_PARAMETER = exports.MISSING_REQUIRED_PARAMETER = function MISSING_REQUIRED_PARAMETER() {
  return {
    status: 400,
    code: 6,
    category: 'GeneralException',
    message: 'A required parameter was missing'
  };
};

var DEFAULT_SERVICE_UNAVAILABLE = exports.DEFAULT_SERVICE_UNAVAILABLE = 'Our hamsters appear to be taking a siesta';

var SERVICE_UNAVAILABLE = exports.SERVICE_UNAVAILABLE = function SERVICE_UNAVAILABLE() {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_SERVICE_UNAVAILABLE;

  return {
    status: 503,
    code: 7,
    category: 'NetworkException',
    message: message
  };
};

var DEFAULT_VALIDATION_ERROR = exports.DEFAULT_VALIDATION_ERROR = 'Hmmm...the hamsters found a problem with that data';

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

/***/ "./src/exception/index.js":
/*!********************************!*\
  !*** ./src/exception/index.js ***!
  \********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.codes = exports.ServiceUnavailableException = exports.NetworkException = exports.InvalidRequestException = exports.InternalException = exports.GraphQLException = exports.AuthorizationException = exports.default = undefined;

var _utils = __webpack_require__(/*! ./utils */ "./src/exception/utils.js");

var _codes = __webpack_require__(/*! ./codes */ "./src/exception/codes.js");

var codes = _interopRequireWildcard(_codes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * [code description]
 * @type {[type]}
 */
var Exception = function (_Error) {
  _inherits(Exception, _Error);

  /**
   * [constructor description]
   * @param  {[type]} payload [description]
   * @param  {[type]} code    [description]
   * @param  {[type]} status  [description]
   * @param  {[type]} e       [description]
   * @return {[type]}         [description]
   */
  function Exception(payload, status, e) {
    _classCallCheck(this, Exception);

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

  return Exception;
}(Error);

/**
 * [error description]
 * @type {[type]}
 */


exports.default = Exception;

var AuthorizationException = exports.AuthorizationException = function (_Exception) {
  _inherits(AuthorizationException, _Exception);

  /**
   * [constructor description]
   * @param {[type]} errors [description]
   */
  function AuthorizationException(e) {
    _classCallCheck(this, AuthorizationException);

    return _possibleConstructorReturn(this, _Exception.call(this, codes.NOT_ALLOWED, e));
  }

  return AuthorizationException;
}(Exception);

/**
 * [errors description]
 * @type {[type]}
 */


var GraphQLException = exports.GraphQLException = function (_Exception2) {
  _inherits(GraphQLException, _Exception2);

  /**
   * [constructor description]
   * @param {[type]} errors [description]
   */
  function GraphQLException(e) {
    _classCallCheck(this, GraphQLException);

    return _possibleConstructorReturn(this, _Exception2.call(this, codes.GENERAL_ERROR(e.message), e));
  }

  return GraphQLException;
}(Exception);

/**
 * [message description]
 * @type {[type]}
 */


var InternalException = exports.InternalException = function (_Exception3) {
  _inherits(InternalException, _Exception3);

  function InternalException(message, e) {
    _classCallCheck(this, InternalException);

    return _possibleConstructorReturn(this, _Exception3.call(this, codes.FATAL_ERROR(message), e));
  }

  return InternalException;
}(Exception);

/**
 * [message description]
 * @type {[type]}
 */


var InvalidRequestException = exports.InvalidRequestException = function (_Exception4) {
  _inherits(InvalidRequestException, _Exception4);

  /**
   * [constructor description]
   * @param {[type]} errors [description]
   */
  function InvalidRequestException(message, e) {
    _classCallCheck(this, InvalidRequestException);

    return _possibleConstructorReturn(this, _Exception4.call(this, codes.INVALID_REQUEST(message), e));
  }

  return InvalidRequestException;
}(Exception);

/**
 * [error description]
 * @type {[type]}
 */


var NetworkException = exports.NetworkException = function (_Exception5) {
  _inherits(NetworkException, _Exception5);

  /**
   * [constructor description]
   * @param {[type]} error [description]
   */
  function NetworkException(e) {
    _classCallCheck(this, NetworkException);

    return _possibleConstructorReturn(this, _Exception5.call(this, codes.NETWORK_ERROR((0, _utils.convertSystemFetchErrorStatus)(e)), e));
  }

  return NetworkException;
}(Exception);

/**
 *
 */


var ServiceUnavailableException = exports.ServiceUnavailableException = function (_Exception6) {
  _inherits(ServiceUnavailableException, _Exception6);

  /**
   * [constructor description]
   * @param {[type]} errors [description]
   */
  function ServiceUnavailableException(message, e) {
    _classCallCheck(this, ServiceUnavailableException);

    return _possibleConstructorReturn(this, _Exception6.call(this, codes.SERVICE_UNAVAILABLE(message), e));
  }

  return ServiceUnavailableException;
}(Exception);

exports.codes = codes;

/***/ }),

/***/ "./src/exception/utils.js":
/*!********************************!*\
  !*** ./src/exception/utils.js ***!
  \********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.convertSystemFetchErrorStatus = convertSystemFetchErrorStatus;
exports.resolveCode = resolveCode;
exports.resolveError = resolveError;
exports.resolveMessage = resolveMessage;
exports.resolveStatus = resolveStatus;
var DEFAULT_CODE = 0;
var DEFAULT_MESSAGE = 'An Unknown error occurred';

/**
 * [error description]
 * @type {[type]}
 */
function convertSystemFetchErrorStatus(error) {
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

  return typeStatus !== 'number' || typeStatus !== 'string' ? DEFAULT_CODE : status;
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
exports.ServiceUnavailableException = exports.NetworkException = exports.Logger = exports.InvalidRequestException = exports.InternalException = exports.GraphQLException = exports.GraphQLClient = exports.Exception = exports.codes = exports.AuthorizationException = undefined;

var _exception = __webpack_require__(/*! ./exception */ "./src/exception/index.js");

var _exception2 = _interopRequireDefault(_exception);

var _graphql = __webpack_require__(/*! ./utils/graphql */ "./src/utils/graphql.js");

var _graphql2 = _interopRequireDefault(_graphql);

var _logger = __webpack_require__(/*! ./utils/logger */ "./src/utils/logger.js");

var _logger2 = _interopRequireDefault(_logger);

var _server = __webpack_require__(/*! ./server */ "./src/server.js");

var _server2 = _interopRequireDefault(_server);

var _codes = __webpack_require__(/*! ./exception/codes */ "./src/exception/codes.js");

var codes = _interopRequireWildcard(_codes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _server2.default;
exports.AuthorizationException = _exception.AuthorizationException;
exports.codes = codes;
exports.Exception = _exception2.default;
exports.GraphQLClient = _graphql2.default;
exports.GraphQLException = _exception.GraphQLException;
exports.InternalException = _exception.InternalException;
exports.InvalidRequestException = _exception.InvalidRequestException;
exports.Logger = _logger2.default;
exports.NetworkException = _exception.NetworkException;
exports.ServiceUnavailableException = _exception.ServiceUnavailableException;

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
 * @param  {Object} tokens The map of morgan tokens
 * @param  {Object} req    The request context
 * @param  {Object} res    The response context
 * @return {Object}        The format meta object
 */
var formatter = exports.formatter = function formatter(tokens, req, res) {
  var responseTime = tokens['response-time'](req, res);

  return JSON.stringify({
    'remote-addr': tokens['remote-addr'](req),
    date: tokens.date(req, res, 'clf'),
    method: tokens.method(req),
    url: tokens.url(req),
    HTTP: tokens['http-version'](req),
    'user-agent': tokens['user-agent'](req),
    referrer: tokens.referrer(req),
    status: tokens.status(req, res),
    'res[content-length]': tokens.res(req, res, 'content-length'),
    'response-time': responseTime + ' ms'
  });
};

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

var _logger = __webpack_require__(/*! ../utils/logger */ "./src/utils/logger.js");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var LOGGER = _logger2.default.getLogger('root');

/**
 * [errorMiddleware description]
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return next();

          case 3:
            _context.next = 12;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);

            debugger;
            LOGGER.error(_context.t0, ctx);
            ctx.status = _context.t0.status || 500;
            ctx.body = _context.t0.message;
            ctx.app.emit('error', _context.t0, ctx);

          case 12:
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
 * Add a transaction identifier to every request to track a request's control flow. We use a transactoin ID instead of
 * the session ID or user since both are persistent(ish) identification.
 *
 * @param  {[type]}   ctx   [description]
 * @param  {Function} next  [description]
 * @return {[type]}         [description]
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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Catches ctrl+c event
process.on('SIGINT', _sigInitHandler2.default);

// Catches uncaught exceptions and rejections
process.on('uncaughtException', _uncaughtExceptionHandler2.default);
process.on('unhandledRejection', _unhandledRejectionHandler2.default);

/**
 * [app description]
 * @type {[type]}
 */

var Server = function () {

  /**
   * [constructor description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  function Server(config, appRouter) {
    _classCallCheck(this, Server);

    // atexit handler
    process.on('exit', this.destroy);

    this.config = config;

    // Initialize the express server
    this.app = new _koa2.default();

    // Create the logger
    this.logger = _logger2.default.getLogger('app');

    // Configure the app with common middleware
    this.initialize(this.app);

    // Combine with application-specific router
    _router2.default.use(appRouter.routes());
    debugger;

    this.app.use(_router2.default.routes());
    this.app.use(_router2.default.allowedMethods());
  }

  /**
   * [createServer description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */


  Server.prototype.createServer = function createServer() {
    return this.config.get('secure') ? this.createHttpsServer() : this.app;
  };

  /**
   * [startHttps description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */


  Server.prototype.createHttpsServer = function createHttpsServer() {
    this.app.all('*', function cb(request, response, next) {
      if (request.secure) {
        return next();
      }

      return response.redirect('https://' + request.hostname + ':' + this.config.get('port') + request.url);
    });

    var sslConfig = this.config.get('ssl');
    var httpsConfig = Object.assign({}, sslConfig, {
      key: _fs2.default.readFileSync(sslConfig.get('key')),
      cert: _fs2.default.readFileSync(sslConfig.get('cert'))
    });

    return _https2.default.createServer(httpsConfig, this.app.callback());
  };

  /**
   * [callback description]
   * @type {Function}
   */


  Server.prototype.getListenCallback = function getListenCallback(callback) {
    var _this = this;

    return function () {
      if (callback != null) {
        callback();
      }

      if (process.send) {
        process.send('ready');
      }

      _this.logger.info('Server listening at ' + _this.config.get('hostname') + ':' + _this.config.get('port') + '...');
    };
  };

  /**
   * [app description]
   * @type {[type]}
   */


  Server.prototype.initialize = function initialize(app) {
    // Add common request security measures
    app.use((0, _koaHelmet2.default)());

    // Enabled CORS (corss-origin resource sharing)
    app.use((0, _koaCors2.default)(this.config.get('cors')));

    // request compression
    app.use((0, _koaCompress2.default)(this.config.get('compress')));

    // Initialize body parser before routes or body will be undefined
    app.use((0, _koaBody2.default)(this.config.get('body')));

    // Trace a single request process (including over async)
    app.use(_transaction2.default);

    // Configure Request logging
    app.use(_accessLogger2.default);

    // Configure the request error handling
    app.use(_error2.default);

    // Serve asset resources using the 'assets' url
    app.use((0, _koaMount2.default)(this.config.assets.get('url'), (0, _koaStatic2.default)(this.config.assets.get('path'), this.config.assets.get('options'))));

    // Serve static resources using the 'static' url
    app.use((0, _koaMount2.default)(this.config.static.get('url'), (0, _koaStatic2.default)(this.config.static.get('path'), this.config.static.get('options'))));
  };

  /**
   * [destroy description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */


  Server.prototype.destroy = function destroy() {
    // TODO logger destroy?
    process.emit('destroy');
  };

  /**
   * [callback description]
   * @type {Function}
   */


  Server.prototype.start = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.app) {
                _context.next = 2;
                break;
              }

              throw new Error('Cannot start server: the express instance is not defined');

            case 2:
              _context.prev = 2;
              return _context.abrupt('return', this.createServer().listen(this.config.get('port'), this.config.get('hostname'), this.config.get('backlog'), this.getListenCallback(callback)));

            case 6:
              _context.prev = 6;
              _context.t0 = _context['catch'](2);

              this.logger.error(_context.t0);
              this.destroy();
              throw _context.t0;

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[2, 6]]);
    }));

    function start() {
      return _ref.apply(this, arguments);
    }

    return start;
  }();

  /**
   * [stop description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */


  Server.prototype.stop = function stop() {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    this.logger.info('Server (' + this.config.hostname + ':' + this.config.port + ') stopping...');
    this.destroy();

    if (callback) {
      callback();
    }
  };

  return Server;
}();

exports.default = Server;

/***/ }),

/***/ "./src/utils/graphql.js":
/*!******************************!*\
  !*** ./src/utils/graphql.js ***!
  \******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (uri) {
  return new _apolloClient.ApolloClient({
    cache: new _apolloCacheInmemory.InMemoryCache(),
    connectToDevTools: "development" === 'development',
    link: defaultLink({ uri: uri })
  });
};

var _exception = __webpack_require__(/*! ../exception */ "./src/exception/index.js");

var _nodeFetch = __webpack_require__(/*! node-fetch */ "node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _apolloClient = __webpack_require__(/*! apollo-client */ "apollo-client");

var _apolloLink = __webpack_require__(/*! apollo-link */ "apollo-link");

var _apolloLinkHttp = __webpack_require__(/*! apollo-link-http */ "apollo-link-http");

var _apolloCacheInmemory = __webpack_require__(/*! apollo-cache-inmemory */ "apollo-cache-inmemory");

var _apolloLinkError = __webpack_require__(/*! apollo-link-error */ "apollo-link-error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * [description]
 * @return {[type]} [description]
 */
function defaultErrorHandler(error) {
  if (error.graphQLErrors) {
    // eslint-disable-next-line no-param-reassign
    error.response.errors = error.graphQLError.map(function (err) {
      return new _exception.GraphQLException(err);
    });
  }

  if (error.networkError) {
    // eslint-disable-next-line no-param-reassign
    error.networkError = new _exception.NetworkException(error.networkError);
  }
}

/**
 * [DefaultLink description]
 * @param       {[type]} opts [description]
 * @constructor
 */
function defaultLink(opts) {
  return _apolloLink.ApolloLink.from([
  // eslint-disable-next-line new-cap
  new _apolloLinkError.onError(defaultErrorHandler), new _apolloLinkHttp.HttpLink({ uri: opts.uri, fetch: _nodeFetch2.default })]);
}

/**
 * [description]
 * @param  {[type]} uri  [description]
 * @return {[type]}      [description]
 */

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
 *
 */
var Logger = (_temp = _class = function (_Bunyan) {
  _inherits(Logger, _Bunyan);

  function Logger() {
    _classCallCheck(this, Logger);

    return _possibleConstructorReturn(this, _Bunyan.apply(this, arguments));
  }

  /**
   * [debug description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */
  Logger.prototype._emit = function _emit(rec, noemit) {
    var r = this.serializeTransaction(rec);

    // eslint-disable-next-line no-underscore-dangle
    return _Bunyan.prototype._emit.call(this, r, noemit);
  };

  /**
   * [formatTransaction description]
   * @param  {[type]} Object [description]
   * @return {[type]}        [description]
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
   * [getLogger description]
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */


  Logger.getLogger = function getLogger(name) {
    var handlersConfig = _config2.default.get('loggers').get('handlers');
    var loggerName = name == null ? DEFAULT_LOGGER_NAME : name.toLowerCase();

    if (!(loggerName in Logger.loggers)) {
      Logger.loggers[loggerName] = new Logger(handlersConfig.get(loggerName));
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
 * [sigIntHandler description]
 * @param  {[type]} void [description]
 * @return {[type]}      [description]
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
 * [uncaughtExceptionHandler description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
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
 * [unhandledRejectionHandler description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
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

/***/ "apollo-cache-inmemory":
/*!****************************************!*\
  !*** external "apollo-cache-inmemory" ***!
  \****************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("apollo-cache-inmemory");

/***/ }),

/***/ "apollo-client":
/*!********************************!*\
  !*** external "apollo-client" ***!
  \********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("apollo-client");

/***/ }),

/***/ "apollo-link":
/*!******************************!*\
  !*** external "apollo-link" ***!
  \******************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("apollo-link");

/***/ }),

/***/ "apollo-link-error":
/*!************************************!*\
  !*** external "apollo-link-error" ***!
  \************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("apollo-link-error");

/***/ }),

/***/ "apollo-link-http":
/*!***********************************!*\
  !*** external "apollo-link-http" ***!
  \***********************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("apollo-link-http");

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

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

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