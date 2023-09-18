import { z } from 'zod';

const create = z.object({
  body: z
    .object({
      title: z
        .string({
          required_error: 'title is required',
        })
        .nonempty(),
      author: z
        .string({
          required_error: 'author is required',
        })
        .nonempty(),
      genre: z
        .string({
          required_error: 'genre is required',
        })
        .nonempty(),
      price: z
        .number({
          required_error: 'price is required',
        })
        .nonnegative(),
      publicationDate: z
        .string({
          required_error: 'publication date is required',
        })
        .nonempty(),
      categoryId: z
        .string({
          required_error: 'categoryId is required',
        })
        .nonempty(),
    })
    .strict(),
});
const update = z.object({
  body: z
    .object({
      title: z.string().nonempty().optional(),
      author: z.string().nonempty().optional(),
      genre: z.string().nonempty().optional(),
      price: z.number().nonnegative().optional(),
      publicationDate: z.string().optional(),
    })
    .strict(),
});

export const BookValidation = {
  create,
  update,
};
