import { z } from "zod";

export const createOrderRequestSchema = z.object({
  phoneNumber: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  rateId: z.string(),
});

export const createOrderResponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string(),
  data: z.object({
    orderId: z.number(),
    clientSecret: z.string(),
  }),
});

export const orderItemSchema = z.object({
  id: z.number(),
  productId: z.number(),
  productName: z.string().nullable(),
  productImage: z.string().nullable(),
  quantity: z.number(),
  unitPrice: z.number(),
  totalPrice: z.number(),
  userName: z.string().nullable(),
  isReviewed: z.boolean(),
});

export const orderSchema = z.object({
  id: z.number(),
  subTotal: z.number(),
  deliveryFee: z.number(),
  totalPrice: z.number(),
  status: z.enum([
    "Pending",
    "Confirmed",
    "Processing",
    "Shipped",
    "Delivered",
    "Paid",
    "Cancelled",
    "Refunded",
  ]),
  deliveryStatus: z.enum([
    "Pending",
    "PickedUp",
    "InTransit",
    "OutForDelivery",
    "Delivered",
    "Failed",
    "Returned",
    "LabelGenerated",
  ]),
  trackingNumber: z.string().nullable(),
  createdAt: z.string(),
  paymentIntentId: z.string().nullable(),
  clientSecret: z.string().nullable(),
  items: z.array(orderItemSchema).nullable(),
});

export type createOrderT = z.infer<typeof createOrderRequestSchema>;
export type createOrderSuccessT = z.infer<typeof createOrderResponseSchema>;
export type orderT = z.infer<typeof orderSchema>;
