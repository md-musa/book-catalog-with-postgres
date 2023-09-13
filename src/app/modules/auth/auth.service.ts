import { User as IUser } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

const signup = async (payload: IUser): Promise<IUser> => {
  const { email, password } = payload;

  let user = await prisma.user.findUnique({
    where: { email },
  });
  if (user) throw new ApiError(httpStatus.CONFLICT, 'User already exits');

  payload.password = await bcrypt.hash(password, Number(config.BCRYPT_SALT_ROUNDS));
  user = await prisma.user.create({
    data: payload,
  });

  return user;
};

const login = async (userData: IUser): Promise<string> => {
  const { email, password } = userData;

  let user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'Invalid email');

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid password');

  const accessToken = jwtHelpers.createToken(
    {
      userId: user.id,
      role: user.role,
    },
    config.JWT.ACCESS_TOKEN_SECRET as Secret,
    config.JWT.ACCESS_TOKEN_EXPIRES_IN as string
  );

  // user = await prisma.user.findUnique({
  //   where: {
  //     email,
  //   },
  //   select: {
  //     id: true,
  //     name: true,
  //     email: true,
  //     role: true,
  //     contactNo: true,
  //     address: true,
  //     profileImg: true,
  //   },
  // });

  return accessToken;
};

export const AuthService = {
  signup,
  login,
};
