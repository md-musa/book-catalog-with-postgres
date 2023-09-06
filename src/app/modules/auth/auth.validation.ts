import { z } from 'zod';

const create = z.object({
  body: z
    .object({
      name: z.string({
        required_error: 'Name is required',
      }),
      email: z.string({
        required_error: 'Email is required',
      }),
      password: z.string({
        required_error: 'Password is required',
      }),
      role: z.enum(['CUSTOMER', 'ADMIN']).optional(),
      contactNo: z.string({
        required_error: 'contact number is required',
      }),
      address: z.string({
        required_error: 'address is required',
      }),
      profileImg: z.string().optional(),
    })
    .strict(),
});

export const AuthValidation = {
  create,
};
