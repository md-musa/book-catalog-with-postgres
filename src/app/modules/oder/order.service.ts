import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createOrder = async (payload: Order): Promise<Order> => {
  const order = await prisma.order.create({ data: payload });

  return order;
};

const getAllOrders = async (): Promise<Order[]> => {
  const orders = await prisma.order.findMany();

  return orders;
};

const getSpecificCustomerOrder = async (userId: string): Promise<Order[]> => {
  const orders = await prisma.order.findMany({
    where: { userId },
  });

  return orders;
};

const getSingleOrderById = async (id: string): Promise<Order | null> => {
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  return order;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSpecificCustomerOrder,
  getSingleOrderById,
};
