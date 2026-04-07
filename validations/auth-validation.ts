import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
const MAX_AVATAR_SIZE_MB = 2;
const MAX_AVATAR_BYTES = MAX_AVATAR_SIZE_MB * 1024 * 1024;

export const registerSchema = z
  .object({
    email: z.email({ message: "Invalid email address" }),

    password: z
      .string()
      .min(3, "Password must be at least 3 characters")
      .max(72, "Password must be at most 72 characters"),

    password_confirmation: z.string(),

    username: z
      .string()
      .min(3, "Min 3 characters")
      .max(20, "Max 20 characters")
      .regex(
        /^[a-zA-Z0-9_-]+$/,
        "Only letters, numbers, underscores, and hyphens allowed",
      ),

    avatar: z
      .instanceof(File)
      .refine(
        (f) =>
          ACCEPTED_IMAGE_TYPES.includes(
            f.type as (typeof ACCEPTED_IMAGE_TYPES)[number],
          ),
        `Accepted formats: ${ACCEPTED_IMAGE_TYPES.join(", ")}`,
      )
      .refine(
        (f) => f.size <= MAX_AVATAR_BYTES,
        `Max file size is ${MAX_AVATAR_SIZE_MB}MB`,
      )
      .optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
