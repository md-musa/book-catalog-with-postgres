import { Order, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createOrder = async (data: Order): Promise<Order> => {
  const order = await prisma.order.create({
    data: data,
  });

  return order;
};

const getAllOrders = async (): Promise<Order[]> => {
  const orders = await prisma.order.findMany();

  return orders;
};

const getSpecificCustomerOrder = async (userId: string): Promise<Order[]> => {
  const singleCustomerOrders = await prisma.order.findMany({
    where: { userId },
  });

  return singleCustomerOrders;
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSpecificCustomerOrder,
};
