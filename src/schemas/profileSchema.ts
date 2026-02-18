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
  name: z.string().nonempty("This field is required"),
  address: z.string().nonempty("This field is required"),
  phoneNumber: z.string().nonempty("This field is required"),
  newImage: z.any().optional(),
});

export type profileT = z.infer<typeof profileSuccessSchema>;
export type updateProfileT = {
  name: string;
  address: string;
  phoneNumber: string;
  newImage?: File;
};