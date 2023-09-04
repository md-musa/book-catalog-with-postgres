import { User as IUser, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

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
    Number(config.BCRYPT_SALT_ROUNDS)
  );

  user = await prisma.user.create({
    data: userData,
  });

  const accessToken = jwtHelpers.createToken(
    {
      role: user.role,
      email: user.email,
      name: user.name,
    },
    config.JWT.ACCESS_TOKEN_SECRET as Secret,
    config.JWT.ACCESS_TOKEN_EXPIRES_IN as string
  );

  return { accessToken, user };
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

  const accessToken = jwtHelpers.createToken(
    {
      role: user.role,
      email: user.email,
      name: user.name,
    },
    config.JWT.ACCESS_TOKEN_SECRET as Secret,
    config.JWT.ACCESS_TOKEN_EXPIRES_IN as string
  );

  return { accessToken, user };
};

export const AuthService = {
  signup,
  login,
};
