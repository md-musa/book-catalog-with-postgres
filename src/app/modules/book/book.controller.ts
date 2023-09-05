import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
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

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookData = req.body;

  const updatedBook = await BookService.updateBook(id, bookData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book retrieve successfully',
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
};
