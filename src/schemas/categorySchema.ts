import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  productCount: z.number(),
});

export const categoriesResponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string().nullable(),
  data: z.array(categorySchema),
});

export type categoryT = z.infer<typeof categorySchema>;
export type categoriesResponseT = z.infer<typeof categoriesResponseSchema>;
