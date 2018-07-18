import { ApolloServer } from 'apollo-server-koa';

import Server from 'treehouse/server';

/**
 * Extends <code>Server</code> and integrates an <code>ApolloServer</code>
 * (a GraphQL handler) into the server.
 * Accepts the standard input that <code>Server</code> does, as well as an
 * additional <code>schema</code> parameter, which is used to populate
 * <code>ApolloServer</code>.
 *
 * <code>ApolloServer</code> integrates itself into the server by adding an
 * additional <code>router</code> to the <code>Koa</code> app. This
 * <code>router</code> handles requests to <code>config.graphql.url</code>.
 *
 * @class
 * @extends Server
 * @see {@link Server}
 * @see {@link https://www.apollographql.com/docs/apollo-server/v2/whats-new.html|ApolloServer}
 */
export default class GraphqQLServer extends Server {
  graphql: Object;

  /**
   * Instantiates the base <code>Server</code> and intializes the GraphQL
   * Server capabilities.
   *
   * <code>schema</code> should be the resulting object from combining your
   * <code>typedefs</code> and your <code>resolvers</code> using something like
   * <code>makeExecutableSchema</code> from <code>graphql-tools</code> or
   * <code>apollo-server-koa</code>.
   *
   * @constructor
   * @param {Object} config     The application configuration object
   * @param {Object} schema     The graphql schema object
   */
  constructor(config: Object, schema: Object) {
    super(config);

    this.initializeGraphQl(this.app, schema, config);
  }

  /**
   * Initializes <code>ApolloServer</code> with the provided
   * <code>schema</code>, then applies the
   * <code>ApolloServer</code> router and handlers to the server application.
   *
   * @param {Object} config     The application configuration object
   * @param {Object} schema     The graphql schema object
   * @return {void}
   */
  initializeGraphQl(app, schema, config) {
    this.graphql = new ApolloServer({
      schema,
      introspection: config.graphql.introspection,
    });

    // Attach the graphql router to the app
    this.graphql.applyMiddleware({
      app,
      gui: config.graphql.gui,
      path: config.graphql.url,
    });
  }
}
