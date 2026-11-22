import { z } from "zod";
import { requiredField } from "../shared/shared";

export const registerUserValidator = z.object({
    username: z.string(requiredField("Username"))
        .trim()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be less than 30 characters"),
    email: z.string(requiredField("Email"))
        .trim()
        .toLowerCase()
        .pipe(z.email("Invalid email address")),
    password: z.string(requiredField("Password"))
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must be less than 100 characters")
});

export const loginUserValidator = z.object({
    email: z.string(requiredField("Email"))
        .trim()
        .toLowerCase()
        .pipe(z.email("Invalid email address")),
    password: z.string(requiredField("Password"))
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password must be less than 100 characters")
});

export type RegisterInput = z.infer<typeof registerUserValidator>;
export type loginInput = z.infer<typeof loginUserValidator>;