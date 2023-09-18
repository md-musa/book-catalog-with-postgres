import { z } from 'zod';

const create = z.object({
  body: z
    .object({
      title: z
        .string({
          required_error: 'Title is required',
        })
        .nonempty(),
    })
    .strict(),
});

const update = z.object({
  body: z
    .object({
      title: z
        .string({
          required_error: 'Title is required',
        })
        .nonempty(),
    })
    .strict(),
});

export const CategoryValidation = {
  create,
  update,
};
