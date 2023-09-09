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
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const userData: User = req.body;

  const result = await AuthService.login(userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

export const AuthController = {
  signup,
  login,
};
