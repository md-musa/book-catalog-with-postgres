import { Order } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const data: Order = req.body;
  const order = await OrderService.createOrder(data);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order placed successfully',
    data: order,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await OrderService.getAllOrders();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All orders retrieve successfully',
    data: orders,
  });
});

const getSpecificCustomerOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const user = req.user;
  const order = await OrderService.getSpecificCustomerOrder(orderId);

  if (user.role === USER_ROLE.ADMIN || user.userId == order.userId) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Customer orders retrieve successfully',
      data: order,
    });
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are no authorized');
  }
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSpecificCustomerOrder,
};
