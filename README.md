[![Greenkeeper badge](https://badges.greenkeeper.io/Harmonizly/axon.svg)](https://greenkeeper.io/)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/620e6b698c91472284c97b9f2a1abb78)](https://www.codacy.com/app/Harmonizly/axon?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Harmonizly/axon&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/Harmonizly/axon.svg?branch=master)](https://travis-ci.org/Harmonizly/axon)

# Axon

Axon is a lightweight [Koa](https://koajs.com/), event-based server that provides common configuration and setup in an Object-Oriented design. The purpose of Axon is to help speed up the development of Nodejs services by abstracting out the boilerplate and basic configuration and allow you to focus on your custom middleware or handlers. In addition to providing a core Koa server, Axon also exposes other common utilities:
- [Bunyan](https://github.com/trentm/node-bunyan) `Logger`
- Application-specific Exceptions,
- A server-side oriented GraphQL Client built around [Apollo Client](https://github.com/apollographql/apollo-client) for inter-service communication.

Additional documentation (JSDocs) can be found [here](https://harmonizly.github.io/axon/).

## Installing

```
npm install git@github.com/Harmonizly/axon.git#<verson>
```

You can find the deployment versions [here](https://github.com/Harmonizly/axon/releases).

i.e.
```
git@github.com/Harmonizly/axon.git#0.0.1
```

## Lifecycle

The lifecycle of the server is:
1. Instantiation / Initialization
1. Ready
1. Start HTTP(S)
1. Running
1. Stop
1. Destroying
1. Destroyed

The following events are emitted during the lifecycle, in order:

1. `ready`
1. `before:start`
1. `start`
1. `after:start`
1. `before:stop`
1. `destroy`
1. `after:stop`

Note: `after:stop` is emitted right before the process exists on a normal shut down (via calling `stop()`). This event should only be used for additional cleanup or monitoring and should not attempt to restart or respond to requests.

Every request will run through the following middleware before being evaluated by the router ([koa-router](https://github.com/alexmingoia/koa-router)):

<p style="padding: 30px 0;">
<img src="://github.com/Harmonizly/axon/blob/master/docs/assets/svg/request_processing.svg" />
</p>

The middleware `transaction` is used to tag each request with a unique "transaction" ID using NodeJS [domain]()'s to track a request through it's entire time spent in the app.

The `access logger` middleware uses the `bunyan` logger to record details about each request prior to entering any custom middleware or handlers.

The `error` middleware wraps all custom middleware and handlers in a `try/catch` to provide a uniform way to log the error and send the appropriate response. The `error` middleware ensures that the caught `Error` is some form of `ApiError`, so it is recommended that, if you throw a custom `Error` from any middleware or handlers, you extend `ApiError`.

Axon also provides one common request handler for responding to health check requests at `/health`. The handler is located under `src/api/v1/handlers`.

Third-party middleware references:
- [helmet](https://www.npmjs.com/package/koa-helmet)
- [cors](https://www.npmjs.com/package/koa-cors)
- [body](https://www.npmjs.com/package/koa-body)
- [compress](https://www.npmjs.com/package/koa-compress)

Note! When adding your app-specific `handlers` and `middleware`, please take some time to understand `koa-router` and the difference between global middleware and route-specific middleware.

## Details

A couple notes of interest:

- The server instance listens to `process::exit`, which calls `destroy` to handle process termination.
- If `process.send` exists (i.e. when the process is managed by `pm2`), the instance sends `ready` across `process.send` to notify anyone waiting that the server has beed started.
- When the server is destroying, the instance will `emit` `destroy` on `process` to notify anyone watching that the server is going down.
- The `transactionId` is included with every logging output. The `transaction` context that's included in every logger statement includes information about the user and session, if that data exists. This assumes that an authorized user is attached to the request context as `user` and the session is attached to the request context as `session`.

## Deployment

Axon requires only a configuration object and an app-specific router.
Any method can be overridden. Remember, if you override a method in Axon, you must call `super.<method name>`.

A basic example of consuming Axon:

```
import Server from 'axon';

class MyServer extends Server {

  constructor(): void {
    super(config, router);
  }

  initializeMiddleware() {
    // Initialize any custom middleware  here
  }
}
```

It is highly recommended that you use [node-config](https://github.com/lorenwest/node-config/wiki) as your configuration library and to pass the resulting configuration object to Axon. Axon expects, at minimum, the following configuration structure when accessing configuration variables:

```
{
  body: { ... }, // configuration for koa-body
  cors: { ... }, // configuration for koa-cors
  compress: {},  // configuration for koa-compress
  loggers: {     // Axon logger configuration
    handlers: {
      access: {
        name: 'access',
        level: 'info',
      },
      ...etc.
    },
    streams: {
      // Currently not used
    },
  },
  server: {
    hostname: '0.0.0.0',
    port: 3000,
    secure: false,
    ssl: {
      // ssl configuration for nodejs HTTPS server
    },  
  },    
}
```

## Building

We use `Make` to run various build tasks. See `Makefile` for details on the build process.

To build a deployment (production) `dist`, run `make`.

To build development `dist`, run `make dev`.

When publishing the package to `npm`, `prepublish` will create a production deployment.

## Contributing

Ensure that you are pushing to a branch off of `master` and not to `master` directly.
Please follow standard git flow practices for merging branches with a PR.

The `dist` bundle is created using [webpack](https://webpack.js.org/) (located under the `build/` directory). To build in the `production` mode, ensure that the `NODE_ENV` environment variable is set to `production`.

Distribution is currently hosted through Github, so the binary is currently tracked.
To build and "deploy", run `make` at the root project directory and commit the resulting `dist` bundle.

## Testing

Under construction.

Both unit and integration tests are located under the `tests` directory (`tests/unit` and `tests/integration`) and mirror the `src` directory structure. Tests are written using [Mocha](https://mochajs.org/) and [chai](http://www.chaijs.com/). Coverage reports are automatically collected on test runs using [istanbul](https://github.com/gotwarlost/istanbul).

To run tests, use `npm test`. You can provide additional arguments to `Mocha` by running `npm test -- <opts>`.
