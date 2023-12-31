import { z } from 'zod';

const create = z.object({
  body: z
    .object({
      orderedBooks: z.array(
        z.object({
          bookId: z.string().nonempty(),
          quantity: z.number().int().positive(),
        })
      ),
    })
    .strict(),
});

export const OrderValidation = {
  create,
};
