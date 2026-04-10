"use client";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = ({ className, ...props }: React.ComponentProps<"div">) => {

    const searchParams = useSearchParams();

    const router = useRouter();

    useEffect(() => {

        const expired = searchParams.get("expired");

        if (expired === "true") {

            toast.error("Session Expired! Please Login Again.");

        }

    }, [searchParams]);

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormData) => {

        try {

            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {

                toast.error(result.message || "Login failed");

                return;

            }

            toast.success("Login Successful!");

            reset();

            router.push("/dashboard");

            router.refresh();

        } catch (error) {

            toast.error("Something went wrong. Please try again.");

        }

    };

    return (
        <div className={cn("min-h-screen px-4 flex items-center justify-center", className)} {...props}>
            <div className="flex flex-col gap-6 w-full max-w-md">
                <Card className="py-8">
                    <CardHeader>
                        <CardTitle className="text-2xl mb-4">Login to your account</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>

                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        {...register("email")}
                                        className="border-gray-600 focus:border-blue-500"
                                    />

                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>

                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="******"
                                        {...register("password")}
                                        className="border-gray-600 focus:border-blue-500"
                                    />

                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                    )}
                                </Field>

                                <Field>
                                    <Button
                                        type="submit"
                                        className="w-full font-bold py-5 cursor-pointer"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Loading..." : "Login"}
                                    </Button>
                                </Field>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Login;