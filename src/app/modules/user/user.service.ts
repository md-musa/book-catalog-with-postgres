import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

const getAllUsers = async (): Promise<Partial<User>[]> => {
  const users = await prisma.user.findMany({});

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

const updateUser = async (id: string, data: User): Promise<User | null> => {
  const updatableData: Partial<User> = {};

  Object.keys(data).forEach((key: string) => {
    if (data[key].length) updatableData[key] = data[key];
  });

  const updatedUserData = await prisma.user.update({
    where: {
      id,
    },
    data: updatableData,
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

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
