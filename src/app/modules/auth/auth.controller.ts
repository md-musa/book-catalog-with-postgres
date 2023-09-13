import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

const signup = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const userData: User = req.body;

  const { password, ...otherInfo } = await AuthService.signup(userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: otherInfo,
  });
});

const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const userData: User = req.body;

  const token = await AuthService.login(userData);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User signin successfully!',
    token: token,
  });
});

export const AuthController = {
  signup,
  login,
};
