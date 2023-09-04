import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoute } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
