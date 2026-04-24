"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password must be at least 1 characters long"),
    birthyear: z
        .number()
        .min(1900, "Birth year must be after 1900")
        .max(new Date().getFullYear(), "Birth year cannot be in the future"),
});

export default function RegistrationPage() {
    const [error, setError] = useState<any>(null);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

    const router = useRouter();

    const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (e.target.checked) {
            setSelectedGenres([...selectedGenres, value]);
        } else {
            setSelectedGenres(selectedGenres.filter((id) => id !== value));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const rawForm = new FormData(e.currentTarget);

        const payload = {
            name: rawForm.get("name") as string,
            email: rawForm.get("email") as string,
            password: rawForm.get("password") as string,
            birthyear: Number(rawForm.get("birthyear")),
            genreIds: selectedGenres,
        };

        // Skip schema validation for now as we haven't updated the frontend schema yet
        // const result = registerSchema.safeParse(payload);
        // if (!result.success) {
        //     setError(result.error.issues[0].message);
        //     return;
        // }
        // const validatedPayload = result.data;
        const validatedPayload = payload;

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/creator/register`,
                validatedPayload
            );

            console.log(response.data);

            router.push("/login");
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 py-10">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold text-center mb-4 justify-center">Register</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="email@example.com"
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Birth Year</span>
                            </label>
                            <input
                                type="number"
                                name="birthyear"
                                placeholder="YYYY"
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

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Favorite Genres</span>
                            </label>
                            <div className="flex flex-col gap-2 p-2 border rounded-box border-base-300">
                                {[
                                    { id: 1, name: "Pop" },
                                    { id: 2, name: "Rock" },
                                    { id: 3, name: "Jazz" },
                                    { id: 4, name: "Hip-Hop" },
                                    { id: 5, name: "Classical" }
                                ].map(genre => (
                                    <label key={genre.id} className="label cursor-pointer justify-start gap-3">
                                        <input
                                            type="checkbox"
                                            value={genre.id}
                                            onChange={handleGenreChange}
                                            className="checkbox checkbox-primary checkbox-sm"
                                        />
                                        <span className="label-text">{genre.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {error && (
                            <div className="alert alert-error text-sm py-2">
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full">
                                Register
                            </button>
                        </div>
                    </form>

                    <div className="divider">OR</div>
                    <button
                        className="btn btn-outline btn-secondary w-full"
                        onClick={() => router.push("/login")}
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
}
