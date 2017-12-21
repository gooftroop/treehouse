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

/***/ "./index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jarvis_exception__ = __webpack_require__("./src/exception/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jarvis_exception___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jarvis_exception__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jarvis_main__ = __webpack_require__("./src/main.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jarvis_main___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jarvis_main__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jarvis_exception_codes__ = __webpack_require__("./src/exception/codes.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jarvis_exception_codes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jarvis_exception_codes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jarvis_utils_logger__ = __webpack_require__("./src/utils/logger.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jarvis_utils_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jarvis_utils_logger__);





/* harmony default export */ __webpack_exports__["default"] = ({
  Server: __WEBPACK_IMPORTED_MODULE_1_jarvis_main___default.a,
  error: {
    codes: __WEBPACK_IMPORTED_MODULE_2_jarvis_exception_codes__,
    Exception: __WEBPACK_IMPORTED_MODULE_0_jarvis_exception___default.a
  },
  logger: {
    getLogger: __WEBPACK_IMPORTED_MODULE_3_jarvis_utils_logger__["getLogger"],
  }
});


/***/ }),

/***/ "./src/api/controllers/health.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.ping = ping;

/**
 * [ping description]
 * @param  {[type]} request  [description]
 * @param  {[type]} response [description]
 * @return {[type]}          [description]
 */
function ping(request, response) {
  return response.status(200).send('pong');
}

/***/ }),

/***/ "./src/api/controllers/meta.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.describe = describe;
/**
 * [describe description]
 * @param  {[type]} doc [description]
 * @return {[type]}
 */
function describe(doc) {
  return function (request, response) {
    return response.send(doc);
  };
}

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
  var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return {
    status: 400,
    code: 0,
    category: 'GeneralException',
    message: message,
    extra: extra
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
  var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return {
    status: 400,
    code: 202,
    category: 'ValidationException',
    message: message,
    extra: extra
  };
};

/***/ }),

/***/ "./src/exception/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

/***/ }),

/***/ "./src/main.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bodyParser = __webpack_require__("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__("compression");

var _compression2 = _interopRequireDefault(_compression);

var _cors = __webpack_require__("cors");

var _cors2 = _interopRequireDefault(_cors);

var _express = __webpack_require__("express");

var _express2 = _interopRequireDefault(_express);

var _connectFlashPlus = __webpack_require__("connect-flash-plus");

var _connectFlashPlus2 = _interopRequireDefault(_connectFlashPlus);

var _fs = __webpack_require__("fs");

var _fs2 = _interopRequireDefault(_fs);

var _helmet = __webpack_require__("helmet");

var _helmet2 = _interopRequireDefault(_helmet);

var _https = __webpack_require__("https");

var _https2 = _interopRequireDefault(_https);

var _process = __webpack_require__("process");

var _process2 = _interopRequireDefault(_process);

var _swaggerTools = __webpack_require__("swagger-tools");

var _swaggerTools2 = _interopRequireDefault(_swaggerTools);

var _logging = __webpack_require__("./src/middleware/logging.js");

var _meta = __webpack_require__("./src/api/controllers/meta.js");

var _error = __webpack_require__("./src/middleware/error.js");

var _logger = __webpack_require__("./src/utils/logger.js");

var _health = __webpack_require__("./src/api/controllers/health.js");

