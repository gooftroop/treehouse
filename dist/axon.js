module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api/controllers/404.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * [notFound description]
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // Koa defaults to 404 status
            ctx.body = "You shouldn't be here!";

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function notFound(_x) {
    return _ref.apply(this, arguments);
  }

  return notFound;
}();

/***/ }),

/***/ "./src/api/controllers/health.js":
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

/***/ "./src/api/router.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _koaRouter = __webpack_require__("koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _health = __webpack_require__("./src/api/controllers/health.js");

var _health2 = _interopRequireDefault(_health);

var _ = __webpack_require__("./src/api/controllers/404.js");

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();

router.get('/heath', _health2.default);
router.all('*', _2.default);

exports.default = router;

/***/ }),

/***/ "./src/exception/codes.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var FATAL_ERROR = exports.FATAL_ERROR = {
  status: 500,
  code: 0,
  category: 'IllegalStateException',
  message: 'An error occurred. If this error persists, please contact your System Administrator'
};

var GENERAL_ERROR = exports.GENERAL_ERROR = function GENERAL_ERROR(message) {
  return {
    status: 400,
    code: 0,
    category: 'GeneralException',
    message: message
  };
};

var NOT_YET_IMPLEMENTED = exports.NOT_YET_IMPLEMENTED = {
  status: 501,
  code: 1,
  category: 'NotYetImplemented',
  message: 'This method must be implmented'
};

var ILLEGAL_STATE_EXCEPTION = exports.ILLEGAL_STATE_EXCEPTION = {
  status: 500,
  code: 2,
  category: 'IllegalStateException',
  message: 'Application not configured correctly'
};

var NOT_AUTHORIZED = exports.NOT_AUTHORIZED = {
  status: 401,
  code: 3,
  category: 'SecurityException',
  message: 'You are not authorized to access this resource'
};

var NOT_ALLOWED = exports.NOT_ALLOWED = {
  status: 403,
  code: 4,
  category: 'SecurityException',
  message: 'You are not authorized to access this resource'
};

var MISSING_REQUIRED_PARAMETER = exports.MISSING_REQUIRED_PARAMETER = {
  status: 400,
  code: 5,
  category: 'GeneralException',
  message: 'A required parameter was missing'
};

var MODEL_NOT_FOUND = exports.MODEL_NOT_FOUND = {
  status: 404,
  code: 100,
  category: 'NotFoundException',
  message: 'Requested model could not be found'
};

var MODEL_NOT_UPDATED = exports.MODEL_NOT_UPDATED = {
  status: 400,
  code: 200,
  category: 'TransactionException',
  message: 'Update failed'
};

var MODEL_NOT_CREATED = exports.MODEL_NOT_CREATED = {
  status: 400,
  code: 201,
  category: 'TransactionException',
  message: 'Creation failed'
};

var VALIDATION_ERROR = exports.VALIDATION_ERROR = function VALIDATION_ERROR(message) {
  return {
    status: 400,
    code: 202,
    category: 'ValidationException',
    message: message
  };
};

/***/ }),

/***/ "./src/exception/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.codes = exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _codes = __webpack_require__("./src/exception/codes.js");

var codes = _interopRequireWildcard(_codes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_CODE = 0;
var DEFAULT_MESSAGE = 'An Unknown error occurred';

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

  return status == null ? DEFAULT_CODE : status;
}

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
   * @return {[type]}         [description]
   */
  function Exception() {
    var payload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_MESSAGE;
    var status = arguments[1];

    _classCallCheck(this, Exception);

    var _this = _possibleConstructorReturn(this, _Error.call(this, resolveMessage(payload)));

    _this.code = resolveCode(payload);
    _this.status = resolveStatus(payload, status);

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(_this, _this.constructor);
    } else {
      _this.stack = new Error(message).stack;
    }
    return _this;
  }

  /**
   *
   */


  Exception.prototype.toString = function toString() {
    return this.code + ' - ' + this.status + ' ' + this.message;
  };

  return Exception;
}(Error);

exports.default = Exception;
exports.codes = codes;

/***/ }),

