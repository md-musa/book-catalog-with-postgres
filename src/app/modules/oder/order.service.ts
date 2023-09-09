import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createOrder = async (data: Order): Promise<Order> => {
  const order = await prisma.order.create({ data });

  return order;
};

const getAllOrders = async (): Promise<Order[]> => {
  const orders = await prisma.order.findMany();

  return orders;
};

const getSpecificCustomerOrder = async (orderId: string): Promise<Order | null> => {
  const order = await prisma.order.findFirst({
    where: { id: orderId },
  });

  return order;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSpecificCustomerOrder,
};
