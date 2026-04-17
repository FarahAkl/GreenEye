import { z } from "zod";

export const walletSchema = z.object({
  supplierId: z.string(),
  balance: z.number(),
  lastUpdatedAt: z.string(),
});

export const walletsResponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string(),
  data: z.array(walletSchema),
});

export const supplierWalletsResponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string(),
  data: z.object({
    balance: z.number(),
    lastUpdatedAt: z.string(),
  }),
});

export const transactionSchema = z.object({
  amount: z.number(),
  description: z.string(),
  type: z.string(),
  orderId: z.number(),
  createdAt: z.string(),
});

export const transactionResponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string(),
  data: z.array(transactionSchema),
});

export const withdrawalSchema = z.object({
  amount: z.number(),
  bankAccount: z.string(),
});
