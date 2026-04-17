import { z } from "zod";

export const pendingUserSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
  logoUrl: z.string(),
  name: z.string(),
  email: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  createdAt: z.string(),
  role: z.string(),
});

export const pendingUsersResponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string(),
  data: z.array(pendingUserSchema),
});

export const rejectedReasonSchema = z.object({
  rejectedReason: z.string(),
});

export const pendingWithdrawalRequestSchema = z.object({
  id: z.string(),
  status: z.string(),
  amount: z.number(),
  bankAccount: z.string(),
  createdAt: z.string(),
  walletId: z.string(),
});

export const withdrawalApproveRequestSchema = z.object({
  bankTransferNumber: z.string(),
});

export const pendingProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  quantity: z.number(),
  expiryDate: z.string(),
  productImages: z.array(z.string()),
  categoryName: z.string(),
  userName: z.string(),
  userId: z.string(),
});

export const pendingProductsResponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string(),
  data: z.array(pendingProductSchema),
});

export const rejectProductReasonSchema = z.object({
  reason: z.string(),
});

export type rejectT = z.infer<typeof rejectedReasonSchema>;
export type withdrawalApproveT = z.infer<typeof withdrawalApproveRequestSchema>;
export type rejectProductT  = z.infer<typeof rejectProductReasonSchema>