var _transaction = __webpack_require__("./src/middleware/transaction.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_SWAGGER_OPTS = {
  apiDocs: '/api-docs',
  apiDocsPrefix: '',
  controllers: {},
  ignoreMissingHandlers: false,
  security: {},
  swaggerUi: '/docs',
  swaggerUiDir: '',
  swaggerUiPrefix: '',
  useStubs: false,
  validateResponse: true
};

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

    this.config = _extends({}, config);

    // Initialize the express server
    this.app = (0, _express2.default)();

    // Create all the loggers
    (0, _logger.createLoggers)(config);

    // Configure the app with common middleware
    this.configure(this.app);

    // Catches ctrl+c event
    this.boundSigIntHandler = this.sigIntHandler.bind(this);
    _process2.default.on('SIGINT', this.boundSigIntHandler);

    // Catches uncaught exceptions and rejections
    this.boundUncaughtExceptionHandler = this.unhandledExceptionHandler.bind(this);
    _process2.default.on('uncaughtException', this.boundUncaughtExceptionHandler);
    _process2.default.on('unhandledRejection', this.boundUncaughtExceptionHandler);
  }

  /**
   * [app description]
   * @type {[type]}
   */


  Server.prototype.configure = function configure(app) {

    // Attach the logger (also create since this is the first access)
    this.logger = (0, _logger.getLogger)('root');

    // Add common request security measures
    app.use((0, _helmet2.default)());

    // Enabled CORS (corss-origin resource sharing)
    app.use((0, _cors2.default)(config.cors));

    // request compression
    app.use((0, _compression2.default)());

    // Initialize body parser before routes or body will be undefined
    app.use(_bodyParser2.default.urlencoded({ extended: true }));
    app.use(_bodyParser2.default.json());

    // Setup flash messaging
    app.use((0, _connectFlashPlus2.default)({ unsafe: true }));

    // Trace a single request process (including over async)
    app.use(_transaction.transactionMiddleware);

    // Configure Request logging
    // TODO switch to morgan
    app.use(_logging.accessLogger);

    // Serve asset resources using the 'assets' url
    app.use(conf.assets.get('url'), _express2.default.static(conf.assets.get('path')));

    // Serve static resources using the 'static' url
    app.use(conf.static.get('url'), _express2.default.static(conf.static.get('path')));

    // Configure the request error handling
    // TODO more specific error handling - make this one a fallback handler?
    app.use(_error.errorMiddleware);
  };

  /**
   * [destroy description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */


  Server.prototype.destroy = function destroy() {
    this.removeEventListeners();
    // TODO logger destroy
    // TODO send destroy event?
  };

  /**
   * Attach middleware & controllers to the Express app.
   * Note: Order matters here.
   * @param  {[type]}  void [description]
   * @return {Promise}      [description]
   */


  Server.prototype.initialize = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(app, conf) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              throw new Error('initialize must be implemented');

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function initialize(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return initialize;
  }();

  /**
   * Initializes the Swagger middleware with the given swagger document and options.
   * Applies the following middleware:
   * - <code>metadata</code>
   * - <code>validator</code>
   * - <code>security</code>
   * - <code>router</code>
   * - <code>ui</code>
   *
   * Reference: https://github.com/apigee-127/swagger-tools/blob/master/docs/Middleware.md
   *
   * Options
   * =======
   * validateResponse       [boolean=false]           Whether or not to validate responses
   * apiDocs                [string=/api-docs]        The path to serve the Swagger documents from
   * apiDocsPrefix          [string=]                 The prefix to prepend to the options.apiDocs (This is required
   *                                                  when serving a swagger-tools based API behind a reverse proxy.)
   * swaggerUi              [string=/docs]            The path to serve Swagger UI from
   * swaggerUiDir           [string]                  The filesystem path to your custom swagger-ui deployment to serve
   * swaggerUiPrefix        [string]                  The prefix to prepend to the options.swaggerUi (This is required
   *                                                  when serving a swagger-tools UI behind a reverse proxy.)
   * security               [object]                  An object containing the authorization/security name, the value is
   *                                                  a function that will be used to perform the authentication/
   *                                                  authorization. The function signature for the callback is:
   *                                                  function (req, authOrSecDef, scopesOrApiKey, callback).
   * controllers            [string|string[]|object]  The controllers to look for or use. If the value is a string, we
   *                                                  assume the value is a path to a directory that contain controller
   *                                                  modules. If the value is an array, we assume the value is an array
   *                                                  of paths to directories that contain controller modules. If the
   *                                                  value is an object, we assume the object keys are the handler name
   *                                                  ({ControllerName}{HandlerFunctionName}) and the value is a
   *                                                  function.
   * ignoreMissingHandlers: [boolean]                 When false (default), a 500 is returned when a handler cannot be
   *                                                  found. When true, we will ignore the missing handler and send the
   *                                                  request downstream.
   * useStubs:              [boolean]                 Whether or not stub handlers should be used for routes with no
   *                                                  defined controller or the controller could not be found.
   *
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */


  Server.prototype.initializeSwagger = function initializeSwagger(doc, options) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      _swaggerTools2.default.initializeMiddleware(doc, function (middleware) {
        if (!middleware) {
          reject(new Error('Failed to initialize swagger'));
        }

        var mergedOpts = _extends({}, DEFAULT_SWAGGER_OPTS, {
          options: options

          // Interpret Swagger resources and attach metadata to request
        });_this.app.use(middleware.swaggerMetadata());

        // Validate Swagger requests
        _this.app.use(middleware.swaggerValidator({
          validateResponse: mergedOpts.validateResponse
        }));

        // Authenticate/authorize requests based on the authorization/security definitions
        _this.app.use(middleware.swaggerSecurity(mergedOpts.security));

        // Route validated requests to appropriate controller
        app.use(middleware.swaggerRouter({
          controllers: _extends({}, mergedOpts.controllers, {
            describe: (0, _meta.describe)(doc),
            ping: _health.ping
          }),
          ignoreMissingHandlers: mergedOpts.ignoreMissingHandlers,
          useStubs: mergedOpts.useStubs
        }));

        // Serve the Swagger documents and Swagger UI
        app.use(middleware.swaggerUi({
          apiDocs: mergedOpts.apiDocs,
          apiDocsPrefix: mergedOpts.apiDocsPrefix,
          swaggerUi: mergedOpts.swaggerUi,
          swaggerUiDir: mergedOpts.swaggerUiDir,
          swaggerUiPrefix: mergedOpts.swaggerUiPrefix
        }));

        resolve();
      });
    });
  };

  /**
   * [onStart description]
   * @param  {[type]} Promise [description]
   * @return {[type]}         [description]
   */


  Server.prototype.onStart = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.initialize(this.app, this.config);

            case 2:

              // Send 404 if we get here in the route processing
              app.all('*', _error.notFoundError);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function onStart() {
      return _ref2.apply(this, arguments);
    }

    return onStart;
  }();

  /**
   * [callback description]
   * @type {Function}
   */


  Server.prototype.start = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var _this2 = this;

      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var cb;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (this.app) {
                _context3.next = 2;
                break;
              }

              throw new Error('Cannot start server: the express instance is not defined');

            case 2:
              cb = function cb() {
                if (callback != null) {
                  callback();
                }
                // process.send('ready');
                _this2.logger.info('Server listening at ' + _this2.config.get('hostname') + ':' + _this2.config.get('port') + '...');
              };

              _context3.prev = 3;
              _context3.next = 6;
              return this.onStart();

            case 6:
              return _context3.abrupt('return', this.config.get('secure') ? this.startHttps(cb) : this.startHttp(cb));

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3['catch'](3);

              if (this.logger) {
                this.logger.error(_context3.t0);
              } else {
                /* eslint-disable no-console */
                console.error(_context3.t0);
              }
              this.destroy();
              throw _context3.t0;

            case 14:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[3, 9]]);
    }));

    function start() {
      return _ref3.apply(this, arguments);
    }

    return start;
  }();

  /**
   * [startHttp description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */


  Server.prototype.startHttp = function startHttp(callback) {
    return this.app.listen(this.config.get('port'), this.config.get('hostname'), this.config.get('backlog'), callback);
  };

  /**
   * [startHttps description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */


  Server.prototype.startHttps = function startHttps(callback) {
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

    return _https2.default.createServer(httpsConfig, this.app).listen(this.config.get('port'), this.config.get('hostname'), this.config.get('backlog'), callback);
  };

  /**
   * [stop description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */


  Server.prototype.stop = function stop() {
    var _this3 = this;

    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (this.app && this.app.server) {
      this.app.server.close(function () {
        if (callback != null && typeof callback === 'function') {
          callback();
        }
        _this3.logger.info('Server (' + _this3.config.hostname + ':' + _this3.config.port + ') stopping...');
      });
    }
    this.destroy();
  };

  /**
   * [sigIntHandler description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */


  Server.prototype.sigIntHandler = function sigIntHandler() {
    if (this.logger) {
      this.logger.info('Captured ctrl-c');
    }

    this.stop();
    _process2.default.exit(0);
  };

  /**
   * [removeEventListeners description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */


  Server.prototype.removeEventListeners = function removeEventListeners() {
    _process2.default.removeListener('SIGINT', this.boundSigIntHandler);
    _process2.default.removeListener('uncaughtException', this.boundUncaughtExceptionHandler);
  };

  /**
   * [unhandledExceptionHandler description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */


  Server.prototype.unhandledExceptionHandler = function unhandledExceptionHandler(e) {
    if (this.logger) {
      this.logger.error('An unhandled exception occurred. Reporting then terminating process');
      this.logger.error(e);
    }

    this.stop();
    _process2.default.exit(1);
  };

  return Server;
}();

