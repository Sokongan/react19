import { object, string, z } from "zod";


export type SignInFormInputs = z.infer<typeof signInSchema>;

export const signInSchema = object({
    username: string({ required_error: "Username is required" })
        .min(1, "Username is required"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(6, "Password must be more than 6 characters")
        .max(32, "Password must be less than 32 characters"),
});
