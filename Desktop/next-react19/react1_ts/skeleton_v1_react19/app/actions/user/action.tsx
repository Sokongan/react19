"use server";

import { signIn, signOut } from "@/lib/auth/options";
import { AuthError } from "next-auth";


export async function handleCredentialsSignin({
    username,
    password,
}: {
    username: string;
    password: string;
}) {
    try {
        await signIn("credentials", { username, password, redirectTo: "/" });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        message: "Invalid credentials",
                    };
                default:
                    return {
                        message: "Something went wrong.",
                    };
            }
        }
        throw error;
    }
}

export async function handleSignOut() {
    await signOut();
}