exports.default = Server;

/***/ }),

/***/ "./src/middleware/error.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.errorMiddleware = errorMiddleware;
exports.notFoundError = notFoundError;

var _logger = __webpack_require__("./src/utils/logger.js");

var LOGGER = (0, _logger.getLogger)('root');

/**
 * [errorParser description]
 * @param  {[type]}   error    [description]
 * @param  {[type]}   request  [description]
 * @param  {[type]}   response [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
function errorMiddleware(error, request, response, next) {
  var e = _extends({}, error);

  if (!('status' in e)) {
    e.status = 500;
  }

  if (!('code' in e)) {
    e.code = -1;
  }

  LOGGER.error(e);
  response.status(e.code).send(e);
}

/**
 * [notFoundError description]
 * @param  {[type]}   request  [description]
 * @param  {[type]}   response [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
function notFoundError(request, response) {
  response.status(404).send();
}

/***/ }),

/***/ "./src/middleware/logging.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.accessLogger = accessLogger;

var _logger = __webpack_require__("./src/utils/logger.js");

var LOGGER = (0, _logger.getLogger)('request');

/**
 * TODO use morgan
 */
function accessLogger(request, response, next) {
  LOGGER.info({
    method: request.method,
    url: request.url,
    headers: request.headers
  });
  next();
}

