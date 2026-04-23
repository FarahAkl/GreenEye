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

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  profileImage: z.string().nullable(),
  logoImage: z.string().nullable,
  role: z.string(),
  createdAt: z.string(),
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

export const changeRoleRequestSchema = z.object({
  userId: z.string(),
  newRole: z.string(),
});

export const freezeUserSchema = z.object({
  userId: z.string(),
  reason: z.string(),
  days: z.number(),
});

export const unfreezeUserSchema = z.object({
  userId: z.string(),
  message: z.string(),
});

export const pendingProductUpdateSchema = z.object({
  requestId: z.number(),
  productId: z.number(),
  productName: z.string(),
  requestedByUserId: z.string(),
  requestedAt: z.string(),
});

export const pendingProductUpdateResponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string(),
  data:z.array(pendingProductUpdateSchema)
})

export type rejectT = z.infer<typeof rejectedReasonSchema>;
export type withdrawalApproveT = z.infer<typeof withdrawalApproveRequestSchema>;
export type rejectProductT = z.infer<typeof rejectProductReasonSchema>;
export type userT = z.infer<typeof userSchema>;
export type pendingUserT = z.infer<typeof pendingUserSchema>;
export type pendingProductT = z.infer<typeof pendingProductSchema>;
export type changeRoleT = z.infer<typeof changeRoleRequestSchema>;
export type freezeUserT = z.infer<typeof freezeUserSchema>;
export type unfreezeUserT = z.infer<typeof unfreezeUserSchema>;