/***/ "./src/main.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.router = exports.Logger = exports.Exception = exports.codes = undefined;

var _exception = __webpack_require__("./src/exception/index.js");

var _exception2 = _interopRequireDefault(_exception);

var _logger = __webpack_require__("./src/utils/logger.js");

var _logger2 = _interopRequireDefault(_logger);

var _router = __webpack_require__("./src/api/router.js");

var _router2 = _interopRequireDefault(_router);

var _server = __webpack_require__("./src/server.js");

var _server2 = _interopRequireDefault(_server);

var _codes = __webpack_require__("./src/exception/codes.js");

var codes = _interopRequireWildcard(_codes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _server2.default;
exports.codes = codes;
exports.Exception = _exception2.default;
exports.Logger = _logger2.default;
exports.router = _router2.default;

/***/ }),

/***/ "./src/middleware/accessLogger.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.formatter = undefined;

var _koaMorgan = __webpack_require__("koa-morgan");

var _koaMorgan2 = _interopRequireDefault(_koaMorgan);

var _logger = __webpack_require__("./src/utils/logger.js");

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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = errorMiddleware;

var _logger = __webpack_require__("./src/utils/logger.js");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOGGER = _logger2.default.getLogger('root');

/**
 * [errorParser description]
 * @param  {[type]}   e     [description]
 * @param  {[type]}   ctx   [description]
 * @return {[type]}         [description]
 */
function errorMiddleware(e, ctx) {
  return ctx ? LOGGER.error(e, ctx) : LOGGER.error(e);
}

/***/ }),

/***/ "./src/middleware/transaction.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _domain = __webpack_require__("domain");

var _domain2 = _interopRequireDefault(_domain);

var _v = __webpack_require__("uuid/v4");

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
exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ctx, next) {
    var transactionId, transaction;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            transactionId = (0, _v2.default)();
            transaction = _domain2.default.create();

            // eslint-disable-next-line no-param-reassign

            ctx.transactionId = transactionId;

            transaction.add(ctx);
            transaction.data = {
              id: transactionId,
              ctx: ctx
            };

            transaction.run(next);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function transactionMiddleware(_x, _x2) {
    return _ref.apply(this, arguments);
  }

  return transactionMiddleware;
}();

/***/ }),

/***/ "./src/server.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _koaBody = __webpack_require__("koa-body");

var _koaBody2 = _interopRequireDefault(_koaBody);

var _koaCompress = __webpack_require__("koa-compress");

var _koaCompress2 = _interopRequireDefault(_koaCompress);

var _koaCors = __webpack_require__("koa-cors");

var _koaCors2 = _interopRequireDefault(_koaCors);

var _fs = __webpack_require__("fs");

var _fs2 = _interopRequireDefault(_fs);

var _koaHelmet = __webpack_require__("koa-helmet");

var _koaHelmet2 = _interopRequireDefault(_koaHelmet);

var _https = __webpack_require__("https");

var _https2 = _interopRequireDefault(_https);

var _koa = __webpack_require__("koa");

var _koa2 = _interopRequireDefault(_koa);

var _koaMount = __webpack_require__("koa-mount");

var _koaMount2 = _interopRequireDefault(_koaMount);