/***/ }),

/***/ "./src/middleware/transaction.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.transactionMiddleware = transactionMiddleware;

var _domain = __webpack_require__("domain");

var _domain2 = _interopRequireDefault(_domain);

var _v = __webpack_require__("uuid/v4");

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Add a transaction identifier to every request to track a request's control flow. We use a transactoin ID instead of
 * the session ID or user since both are persistent(ish) identification.
 *
 * @param  {[type]}   request  [description]
 * @param  {[type]}   response [description]
 * @param  {Function} next     [description]
 * @return {[type]}            [description]
 */
function transactionMiddleware(request, response, next) {
  var transactionId = (0, _v2.default)();
  var transaction = _domain2.default.create();

  // eslint-disable-next-line no-param-reassign
  request.transactionId = transactionId;

  transaction.add(request);
  transaction.add(response);
  transaction.data = {
    id: transactionId,
    request: request,
    response: response
  };

  transaction.run(next);
}

/***/ }),

/***/ "./src/utils/logger.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getLogger = getLogger;
exports.createLoggers = createLoggers;

var _bunyan = __webpack_require__("bunyan");

var _bunyan2 = _interopRequireDefault(_bunyan);

var _process = __webpack_require__("process");

var _process2 = _interopRequireDefault(_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_CODE = 0;
var DEFAULT_MESSAGE = 'This is not the message you are looking for';
var DEFAULT_STATUS = 500;

var loggers = {};

/**
 *
 */

var Logger = function (_Bunyan) {
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
  Logger.prototype.debug = function debug() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _Bunyan.prototype.debug.call(this, this.format(args));
  };

  /**
   * [error description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */


  Logger.prototype.error = function error() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _Bunyan.prototype.error.call(this, this.format(args));
  };

  /**
   * [info description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */


  Logger.prototype.info = function info() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _Bunyan.prototype.info.call(this, this.format(args));
  };

  /**
   * [trace description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */


  Logger.prototype.trace = function trace() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return _Bunyan.prototype.trace.call(this, this.format(args));
  };

  /**
   * [warn description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */


  Logger.prototype.warn = function warn() {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return _Bunyan.prototype.warn.call(this, this.format(args));
  };

  /**
   * [format description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */


  Logger.prototype.format = function format(args) {
    return _extends({}, formatInput(args), formatTransaction());
  };

  /**
   * [formatInput description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */


  Logger.prototype.formatInput = function formatInput(args) {
    var payload = {};

    // Arrays shouldn't exist, but in the
    // off-chance they do, turn it into a string
    var arg1 = Array.isArray(args[0]) ? JSON.stringify(args[0]) : args[0];

    switch (typeof arg1 === 'undefined' ? 'undefined' : _typeof(arg1)) {
      case 'object':
        payload = _extends({
          code: DEFAULT_CODE,
          status: DEFAULT_STATUS
        }, arg1);
        break;
      default:

        // Attempt to convert the parameter to JSON object,
        // falling back to just applying it to the message attribute
        try {
          payload.message = JSON.parse(arg1);
        } catch (e) {
          payload.message = arg1;
        }

        payload.status = args.length > 1 ? args[1] : DEFAULT_STATUS;
        payload.code = args.length > 2 ? args[2] : DEFAULT_CODE;
        break;
    }

    return payload;
  };

  /**
   * [formatTransaction description]
   * @param  {[type]} Object [description]
   * @return {[type]}        [description]
   */


  Logger.prototype.formatTransaction = function formatTransaction() {
    var payload = {};
    var transaction = _process2.default.domain;

    if (transaction && transaction.data) {
      var request = transaction.data.request;


      payload.sessionId = request.session && request.session.id;
      payload.transactionId = transaction.data.id;

      if (request.user) {
        payload.user = {
          id: request.user.id,
          username: request.user.username
        };
      }
    }

    return payload;
  };

  return Logger;
}(_bunyan2.default);

