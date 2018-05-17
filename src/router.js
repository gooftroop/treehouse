import Router from 'koa-router';

import health from 'axon/api/handlers/health';
import notFound from 'axon/api/handlers/404';

const router = new Router();

export default (appRouter: ?Object) => {
  router.get('/heath', health);

  if (appRouter) {
    router.use('/', appRouter.routes(), appRouter.allowedMethods());
  }

  router.all('*', notFound);

  return router;
};
