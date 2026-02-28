import { z } from "zod";

export const itemSchema = z.object({
  id: z.number(),
  productId: z.number(),
  productName: z.string(),
  productImage: z.string(),
  unitPrice: z.number(),
  quantity: z.number(),
  totalPrice: z.number(),
  availableStock: z.number(),
});

export const cartResponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string().nullable(),
  data: z.object({
    id: z.number(),
    items: z.array(itemSchema),
    totalPrice: z.number(),
    totalItems: z.number(),
  }),
});

export const deleteCartSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string().nullable(),
  data: z.object().nullable(),
});

export const addItemToCartSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
});

export const updateItemInCartSchema = z.object({
  quantity: z.number(),
});

export type itemT = z.infer<typeof itemSchema>;
export type cartResponseT = z.infer<typeof cartResponseSchema>;
export type deleteCartT = z.infer<typeof deleteCartSchema>;
export type addItemToCartT = z.infer<typeof addItemToCartSchema>;
export type updateItemInCartT = z.infer<typeof updateItemInCartSchema>