/**
 * [getLogger description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */


function getLogger(name, opts) {
  var loggerName = name == null ? 'app' : name.toLowerCase();

  return loggers[loggerName];
}

/**
 * [createLogger description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
function createLoggers(config) {
  // breadth-first search of opts
  // if name is under another logger, then is child. get parent logger and create child on it

  var pending = [];
  var seen = [];

  for (var _iterator = config.entries(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
    var _ref2;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref2 = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref2 = _i.value;
    }

    var _ref = _ref2;
    var currName = _ref[0];
    var currConfig = _ref[1];

    pending.push([currName, currConfig]);
    seen.push(currName);
  }

  while (!pending.length) {
    var _pending$pop = pending.pop(),
        _currName = _pending$pop[0],
        _currConfig = _pending$pop[1],
        parentName = _pending$pop[2];

    if (parentName != null) {
      loggers[_currName] = loggers[parentName].child(_extends({
        component: _currName
      }, _currConfig));
    } else {
      loggers[_currName] = new Logger(_currConfig);
    }

    for (var _iterator2 = _currConfig.entries(), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref4;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref4 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref4 = _i2.value;
      }

      var _ref3 = _ref4;
      var childName = _ref3[0];
      var childConfig = _ref3[1];

      if (!seen.includes(childName)) {
        pending.push([childName, childConfig, _currName]);
        seen.push(childName);
      }
    }
  }
}

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

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("babel-polyfill");
module.exports = __webpack_require__("./index.js");


/***/ }),

/***/ "babel-polyfill":
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),

/***/ "body-parser":
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),

/***/ "bunyan":
/***/ (function(module, exports) {

module.exports = require("bunyan");

/***/ }),

/***/ "compression":
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),

/***/ "connect-flash-plus":
/***/ (function(module, exports) {

module.exports = require("connect-flash-plus");

/***/ }),

/***/ "cors":
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "domain":
/***/ (function(module, exports) {

module.exports = require("domain");

/***/ }),

/***/ "express":
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fs":
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "helmet":
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),

/***/ "https":
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "process":
/***/ (function(module, exports) {

module.exports = require("process");

/***/ }),

/***/ "swagger-tools":
/***/ (function(module, exports) {

module.exports = require("swagger-tools");

/***/ }),

/***/ "uuid/v4":
/***/ (function(module, exports) {

module.exports = require("uuid/v4");

/***/ })

/******/ });
//# sourceMappingURL=jarvis.js.map