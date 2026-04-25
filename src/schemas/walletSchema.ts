import { z } from "zod";

export const walletSchema = z.object({
  walletId: z.string().nullable().optional(),
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
  orderId: z.number().nullable().optional(),
  createdAt: z.string(),
});

export const transactionResponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string(),
  data: z.array(transactionSchema),
});

export const withdrawalRequestSchema = z.object({
  amount: z.number(),
  bankAccount: z.string(),
});

export type withdrawalRequestT = z.infer<typeof withdrawalRequestSchema>
export type walletT = z.infer<typeof walletSchema>;
export type walletsResponseT = z.infer<typeof walletsResponseSchema>;
export type transactionT = z.infer<typeof transactionSchema>;
export type transactionsResponseT = z.infer<typeof transactionResponseSchema>;
