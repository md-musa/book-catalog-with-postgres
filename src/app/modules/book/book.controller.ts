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
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: book,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const book = await BookService.getSingleBook(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    data: book,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['search', 'minPrice', 'maxPrice', 'category']);
  const options = pick(req.query, ['page', 'size', 'sortBy', 'sortOrder']);

  const result = await BookService.getAllBooks(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getAllBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const options = pick(req.query, ['page', 'size', 'sortBy', 'sortOrder']);

  const result = await BookService.getAllBooksByCategoryId(categoryId, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books with associated category data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const updateSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookData = req.body;

  const updatedBook = await BookService.updateSingleBook(id, bookData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: updatedBook,
  });
});

const deleteSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedBook = await BookService.deleteSingleBook(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book has been deleted successfully',
    data: deletedBook,
  });
});

export const BookController = {
  createBook,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
  getAllBooksByCategoryId,
  getAllBooks,
};
