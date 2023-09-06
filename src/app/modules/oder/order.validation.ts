import { z } from 'zod';

const create = z.object({
  body: z
    .object({
      userId: z.string(),
      orderedBooks: z.array(
        z.object({
          bookId: z.string(),
          quantity: z.number().int().positive(),
        })
      ),
    })
    .strict(),
});

export const OrderValidation = {
  create,
};
