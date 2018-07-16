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
   * Provides the required parameters to <code>Server</code> and creates the
   * <code>ApolloServer</code> instance from the <code>schema</code> parameter.
   *
   * <code>schema</code> should eb the resulting object from combining your
   * <code>typedefs</code> and your <code>resolvers</code> using something like
   * <code>makeExecutableSchema</code> from <code>graphql-tools</code> or
   * <code>apollo-server-koa</code>.
   * @constructor
   * @param {Object} config     The application configuration object
   * @param {Object} schema     The graphql schema object
   * @param {Object} appRouter  (optional) Application-specific router
   */
  constructor(config: Object, schema: Object, appRouter: ?Object = null) {
    const graphql = new ApolloServer({
      schema,
      introspection: config.graphql.introspection,
    });

    super(config, appRouter);

    this.graphql = graphql;
  }

  /**
   * Initializes the <code>Server</code> middleware
   * (via <code>super.initialize</code>), then applies the
   * <code>ApolloServer</code> router and handlers to the server application.
   * @return {void}
   */
  initialize() {
    super.initialize();

    // Create the graphql router and attach it to app
    this.graphql.applyMiddleware({
      app: this.app,
      gui: this.config.graphql.gui,
      path: this.config.graphql.url,
    });
  }
}
