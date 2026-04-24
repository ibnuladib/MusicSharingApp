"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";

const uploadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  file: z.instanceof(File, { message: "File is required" }).refine((file) => file.size > 0, "File must be present"),
});


function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

export default function CreateUpload() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const creatorId = getCookie("creatorId");
    const token = getCookie("access_token");

    if (!token || !creatorId) {
      setError("Not authenticated. Please log in.");
      router.push("/login");
      return;
    }

    const formEl = e.currentTarget;
    const formDataRaw = new FormData(formEl);
    const file = formDataRaw.get("file") as File | null;

    const payload = {
      title: formDataRaw.get("title") as string,
      description: formDataRaw.get("description") as string,
      file,
    };

    const result = uploadSchema.safeParse(payload);

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", result.data.title);
      formData.append("description", result.data.description);
      formData.append("file", result.data.file);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/creator/${creatorId}/createupload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      router.push("/dashboard");
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Session expired. Please log in again.");
        router.push("/login");
      } else {
        setError(
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Upload failed"
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-10">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-4 justify-center">Upload File</h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                placeholder="Enter description"
                className="textarea textarea-bordered h-24"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">File (jpg, jpeg, png only)</span>
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

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Upload
              </button>
            </div>
            <div className="form-control mt-2">
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