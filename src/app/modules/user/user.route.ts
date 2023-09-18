import express from 'express';
import { USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/', auth(USER_ROLE.ADMIN), UserController.getAllUsers);
router.get('/:id', auth(USER_ROLE.ADMIN), UserController.getSingleUser);
router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN),
  validateRequest(UserValidation.update),
  UserController.updateUser
);
router.delete('/:id', auth(USER_ROLE.ADMIN), UserController.deleteUser);

export const UserRoute = router;
