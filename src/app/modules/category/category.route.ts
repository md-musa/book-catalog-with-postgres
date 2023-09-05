import express from 'express';
import { USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CategoryController } from './category.controller';

const router = express.Router();

router.get('/', CategoryController.getAllCategory);
router.get('/:id', CategoryController.getSingleCategory);
router.patch('/:id', auth(USER_ROLE.ADMIN), CategoryController.updateCategory);
router.delete('/:id', auth(USER_ROLE.ADMIN), CategoryController.deleteCategory);
router.post('/create-category', auth(USER_ROLE.ADMIN), CategoryController.createCategory);

export const CategoryRoute = router;
