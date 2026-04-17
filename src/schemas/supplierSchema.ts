import { z } from "zod";

export const supplierProductSchema = z.object({
  productId: z.number(),
  price: z.number(),
  name: z.string(),
  quantity: z.number(),
  imageURL: z.string(),
  supplierId: z.string(),
  supplierLogo: z.string(),
  supplierName: z.string(),
  images: z.array(z.string()),
});

export const supplierProductResoponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string(),
  data: z.array(supplierProductSchema),
});

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  categoryId: z.number(),
  price: z.number(),
  stockQuantity: z.number(),
  expiryDate: z.string(),
  imageFiles: z.array(z.any()),
});

export const updateProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stockQuantity: z.number(),
  expiryDate: z.string(),
  imageFile: z.string(),
});