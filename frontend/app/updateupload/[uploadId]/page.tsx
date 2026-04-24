"use client";

import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { z } from "zod";

const uploadSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    filePath: z.string(),
    fileType: z.string(),
});

const updateUploadSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    file: z.instanceof(File).optional(),
});

function getCookie(name: string): string | undefined {
    if (typeof document === "undefined") return undefined;
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`))
        ?.split("=")[1];
}

export default function UpdateUpload() {
    const [error, setError] = useState<string | null>(null);
    const [upload, setUpload] = useState<z.infer<typeof uploadSchema> | null>(null);
    const router = useRouter();
    const params = useParams();
    const uploadId = params?.uploadId as string;

    useEffect(() => {
        const fetchUpload = async () => {
            const creatorId = getCookie("creatorId");
            const token = getCookie("access_token");

            if (!token || !creatorId) {
                router.push("/login");
                return;
            }

            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/creator/${creatorId}/upload/${uploadId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        withCredentials: true,
                    }
                );
                const parsed = uploadSchema.safeParse(response.data);
                if (parsed.success) {
                    setUpload(parsed.data);
                }
            } catch (err: any) {
                if (err.response?.status === 401) {
                    router.push("/login");
                }
            }
        };

        if (uploadId) fetchUpload();
    }, [uploadId, router]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const creatorId = getCookie("creatorId");
        const token = getCookie("access_token");

        if (!token || !creatorId) {
            router.push("/login");
            return;
        }

        const formEl = e.currentTarget;
        const formDataRaw = new FormData(formEl);
        const fileInput = formDataRaw.get("file") as File | null;

        const payload = {
            title: formDataRaw.get("title") as string,
            description: formDataRaw.get("description") as string,
            file: fileInput && fileInput.size > 0 ? fileInput : undefined,
        };

        const result = updateUploadSchema.safeParse(payload);

        if (!result.success) {
            setError(result.error.issues[0].message);
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", result.data.title);
            formData.append("description", result.data.description);
            if (result.data.file) {
                formData.append("file", result.data.file);
            }

            await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/creator/${creatorId}/upload/${uploadId}`,
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );

            router.push("/dashboard");
        } catch (err: any) {
            if (err.response?.status === 401) {
                router.push("/login");
            } else {
                setError(err.response?.data?.message || "Update failed");
            }
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this upload?")) return;

        const creatorId = getCookie("creatorId");
        const token = getCookie("access_token");

        if (!token || !creatorId) {
            router.push("/login");
            return;
        }

        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/creator/${creatorId}/upload/${uploadId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to delete upload");
        }
    };

    if (!upload) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 py-10">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold text-center mb-4 justify-center">Update Upload</h2>

                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                defaultValue={upload.title}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                name="description"
                                defaultValue={upload.description}
                                className="textarea textarea-bordered h-24"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Current File</span>
                            </label>
                            {upload.filePath && (
                                <div className="flex justify-center p-2 border rounded-box border-base-300 bg-base-200">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/${upload.filePath}`}
                                        alt={upload.title}
                                        className="max-h-32 object-contain"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Change File (optional)</span>
                            </label>
                            <input
                                type="file"
                                name="file"
                                accept=".jpg,.jpeg,.png"
                                className="file-input file-input-bordered w-full"
                            />
                        </div>

                        {error && (
                            <div className="alert alert-error text-sm py-2">
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="flex flex-col gap-2 mt-6">
                            <button type="submit" className="btn btn-primary w-full">
                                Update Upload
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                className="btn btn-error btn-outline w-full"
                            >
                                Delete Upload
                            </button>

                            <button
                                type="button"
                                className="btn btn-ghost w-full"
                                onClick={() => router.push("/dashboard")}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
