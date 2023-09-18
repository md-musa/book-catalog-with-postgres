import express from 'express';
import { USER_ROLE } from '../../enums/user';
import auth from '../middlewares/auth';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoute } from '../modules/book/book.route';
import { CategoryRoute } from '../modules/category/category.route';
import { OrderRoute } from '../modules/oder/order.route';
import { UserController } from '../modules/user/user.controller';
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
  {
    path: '/categories',
    route: CategoryRoute,
  },
  {
    path: '/books',
    route: BookRoute,
  },
  {
    path: '/orders',
    route: OrderRoute,
  },
  {
    path: '/profile',
    route: express
      .Router()
      .use(auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER), UserController.getProfile),
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
