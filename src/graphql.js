import { ApolloServer } from 'apollo-server-koa';

import Server from 'treehouse/server';

/**
 * [config description]
 * @type {[type]}
 */
export default class GraphqQLServer extends Server {
  graphql: Object;

  /**
   * [constructor description]
   * @param {[type]} config    [description]
   * @param {[type]} schema    [description]
   * @param {[type]} appRouter [description]
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
   * [initialize description]
   * @return {[type]} [description]
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
