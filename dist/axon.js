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

/**
 * [notFound description]
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
var notFound = exports.notFound = function () {
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

  return function notFound(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/***/ }),

/***/ "./src/api/controllers/health.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

/**
 * [ping description]
 * @param  {[type]} ctx  [description]
 * @return {[type]}      [description]
 */
var health = exports.health = function () {
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

  return function health(_x) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/***/ }),

/***/ "./src/api/router.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _koaRouter = __webpack_require__("koa-router");

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _health = __webpack_require__("./src/api/controllers/health.js");

var _ = __webpack_require__("./src/api/controllers/404.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();

router.get('/heath', _health.health);
router.all('*', _.notFound);

exports.default = router;

/***/ }),

/***/ "./src/main.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

exports.__esModule = true;
exports.default = undefined;

var _moduleAlias = __webpack_require__("module-alias");

var _moduleAlias2 = _interopRequireDefault(_moduleAlias);

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

var _error = __webpack_require__("./src/middleware/error.js");

var _logger = __webpack_require__("./src/utils/logger.js");

var _router = __webpack_require__("./src/api/router.js");

var _sigInitHandler = __webpack_require__("./src/utils/sigInitHandler.js");

var _transaction = __webpack_require__("./src/middleware/transaction.js");

var _uncaughtExceptionHandler = __webpack_require__("./src/utils/uncaughtExceptionHandler.js");

var _unhandledRejectionHandler = __webpack_require__("./src/utils/unhandledRejectionHandler.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(0, _moduleAlias2.default)(__dirname + '/package.json');

/* eslint-disable import/first */

/* eslint-enable import/first */

// Catches ctrl+c event
process.on('SIGINT', _sigInitHandler.sigInitHandler);

// Catches uncaught exceptions and rejections
process.on('uncaughtException', _uncaughtExceptionHandler.uncaughtExceptionHandler);
process.on('unhandledRejection', _unhandledRejectionHandler.unhandledRejectionHandler);

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
    this.logger = _logger.Logger.getLogger('app');

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
    app.use(_transaction.transactionMiddleware);

    // Configure Request logging
    app.use(_accessLogger.accessLogger);

    // Serve asset resources using the 'assets' url
    app.use((0, _koaMount2.default)(this.conf.assets.get('url'), (0, _koaStatic2.default)(this.conf.assets.get('path'), this.conf.assets.get('options'))));

    // Serve static resources using the 'static' url
    app.use((0, _koaMount2.default)(this.conf.static.get('url'), (0, _koaStatic2.default)(this.conf.static.get('path'), this.conf.static.get('options'))));

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

              // Mount the default router
              this.app.use(_router.router);

              return _context2.abrupt('return', this.createServer().listen(this.config.get('port'), this.config.get('hostname'), this.config.get('backlog'), this.getListenCallback(callback)));

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2['catch'](2);

              this.logger.error(_context2.t0);
              this.destroy();
              throw _context2.t0;

            case 14:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[2, 9]]);
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
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),

/***/ "./src/middleware/accessLogger.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.accessLogger = exports.formatter = undefined;

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

var accessLogger = exports.accessLogger = (0, _koaMorgan2.default)(formatter, {
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
exports.errorMiddleware = errorMiddleware;

var _logger = __webpack_require__("./src/utils/logger.js");

var LOGGER = _logger.Logger.getLogger('root');

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
exports.transactionMiddleware = undefined;

/**
 * Add a transaction identifier to every request to track a request's control flow. We use a transactoin ID instead of
 * the session ID or user since both are persistent(ish) identification.
 *
 * @param  {[type]}   ctx   [description]
 * @param  {Function} next  [description]
 * @return {[type]}         [description]
 */
var transactionMiddleware = exports.transactionMiddleware = function () {
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

  return function transactionMiddleware(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _domain = __webpack_require__("domain");

var _domain2 = _interopRequireDefault(_domain);

var _v = __webpack_require__("uuid/v4");

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
      var request = transaction.data.request;


      r.sessionId = request.session && request.session.id;
      r.transactionId = transaction.data.id;

      if (request.user) {
        r.user = {
          id: request.user.id,
          username: request.user.username
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

    console.log(handlersConfig);
    var loggerName = name == null ? DEFAULT_LOGGER_NAME : name.toLowerCase();

    if (loggerName === DEFAULT_LOGGER_NAME && !(loggerName in Logger.loggers)) {
      Logger.loggers[loggerName] = new Logger(handlersConfig.get(DEFAULT_LOGGER_NAME));
    } else if (!(loggerName in Logger.loggers)) {
      var parent = Logger.loggers[DEFAULT_LOGGER_NAME];
      var loggerConfig = handlersConfig.get(loggerName) || {};

      Logger.loggers[loggerName] = parent.child(loggerConfig, loggerConfig.simple);
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
exports.sigIntHandler = sigIntHandler;

var _logger = __webpack_require__("./src/utils/logger.js");

var LOGGER = _logger.Logger.getLogger();

/**
 * [sigIntHandler description]
 * @param  {[type]} void [description]
 * @return {[type]}      [description]
 */
function sigIntHandler() {
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
exports.uncaughtExceptionHandler = undefined;

var _logger = __webpack_require__("./src/utils/logger.js");

var LOGGER = (0, _logger.getLogger)('error');

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

exports.uncaughtExceptionHandler = uncaughtExceptionHandler;

/***/ }),

/***/ "./src/utils/unhandledRejectionHandler.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.unhandledRejectionHandler = undefined;

var _logger = __webpack_require__("./src/utils/logger.js");

var LOGGER = (0, _logger.getLogger)('error');

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

exports.unhandledRejectionHandler = unhandledRejectionHandler;

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

/***/ "module-alias":
/***/ (function(module, exports) {

module.exports = require("module-alias");

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