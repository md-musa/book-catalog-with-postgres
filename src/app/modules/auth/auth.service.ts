import { User as IUser, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

const signup = async (payload: IUser): Promise<{ accessToken: Secret; user: User }> => {
  const { email, password } = payload;

  let user = await prisma.user.findUnique({ where: { email } });
  if (user) throw new ApiError(httpStatus.CONFLICT, 'User already exits');

  payload.password = await bcrypt.hash(password, Number(config.BCRYPT_SALT_ROUNDS));
  user = await prisma.user.create({
    data: payload,
  });

  const accessToken = jwtHelpers.createToken(
    {
      userId: user.id,
      role: user.role,
    },
    config.JWT.ACCESS_TOKEN_SECRET as Secret,
    config.JWT.ACCESS_TOKEN_EXPIRES_IN as string
  );

  return { accessToken, user };
};

const login = async (userData: IUser): Promise<{ accessToken: Secret; user: User }> => {
  console.log(userData);
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