var _koaStatic = __webpack_require__("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _accessLogger = __webpack_require__("./src/middleware/accessLogger.js");

var _accessLogger2 = _interopRequireDefault(_accessLogger);

var _error = __webpack_require__("./src/middleware/error.js");

var _error2 = _interopRequireDefault(_error);

var _logger = __webpack_require__("./src/utils/logger.js");

var _logger2 = _interopRequireDefault(_logger);

var _sigInitHandler = __webpack_require__("./src/utils/sigInitHandler.js");

var _sigInitHandler2 = _interopRequireDefault(_sigInitHandler);

var _transaction = __webpack_require__("./src/middleware/transaction.js");

var _transaction2 = _interopRequireDefault(_transaction);

var _uncaughtExceptionHandler = __webpack_require__("./src/utils/uncaughtExceptionHandler.js");

var _uncaughtExceptionHandler2 = _interopRequireDefault(_uncaughtExceptionHandler);

var _unhandledRejectionHandler = __webpack_require__("./src/utils/unhandledRejectionHandler.js");

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
  function Server(config) {
    _classCallCheck(this, Server);

    this.config = config;

    // Initialize the express server
    this.app = new _koa2.default();

    // Create the logger
    this.logger = _logger2.default.getLogger('app');

    // Configure the app with common middleware
    this.initialize(this.app);

    // atexit handler
    process.on('exit', this.destroy);
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
      // TODO does this break?
      process.send('ready');
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

    // Serve asset resources using the 'assets' url
    app.use((0, _koaMount2.default)(this.config.assets.get('url'), (0, _koaStatic2.default)(this.config.assets.get('path'), this.config.assets.get('options'))));

    // Serve static resources using the 'static' url
    app.use((0, _koaMount2.default)(this.config.static.get('url'), (0, _koaStatic2.default)(this.config.static.get('path'), this.config.static.get('options'))));

    // Configure the request error handling
    // TODO more specific error handling - make this one a fallback handler?
    app.use(_error2.default);
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
   * Attach middleware & controllers to the Express app.
   * Note: Order matters here.
   * @param  {[type]}  void [description]
   * @return {Promise}      [description]
   */
  // eslint-disable-next-line no-unused-vars


  Server.prototype.configure = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(app, conf) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function configure(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return configure;
  }();

  /**
   * [callback description]
   * @type {Function}
   */
  Server.prototype.start = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (this.app) {
                _context2.next = 2;
                break;
              }

              throw new Error('Cannot start server: the express instance is not defined');

            case 2:
              _context2.prev = 2;
              _context2.next = 5;
              return this.configure(this.app, this.config);

            case 5:
              return _context2.abrupt('return', this.createServer().listen(this.config.get('port'), this.config.get('hostname'), this.config.get('backlog'), this.getListenCallback(callback)));

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2['catch'](2);

              this.logger.error(_context2.t0);
              this.destroy();
              throw _context2.t0;

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[2, 8]]);
    }));

    function start() {
      return _ref2.apply(this, arguments);
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

/***/ "./src/utils/logger.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _class, _temp;

var _bunyan = __webpack_require__("bunyan");

var _bunyan2 = _interopRequireDefault(_bunyan);

var _config = __webpack_require__("config");

var _config2 = _interopRequireDefault(_config);

var _process = __webpack_require__("process");

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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = sigInitHandler;

var _logger = __webpack_require__("./src/utils/logger.js");

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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = uncaughtExceptionHandler;

var _logger = __webpack_require__("./src/utils/logger.js");

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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = unhandledRejectionHandler;

var _logger = __webpack_require__("./src/utils/logger.js");

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
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.js");


/***/ }),

/***/ "bunyan":
/***/ (function(module, exports) {

module.exports = require("bunyan");

/***/ }),

/***/ "config":
/***/ (function(module, exports) {

module.exports = require("config");

/***/ }),

/***/ "domain":
/***/ (function(module, exports) {

module.exports = require("domain");

/***/ }),

/***/ "fs":
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "https":
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "koa":
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-body":
/***/ (function(module, exports) {

module.exports = require("koa-body");

/***/ }),

/***/ "koa-compress":
/***/ (function(module, exports) {

module.exports = require("koa-compress");

/***/ }),

/***/ "koa-cors":
/***/ (function(module, exports) {

module.exports = require("koa-cors");

/***/ }),

/***/ "koa-helmet":
/***/ (function(module, exports) {

module.exports = require("koa-helmet");

/***/ }),

/***/ "koa-morgan":
/***/ (function(module, exports) {

module.exports = require("koa-morgan");

/***/ }),

/***/ "koa-mount":
/***/ (function(module, exports) {

module.exports = require("koa-mount");

/***/ }),

/***/ "koa-router":
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),

/***/ "koa-static":
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),

/***/ "process":
/***/ (function(module, exports) {

module.exports = require("process");

/***/ }),

/***/ "uuid/v4":
/***/ (function(module, exports) {

module.exports = require("uuid/v4");

/***/ })

/******/ });
//# sourceMappingURL=axon.js.map