import { Prisma } from '@prisma/client';
import { IGenericErrorResponse } from '../interfaces/common';

const handleValidationError = (
  error: Prisma.PrismaClientValidationError
): IGenericErrorResponse => {
  const errors = [
    {
      path: '',
      message: error.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    errorMessages: errors,
    message: 'Validation Error',
  };
};

export default handleValidationError;
