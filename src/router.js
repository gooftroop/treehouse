import Router from 'koa-router';

import notFound from 'axon/api/v1/handlers/404';
import v1 from 'axon/api/v1/routes';

const router = new Router();

export default (appRouter: ?Object) => {
  router.use(v1.routes(), v1.allowedMethods());
  router.use(appRouter.routes(), appRouter.allowedMethods());
  router.all('*', notFound);

  return router;
};
