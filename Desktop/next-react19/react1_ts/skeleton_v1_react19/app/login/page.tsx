'use client';

import { useState } from "react";
import { SignInFormInputs } from "@/zod/schemas/userSchema";
import { handleCredentialsSignin } from "../actions/user/action";
import { LoginForm } from "../../components/layout/login";


export default function LoginPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values: SignInFormInputs) => { // Adjusted the type
        setLoading(true);
        try {
            const result = await handleCredentialsSignin(values);
            if (result?.message) {
                setError(result.message);
            }
        } catch (error) {
            console.log("An unexpected error occurred. Please try again.",error);
        } finally {
            setLoading(false); // Set loading to false regardless of outcome
        }
    };

    return (
        <LoginForm
            title="DOJ SKELETON" 
            onSubmit={onSubmit} 
            error={error} 
            isSubmitting={loading}
        />
    );
}
