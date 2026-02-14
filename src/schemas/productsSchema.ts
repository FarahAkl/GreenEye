import { z } from "zod";

export const productsSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stockQuantity: z.number(),
  productionDate: z.string(),
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

export const productsResponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string().nullable(),
  data: z.array(productsSchema),
});

export const updateProductsRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stockQuantity: z.number(),
  imageFile: z.string(),
  productionDate: z.string(),
  expiryDate: z.string(),
  isAvailable: z.boolean(),
});

export const createProductsRequestSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  CategoryId: z.number(),
  Price: z.number(),
  StockQuantity: z.number(),
  ProductionDate: z.string().optional(),
  ExpiryDate: z.string().optional(),
  ImageFile: z.string().optional(),
});

export const createProductResponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string().nullable(),
  data: z.array(z.any()),
});

export type productsT = z.infer<typeof productsSchema>;
export type productsResponseT = z.infer<typeof productsResponseSchema>;
export type updateProductT = z.infer<typeof updateProductsRequestSchema>;
export type createProductT = z.infer<typeof createProductsRequestSchema>;
