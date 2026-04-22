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

export const createCategoryRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  imageUrl: z.instanceof(File).optional(),
});

export const createCategoryResponse = z.object({
  isSuccess: z.boolean(),
  message: z.string().nullable(),
  data: z.array(z.any()),
});

export type categoryT = z.infer<typeof categorySchema>;
export type categoriesResponseT = z.infer<typeof categoriesResponseSchema>;
export type createCategoryRequestT = z.infer<
  typeof createCategoryRequestSchema
>;
