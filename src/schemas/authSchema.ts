import { z } from "zod";

export const AuthResponseDataSchema = z.object({
  isAuthenticated: z.boolean(),
  email: z.string().nullable(),
  userName: z.string().nullable(),
  userId: z.string().nullable(),
  address: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  roles: z.array(z.string()),
  accessToken: z.string().nullable(),
  expiresIn: z.string().nullable(),
  refreshTokenExpiration: z.string().nullable(),
});

export const loginSuccessResponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string().nullable(),
  data: AuthResponseDataSchema,
});

export const ErrorResponseSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string().nullable(),
  data: z.object().nullable(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("This field is required")
    .refine((val) => !val || /\S+@\S+\.\S+/.test(val), {
      message: "Invalid Email Address",
    }),
  password: z
    .string()
    .nonempty("This field is required")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean(),
});

export const registerSchema = z
  .object({
    name: z.string().nonempty("This field is required").min(3),
    email: z
      .string()
      .nonempty("This field is required")
      .refine((val) => !val || /\S+@\S+\.\S+/.test(val), {
        message: "Invalid Email Address",
      }),
    address: z.string().nonempty("This field is required"),
    phone: z
      .string()
      .nonempty("This field is required")
      .regex(/^([0-9\s-+()]*)$/, "Invalid phone number")
      .min(10, "Phone number is shorter than the minimum length"),
    password: z
      .string()
      .nonempty("This field is required")
      .min(8, "Password must be at least 8 characters")
      .max(255, "Password must not exceed 255 characters"),
    confirmPassword: z
      .string()
      .nonempty("This field is required")
      .min(8, "Password must be at least 8 characters")
      .max(255, "Password must not exceed 255 characters"),
    rule: z.string(),
    imageFile: z.file(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerSuccessSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string().nullable(),
  data: z.object({
    sent: z.string(),
    expireAt: z.string(),
  }),
});

export const resetPasswordSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const resendOtpSchema = z.object({
  email: z.string(),
  type: z.number(),
});

export const verifyOtpSchema = z.object({
  email: z.string(),
  code: z.string(),
  type: z.number(),
});

export const revokeTokenSchema = z.object({
  token: z.string(),
});

export type errorT = z.infer<typeof ErrorResponseSchema>;
export type registerT = z.infer<typeof registerSchema>;
export type registerSuccessT = z.infer<typeof registerSuccessSchema>;
export type loginT = z.infer<typeof loginSchema>;
export type resetPasswordT = z.infer<typeof resetPasswordSchema>;
export type resendOtpT = z.infer<typeof resendOtpSchema>;
export type verifyOtpT = z.infer<typeof verifyOtpSchema>;
export type revokeTokenT = z.infer<typeof revokeTokenSchema>;
export type LoginSuccessT = z.infer<typeof loginSuccessResponseSchema>;
