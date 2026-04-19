import { z } from "zod";

export const productsSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stockQuantity: z.number(),
  productionDate: z.string().nullable(),
  expiryDate: z.string(),
  primaryImageUrl: z.string(),
  isAvailable: z.boolean(),
  categoryId: z.number(),
  categoryName: z.string(),
  userId: z.string(),
  userName: z.string().nullable(),
  averageRating: z.number(),
  reviewCount: z.number(),
  additionalImages: z.array(z.string()),
});

export const productsPaginationSchema = z.object({
  data: z.array(productsSchema),
  totalCount: z.number(),
  pageNumber: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

export const productsResponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string().nullable(),
  data: productsPaginationSchema,
});

export const createProductResponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string().nullable(),
  data: z.array(z.any()),
});

export type productsT = z.infer<typeof productsSchema>;
export type productsResponseT = z.infer<typeof productsResponseSchema>;
