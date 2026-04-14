import { z } from "zod";

export const createReviewSchema = z.object({
  orderId: z.number(),
  orderItemId: z.number(),
  productRating: z.number(),
  comment: z.string(),
});

export type reviewT = z.infer<typeof createReviewSchema>;
