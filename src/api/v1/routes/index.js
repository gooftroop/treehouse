/**
 * V1 Router.
 * Defines the health check route.
 * @module api/v1/routes
 * @exports V1 Router
 */

import Router from 'koa-router';

import health from 'treehouse/api/v1/handlers/health';

const router = new Router();

router.get('/health', health);

export default router;
