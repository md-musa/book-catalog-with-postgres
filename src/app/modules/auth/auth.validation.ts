import { z } from 'zod';

const create = z.object({
  body: z
    .object({
      name: z.string({
        required_error: 'Name is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      password: z.string({
        required_error: 'Password is required',
      }),
      role: z.enum(['customer', 'admin']).default('customer'),
      contactNo: z.string({
        required_error: 'contact number is required',
      }),
      address: z.string({
        required_error: 'address is required',
      }),
      profileImg: z.string(),
    })
    .strict(),
});

export const AuthValidation = {
  create,
};
