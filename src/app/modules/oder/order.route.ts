import express from 'express';
import { USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.get('/', auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER), OrderController.getAllOrders);
router.get('/:orderId', auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER), OrderController.getSingleOrderById);
router.post('/create-order', auth(USER_ROLE.CUSTOMER), validateRequest(OrderValidation.create), OrderController.createOrder);

export const OrderRoute = router;
