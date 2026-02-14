import { z } from "zod";

export const profileSuccessSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string().nullable(),
  data: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    address: z.string(),
    profileImageUrl: z.string(),
  }),
});

export const updateProfileRequestSchema = z.object({
  Name: z.string(),
  Address: z.string(),
  PhoneNumber: z.string(),
  NewImage: z.string(),
});

export type profileT = z.infer<typeof profileSuccessSchema>;
export type updateProfileT = z.infer<typeof updateProfileRequestSchema>