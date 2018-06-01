import Router from 'koa-router';

// import notFound from 'axon/api/v1/handlers/404';
import v1 from 'axon/api/v1/routes';

const router = new Router();

router.use('/', v1.routes(), v1.allowedMethods());

export default router;
