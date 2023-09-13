import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllUsers = async (): Promise<Omit<User, 'password'>[]> => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return users;
};

const getSingleUser = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

const updateUser = async (id: string, payload: Partial<User>): Promise<User | null> => {
  const updatedUserData = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedUserData;
};

const deleteUser = async (id: string): Promise<User> => {
  const deletedUser = await prisma.user.delete({
    where: {
      id,
    },
  });

  return deletedUser;
};

const getProfile = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getProfile,
};
