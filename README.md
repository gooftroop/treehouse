[![Codacy Badge](https://api.codacy.com/project/badge/Grade/96c50600236f4d499ee974165aa63850)](https://www.codacy.com/app/gooftroop/treehouse?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=gooftroop/treehouse&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/96c50600236f4d499ee974165aa63850)](https://www.codacy.com/app/gooftroop/treehouse?utm_source=github.com&utm_medium=referral&utm_content=gooftroop/treehouse&utm_campaign=Badge_Coverage)
[![Build Status](https://travis-ci.org/gooftroop/treehouse.svg?branch=master)](https://travis-ci.org/gooftroop/treehouse)

# Treehouse

Treehouse is a lightweight [Koa](https://koajs.com/), event-based server that provides common configuration and setup in an Object-Oriented design for both REST and GraphQL servers. The purpose of Treehouse is to help speed up the development of Nodejs services by abstracting out the boilerplate and basic configuration and allow you to focus on your custom middleware or handlers. In addition to providing a core Koa server, Treehouse also exposes other common utilities:
- [Bunyan](https://github.com/trentm/node-bunyan) `Logger`
- Application-specific Exceptions
- GraphQL Server provided by [Apollo Server 2.0](https://www.apollographql.com/docs/apollo-server/v2/whats-new.html)

Additional documentation and API: [here](https://gooftroop.github.io/treehouse/).

## Why Treehouse

We get it...building your own server from scratch is fun. So if you like taking various libraries and stitching them together, then this library is probably not for you. However, maybe you like the way this library is setup and is exactly the way you'd do it. Or maybe you're tired of seeing "boilerplates" that set everything up for you, tell you how to code your server, etc. etc., but still don't want to set all the middleware and writing common utilities. If you find yourself saying "that's me!", then this library is for you. Treehouse aims to find the correct abstraction and empower you to quickly standup a server so you can focus on the application-specific code.

## Installing

```
npm i @harmonizly/treehouse
```

You can find the deployment versions [here](https://github.com/gooftroop/treehouse/releases).

## Lifecycle

The lifecycle of the server is:
1. Instantiation
1. Initialized
1. Start HTTP(S)
1. Running
1. Stop
1. Destroying
1. Destroyed

Every request will run through the following middleware before being evaluated by the router ([koa-router](https://github.com/alexmingoia/koa-router)):

<br /><p align="center">
  <img src="https://gooftroop.github.io/treehouse/assets/svg/request_processing.svg" />
</p><br />

The middleware `transaction` is used to tag each request with a unique "transaction" ID using NodeJS [domain]()'s to track a request through it's entire time spent in the app.

The `access logger` middleware uses the `bunyan` logger to record details about each request prior to entering any custom middleware or handlers.

The `error` middleware wraps all custom middleware and handlers in a `try/catch` to provide a uniform way to log the error and send the appropriate response. The `error` middleware ensures that the caught `Error` is some form of `ApiError`, so it is recommended that, if you throw a custom `Error` from any middleware or handlers, you extend `ApiError`.

Treehouse also provides one common request handler for responding to health check requests at `/health`. The handler is located under `src/api/v1/handlers`.

Third-party middleware references:
- [helmet](https://www.npmjs.com/package/koa-helmet)
- [cors](https://www.npmjs.com/package/koa-cors)
- [bodyparser](https://www.npmjs.com/package/koa-bodyparser)
- [compress](https://www.npmjs.com/package/koa-compress)

<b>Note!</b> When adding your app-specific `handlers` and `middleware`, please take some time to understand `koa-router` and the difference between global middleware and route-specific middleware.

## Details

The `GraphqQLServer` is an added layer on top of the Treehouse `Server` and sets up `apollo-server 2.0` from the provided schema object using `applyMiddleware`. This merely attaches an additional router to the `Koa` app (from the `Server`) to handle `graphql` requests.

A couple notes of interest:

- The server instance listens to `process:exit`, which calls `destroy` to handle process termination.
- If `process.send` exists (i.e. when the process is managed by `pm2`), the instance sends `ready` across `process.send` to notify anyone waiting that the server has beed started.
- When the server is destroying, the instance will `emit` `destroy` on `process` to notify anyone watching that the server is going down.
- The `transactionId` is included with every logging output. The `transaction` context that's included in every logger statement includes information about the user and session, if that data exists. This assumes that an authorized user is attached to the request context as `user` and the session is attached to the request context as `session`.

## Usage

Treehouse requires only a configuration object, but provides flexibility in how you build you app.
The most basic, quick way to get your server running with Treehouse with or without custom middleware and one or more application-specific routers is:

```
import Server from 'treehouse';

const server = new Server(config)
  .middleware(app => {
    // Attach any middleware here
    // OR
    // Attach any application-specific routers to the app
    // Remember! Order matters when using a connect-based server
  })
  // Provide a callback function to have custom code executed when the server starts
  .onStart(...)
  // Provide a callback function to have custom code executed when the server stops
  .onStop(...);

server.start();
```

The GraphQL Server follows the same pattern, but requires a `schema` object:

```
import { GraphqQLServer } from 'treehouse';
import { makeExecutableSchema } from 'apollo-server-koa';

const schema = makeExecutableSchema(typedefs, resolvers);

const server = new GraphqQLServer(config, schema)
  .middleware(app => {
    // Attach any middleware here
    // OR
    // Attach any application-specific routers to the app
    // Remember! Order matters when using a connect-based server
  })
  // Provide a callback function to have custom code executed when the server starts
  .onStart(...)
  // Provide a callback function to have custom code executed when the server stops
  .onStop(...);

server.start();
```

Treehouse can also be extended to provide more complex implementations:

```
import Server from 'treehouse';

class MyServer extends Server {

  constructor() {
    super(config);
  }

  initialize() {
    // Override initialize to either override the default middleware or to have
    // more flexibility in attaching middleware you want to use.
    // If you wish to keep the default middleware in addition to the ones you
    // add, don't forget to call `super.initialize();`!
  }

  start() {
    // Override start to change the startup behavior.
    // Use `super.start();` if you want to augment start before or after the
    // server starts up
  }

  stop() {
    // Override stop to change the startup behavior.
    // Use `super.stop();` if you want to augment stop before or after the
    // server stops accepting connections
  }
}
```

The `GraphQL Server` can also be overridden this way. The only difference is that the constructor must be provided the `schema` object.

### Logging

### Configuration

It is highly recommended that you use [node-config](https://github.com/lorenwest/node-config/wiki) as your configuration library and to pass the resulting configuration object to Treehouse.
The following an example configuration showing all the available options:

```
{
  bodyparser: { ... }, // configuration for koa-bodyparser
  cors: { ... }, // configuration for koa-cors
  compress: {},  // configuration for koa-compress
  // The following configuration option is only needed if you're using the GraphQL Server
  graphql: {
    gui: process.env.NODE_ENV === 'development',
    introspection: true,
    url: "/graphql",
  },
  // Treehouse logger configuration
  // Optional
  loggers: {
    handlers: {
      access: {
        name: 'access',
        level: 'info',
      },
    },
    streams: {
      // Under construction
    },
  },
  server: {
    hostname: '0.0.0.0',
    port: 3000,
    secure: false,
    ssl: {
      key: '<file path>',
      cert: '<file path>'
    },
  },
}
```

## Building

We use `Make` to run various build tasks. See `Makefile` for details on the build process.

To build a deployment (production) `dist`, run `make`.

To build development `dist`, run `make dev`.

## Contributing

Ensure that you are pushing to a branch off of `master` and not to `master` directly.
Please follow standard git flow practices for merging branches with a PR.

The `dist` bundle is created using [webpack](https://webpack.js.org/) (located under the `build/` directory). To build in the `production` mode, ensure that the `NODE_ENV` environment variable is set to `production`.

Distribution is currently hosted through Github, so the binary is currently tracked.
To build and "deploy", run `make` at the root project directory and commit the resulting `dist` bundle.

### TODOs

* [ ] Complete tests (tested manually, but need full suite)
* [ ] Finish setting up travis for complete testing, build, and deploy
* [ ] Support custom streams for bunyan in log configuration
* [x] Apollo Server V2
* [ ] Migrate to Typescript
* [x] Improve Server interface around stop, start, middleware, & routers
* [ ] Update documentation with updates interfaces

## Testing

Under construction.

All testing is done using [jest]().

To run tests, use `npm test`. You can provide additional arguments to `Mocha` by running `npm test -- <opts>`.
