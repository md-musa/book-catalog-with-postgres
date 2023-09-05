import { Order } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
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

// const getSpecificCustomerOrder = catchAsync(async (req: Request, res: Response) => {
// //   const userId = req.user.i
//   const orders = await OrderService.getAllOrders();

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'All orders retrieve successfully',
//     data: orders,
//   });
// });

export const OrderController = {
  createOrder,
  getAllOrders,
};
