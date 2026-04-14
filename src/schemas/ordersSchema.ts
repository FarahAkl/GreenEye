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

export const getShippingRateRequestSchema = z.object({
  name: z.string(),
  street1: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
  phone: z.string(),
  email: z.string(),
});

export const shippingScehma = z.object({
  rateId: z.string(),
  provider: z.string(),
  amount: z.number(),
  currency: z.string(),
  durationTerms: z.string(),
  imageUrl: z.string(),
});

export const getShippingRateSuccessSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string(),
  data: z.array(shippingScehma),
});

export type createOrderT = z.infer<typeof createOrderRequestSchema>;
