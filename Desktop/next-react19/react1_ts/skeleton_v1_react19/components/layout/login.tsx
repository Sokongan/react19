import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInFormInputs, signInSchema } from "@/zod/schemas/userSchema";
import LoadingButton from "./loadingButton";

interface LoginFormProps {
    title: string;
    onSubmit: (data: SignInFormInputs) => Promise<void>; // Updated return type
    error: string;
    isSubmitting: boolean;
}

export function LoginForm({ title, onSubmit, error, isSubmitting }: LoginFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormInputs>({
        resolver: zodResolver(signInSchema),
    });

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="w-full max-w-sm">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <CardHeader>
                                <div className="grid gap-2 text-center">
                                    <h1 className="text-3xl font-bold">{title}</h1>
                                    <p className="text-muted-foreground">
                                        Enter your username below to login to your account
                                    </p>
                                </div>
                            </CardHeader>
                            <CardContent className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="username"
                                        {...register("username")}
                                    />
                                    {errors.username && <p className="text-red-600">{errors.username.message}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="password"
                                        {...register("password")}
                                    />
                                    {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                                </div>
                                {error && <p className="text-red-600">{error}</p>}
                            </CardContent>
                            <CardFooter>
                                <LoadingButton pending={isSubmitting} />
                            </CardFooter>
                        </form>
                    </Card>
        </div>
    );
}
