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
  refreshToken:z.string().nullable(),
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
    phoneNumber: z
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
    imageFile: z
      .instanceof(FileList)
      .refine((files) => files.length > 0, "Image is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerSuccessSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string().nullable(),
  data: z.object({
    sent: z.boolean(),
    expireAt: z.string(),
  }),
});

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("This field is required")
    .refine((val) => !val || /\S+@\S+\.\S+/.test(val), {
      message: "Invalid Email Address",
    }),
  newPassword: z
    .string()
    .nonempty("This field is required")
    .min(8, "Password must be at least 8 characters")
    .max(255, "Password must not exceed 255 characters"),
});

export const resetPasswordSuccessSchema = z.object({
  isSuccess: z.boolean(),
  message: z.string().nullable(),
  data: z.string().nullable(),
});

export const resendOtpSchema = z.object({
  email: z.string(),
  type: z.string(),
});

export const verifyOtpSchema = z.object({
  email: z.string().nonempty("This field is required"),
  code: z.string().nonempty("This field is required"),
  type: z.string(),
});

export const revokeTokenSchema = z.object({
  token: z.string(), //refresh token
});

export const forgetPasswordSchema = z.object({
  email: z.string().nonempty("This field is required"),
});

export type errorT = z.infer<typeof ErrorResponseSchema>;
export type registerT = z.infer<typeof registerSchema>;
export type RegisterFormValues = z.input<typeof registerSchema>;
export type registerSuccessT = z.infer<typeof registerSuccessSchema>;
export type forgetPasswordT = z.infer<typeof forgetPasswordSchema>;
export type loginT = z.infer<typeof loginSchema>;
export type resetPasswordT = z.infer<typeof resetPasswordSchema>;
export type resendOtpT = z.infer<typeof resendOtpSchema>;
export type verifyOtpT = z.infer<typeof verifyOtpSchema>;
export type revokeTokenT = z.infer<typeof revokeTokenSchema>;
export type LoginSuccessT = z.infer<typeof loginSuccessResponseSchema>;
