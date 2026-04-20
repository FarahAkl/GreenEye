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

export const createProductItemSchema = z.object({
  name: z.string().min(1, "Name is required"),

  description: z.string(),

  categoryId: z.number().min(1),

  price: z.number().min(1, "Price must be greater than 0"),

  stockQuantity: z.number().min(1, "Stock quantity must be greater than 0"),

  expiryDate: z.string(),

  imageFiles: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required"),
});

export const createProductsSchema = z.object({
  products: z.array(productSchema).min(1),
});

export const updateProductSchema = z.object({
  name: z.string().nullable(),
  description: z.string().nullable(),
  price: z.number(),
  stockQuantity: z.number(),
  expiryDate: z.string().nullable(),
  imageFile: z.instanceof(FileList),
});

export type createProductT = z.infer<typeof createProductsSchema>;
export type updateProductT = z.infer<typeof updateProductSchema>