import Router from 'koa-router';

import { health } from 'axonSrc/api/controllers/health';
import { notFound } from 'axonSrc/api/controllers/404';

const router = new Router();

router.get('/heath', health);
router.all('*', notFound);

export default router;
