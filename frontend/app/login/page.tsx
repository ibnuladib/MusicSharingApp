"use client";

import axios from "axios";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useCookie } from "next-cookie";

export default function LoginPage() {
    const router = useRouter();

    const [error, setError] = useState<any>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const rawForm = new FormData(e.currentTarget);

        const payload = {
            email: rawForm.get("email") as string,
            password: rawForm.get("password") as string,
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                payload
            );

            const { access_token } = response.data;
            document.cookie = `access_token=${access_token}; path=/; max-age=86400`;

            const { creatorId } = response.data;
            document.cookie = `creatorId=${creatorId}; path=/; max-age=86400`;

            window.location.href = "/dashboard";

        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Invalid email or password"
            );
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold text-center mb-4 justify-center">Login</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                name="email"
                                placeholder="email@example.com"
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="******"
                                className="input input-bordered w-full"
                            />
                        </div>

                        {error && (
                            <div className="alert alert-error text-sm py-2">
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full">
                                Login
                            </button>
                        </div>
                    </form>

                    <div className="divider">OR</div>

                    <button
                        className="btn btn-outline btn-secondary w-full"
                        onClick={() => router.push("/registration")}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}


