"use client";

import axios from "axios";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

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
                "http://localhost:5500/auth/login",
                payload
            );

            const { access_token } = response.data;

            document.cookie = `access_token=${access_token}; path=/; max-age=86400`;

            router.push("/dashboard");
        } catch (err: any) {
                setError(
                    err.response?.data?.message ||
                    err.response?.data?.error ||
                    "Invalid email or password"
                );
            }
        }

    return (
        <>
            <h1>Login Page</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" required />
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" name="password" required />
                </div>

                {error && (
                    <p style={{ color: "red", marginTop: "8px" }}>
                        {error}
                    </p>
                )}

                <button type="submit" >
                    Login
                </button>
            </form>
        </>
    );
}


