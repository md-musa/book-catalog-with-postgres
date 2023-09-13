import { Order } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const data: Order = req.body;
  const { userId } = req.user as JwtPayload;
  const result = await OrderService.createOrder(userId, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getSingleOrderById = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const order = await OrderService.getSingleOrderById(orderId);

  const { role, userId } = req.user as JwtPayload;
  if (role === USER_ROLE.CUSTOMER && order?.userId != userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order fetched successfully',
    data: order,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  let orders;

  if (user.role === USER_ROLE.ADMIN) {
    orders = await OrderService.getAllOrders();
  } else {
    orders = await OrderService.getSpecificCustomerOrder(user.userId);
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Customer orders retrieve successfully',
    data: orders,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrderById,
};
