import express from 'express';
import { USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { BookValidation } from './book.validation';

const router = express.Router();

router.get('/', BookController.getAllBooks);
router.get('/:categoryId/category', BookController.getAllBooksByCategoryId);
router.get('/:id', BookController.getSingleBook);
router.patch('/:id', auth(USER_ROLE.ADMIN), validateRequest(BookValidation.update), BookController.updateSingleBook);
router.delete('/:id', auth(USER_ROLE.ADMIN), BookController.deleteSingleBook);
router.post('/create-book', auth(USER_ROLE.ADMIN), validateRequest(BookValidation.create), BookController.createBook);

export const BookRoute = router;
