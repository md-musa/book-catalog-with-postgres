import express from 'express';
import { USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.post('/create-order', validateRequest(OrderValidation.create), OrderController.createOrder);
router.get('/', auth(USER_ROLE.ADMIN), OrderController.getAllOrders);
router.get('/:orderId', auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER), OrderController.getSpecificCustomerOrder);

export const OrderRoute = router;
