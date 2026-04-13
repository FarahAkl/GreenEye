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

export type createOrderT = z.infer<typeof createOrderRequestSchema>;
