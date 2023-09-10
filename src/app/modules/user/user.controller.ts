import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getAllUsers = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const users = await UserService.getAllUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const user = await UserService.getSingleUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User getched successfully',
    data: user,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const data = req.body;
  const updatedUserData = await UserService.updateUser(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: updatedUserData,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const deletedUser = await UserService.deleteUser(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: deletedUser,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.user as JwtPayload;

  const user = await UserService.getProfile(userId);

  if (userId != user?.id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched successfully',
    data: user,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile fetched successful',
    data: user,
  });
});

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getProfile,
};
