import { z } from "zod";

export const shippingRateScehma = z.object({
  rateId: z.string().nullable(),
  provider: z.string().nullable(),
  amount: z.number().nullable(),
  currency: z.string().nullable(),
  durationTerms: z.string().nullable(),
  imageUrl: z.string().nullable(),
});

export const getShippingRateSuccessSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string(),
  data: z.array(shippingRateScehma),
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

export const shippingInfoSchema = z.object({
  phoneNumber: z.string().nullable(),
  street: z.string().nullable(),
  city: z.string().nullable(),
  zipCode: z.string().nullable(),
  country: z.string().nullable(),
  shippoShipmentId: z.string().nullable(),
  trackingNumber: z.string().nullable(),
  labelUrl: z.string().nullable(),
  shippingCost: z.number(),
  deliveredAt: z.string(),
  status: z.enum([
    "Pending",
    "PickedUp",
    "InTransit",
    "OutForDelivery",
    "Delivered",
    "Failed",
    "Returned",
    "LabelGenerated",
  ]),
});

export const shippoTrackingSchema = z.object({
  object_status: z.string().nullable(),
});
