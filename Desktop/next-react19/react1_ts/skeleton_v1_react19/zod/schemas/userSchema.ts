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


export type UserFormSchema = z.infer<typeof userUpdateSchema>;

export const userUpdateSchema = z.object({
    username: z
      .string({ required_error: "Username is required" })
      .min(1, "Username is required"),
    first_name: z
      .string({ required_error: "First Name is required" })
      .min(1, "First Name is required"),
    middle_name: z.string().optional(),
    last_name: z
      .string({ required_error: "Last Name is required" })
      .min(1, "Last Name is required"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be more than 6 characters")
      .max(32, "Password must be less than 32 characters"),
    confirm_password: z.string({ required_error: "Confirm Password is required" }),
  }).refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords must match",
  });
  

