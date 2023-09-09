import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

//Task remaining
// 1. Do not send password
// 2. Send jwt

const signup = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const userData: User = req.body;
  //accessToken, refreshToken,

  const result = await AuthService.signup(userData);

  // res.cookie('refreshToken', refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const userData: User = req.body;

  const token = await AuthService.login(userData);

  const response = {
    success: true,
    statusCode: 200,
    message: 'User signin successfully!',
    token: token,
  };

  res.status(200).json(response);
});

export const AuthController = {
  signup,
  login,
};
