"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
    const [error, setError] = useState<any>(null);

    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const rawForm = new FormData(e.currentTarget);

        const payload = {
            name: rawForm.get("name") as string,
            email: rawForm.get("email") as string,
            password: rawForm.get("password") as string,
            birthyear: Number(rawForm.get("birthyear")),
        };

        try {
            const response = await axios.post(
                "http://localhost:5500/creator/register",
                payload
            );

            console.log(response.data);

            router.push("/login");
        } catch (err: any) {
            setError(
                err.response.data.message ||
                err.response.data.error ||
                "Registration failed"
            );
        }
    };

    return (
        <>
            <h1>Register Page</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" required />
                </div>

                <div>
                    <label>Email</label>
                    <input type="email" name="email" required />
                </div>

                <div>
                    <label>Birth Year</label>
                    <input type="number" name="birthyear" required />
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" name="password" required />
                </div>

                {error && (
                    <p>
                        {error}
                    </p>
                )}
                <button type="submit">Register</button>
            </form>
        </>
    );
}
