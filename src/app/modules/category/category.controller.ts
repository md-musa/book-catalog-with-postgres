import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { title } = req.body;
  const category = await CategoryService.createCategory(title);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully',
    data: category,
  });
});

const getAllCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const categories = await CategoryService.getAllCategory();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories fetched successfully',
    data: categories,
  });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const category = await CategoryService.getSingleCategory(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieve successfully',
    data: category,
  });
});

const updateCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title } = req.body;
  const updatedCategory = await CategoryService.updateCategory(id, title);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: updatedCategory,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const updatedCategory = await CategoryService.deleteCategory(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully',
    data: updatedCategory,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
