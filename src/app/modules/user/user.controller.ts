import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getAllUsers = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const users = await UserService.getAllUsers();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieve successfully',
      data: users,
    });
  }
);

const getSingleUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const user = await UserService.getSingleUser(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrieve successfully',
      data: user,
    });
  }
);

const updateUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const data = req.body;
    const updatedUserData = await UserService.updateUser(id, data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully',
      data: updatedUserData,
    });
  }
);

const deleteUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deletedUser = await UserService.deleteUser(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully',
      data: deletedUser,
    });
  }
);

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
