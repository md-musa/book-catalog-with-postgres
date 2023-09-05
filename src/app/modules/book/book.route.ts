import express from 'express';
import { USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookController } from './book.controller';

const router = express.Router();

router.get('/', BookController.getBooks);
router.get('/:categoryId', BookController.getBooksByCategoryId);
router.get('/:id', BookController.getSingleBook);
router.patch('/:id', auth(USER_ROLE.ADMIN), BookController.updateBook);
router.delete('/:id', auth(USER_ROLE.ADMIN), BookController.deleteBook);
router.post('/create-book', auth(USER_ROLE.ADMIN), BookController.createBook);

export const BookRoute = router;
