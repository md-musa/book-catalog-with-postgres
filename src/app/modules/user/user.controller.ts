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

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  const { password, ...otherInfo } = user;

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

  if (!updatedUserData) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  const { password, ...otherInfo } = updatedUserData;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: otherInfo,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const deletedUser = await UserService.deleteUser(id);

  if (!deletedUser) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  const { password, ...otherInfo } = deletedUser;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: otherInfo,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.user as JwtPayload;

  const user = await UserService.getProfile(userId);

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  if (userId != user?.id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const { password, ...otherInfo } = user;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile fetched successful',
    data: otherInfo,
  });
});

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getProfile,
};
