import { User as IUser, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';

const prisma = new PrismaClient();

const signup = async (userData: IUser): Promise<IUser> => {
  console.log(userData);
  const { email, password } = userData;

  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) throw new ApiError(httpStatus.CONFLICT, 'User already exits');

  userData.password = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  user = await prisma.user.create({
    data: userData,
  });

  return user;
};

const login = async (userData: IUser): Promise<IUser> => {
  console.log(userData);
  const { email, password } = userData;

  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Invalid email');

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid password');

  return user;
};

export const AuthService = {
  signup,
  login,
};
