import Router from 'koa-router';

import health from 'axon/api/v1/handlers/health';

const router = new Router();

router.get('/health', health);

export default router;
