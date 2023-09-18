import { z } from 'zod';

const update = z.object({
  body: z
    .object({
      name: z.string().nonempty().optional(),
      email: z.string().nonempty().email().optional(),
      contactNo: z.string().nonempty().optional(),
      address: z.string().nonempty().optional(),
      profileImg: z.string().nonempty().optional(),
    })
    .strict(),
});

export const UserValidation = {
  update,
};
