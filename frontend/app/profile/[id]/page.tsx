"use client";

import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { z } from "zod";

const profileSchema = z.object({
    id: z.number(),
    fullName: z.string(),
    email: z.string(),
    birthyear: z.number(),
    genres: z.array(z.object({ id: z.number(), name: z.string() })).optional(),
});

const updateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    birthyear: z.number().optional(),
    genreIds: z.array(z.number()).optional(),
});

function getCookie(name: string): string | undefined {
    if (typeof document === "undefined") return undefined;
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`))
        ?.split("=")[1];
}

export default function EditProfile() {
    const [profile, setProfile] = useState<z.infer<typeof profileSchema> | null>(null);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const params = useParams();
    const creatorId = params?.id as string;

    useEffect(() => {
        const fetchProfile = async () => {
            const token = getCookie("access_token");

            if (!token || !creatorId) {
                router.push("/login");
                return;
            }

            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/creator/${creatorId}/profile`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true,
                    }
                );
                const parsed = profileSchema.safeParse(response.data);
                if (parsed.success) {
                    setProfile(parsed.data);
                    if (parsed.data.genres) {
                        setSelectedGenres(parsed.data.genres.map((g: any) => g.id));
                    }
                }
            } catch (err: any) {
                if (err.response?.status === 401) {
                    router.push("/login");
                }
            }
        };

        if (creatorId) fetchProfile();
    }, [creatorId, router]);

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
        setSuccess(false);

        const token = getCookie("access_token");

        if (!token || !creatorId) {
            router.push("/login");
            return;
        }

        const formData = new FormData(e.currentTarget);
        const birthyearValue = formData.get("birthyear") as string;

        const payload = {
            name: formData.get("name") as string,
            birthyear: birthyearValue ? parseInt(birthyearValue) : undefined,
            genreIds: selectedGenres,
        };

        const result = updateSchema.safeParse(payload);

        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        try {
            await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/creator/${creatorId}/update`,
                result.data,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );
            setSuccess(true);
        } catch (err: any) {
            if (err.response?.status === 401) {
                router.push("/login");
            } else {
                setError(err.response?.data?.message || "Update failed");
            }
        }
    };

    if (!profile) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 py-10">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold text-center mb-4 justify-center">Edit Profile</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={profile.fullName}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email (cannot be changed)</span>
                            </label>
                            <input
                                type="email"
                                value={profile.email}
                                className="input input-bordered w-full input-disabled"
                                disabled
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Birth Year</span>
                            </label>
                            <input
                                type="number"
                                name="birthyear"
                                defaultValue={profile.birthyear}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Genres</span>
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
                                            checked={selectedGenres.includes(genre.id)}
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
                        {success && (
                            <div className="alert alert-success text-sm py-2">
                                <span>Profile updated successfully!</span>
                            </div>
                        )}

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary w-full">
                                Save Changes
                            </button>
                        </div>
                        <div className="form-control mt-2">
                            <button
                                type="button"
                                className="btn btn-ghost w-full"
                                onClick={() => router.push("/dashboard")}
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}