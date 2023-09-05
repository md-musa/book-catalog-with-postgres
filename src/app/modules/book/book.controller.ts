import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BookService } from './book.service';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const bookData = req.body;

  const book = await BookService.createBook(bookData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book has been created successfully',
    data: book,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const book = await BookService.getSingleBook(id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book retrieve successfully',
    data: book,
  });
});

const getBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['search', 'minPrice', 'maxPrice', 'category']);
  const options = pick(req.query, ['page', 'size', 'sortBy', 'sortOrder']);

  const result = await BookService.getBooks(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieve successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const options = pick(req.query, ['page', 'size', 'sortBy', 'sortOrder']);

  const result = await BookService.getBooksByCategoryId(id, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieve successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookData = req.body;

  const updatedBook = await BookService.updateBook(id, bookData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book updated successfully',
    data: updatedBook,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedBook = await BookService.deleteBook(id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book has been deleted successfully',
    data: deletedBook,
  });
});

export const BookController = {
  createBook,
  getSingleBook,
  updateBook,
  deleteBook,
  getBooksByCategoryId,
  getBooks,
};
