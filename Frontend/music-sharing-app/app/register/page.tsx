"use client";

import { FormEvent, useState } from "react";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

// Zod schema
const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name cannot contain numbers or special characters"),
  age: z
    .coerce.number()
    .min(1, "Age must be a positive number")
    .max(120, "Age must be less than or equal to 120"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccess(null);

    const form = new FormData(e.currentTarget);

    const rawData = {
      fullName: form.get("fullName") as string,
      age: form.get("age"),
      email: form.get("email") as string,
      password: form.get("password") as string,
    };

    try {
      // Zod validation
      const data: RegisterFormData = registerSchema.parse(rawData);

      // Send to backend
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/register",
        data
      );

      setSuccess(response.data?.message ?? "Registration successful");
      router.push("/login");
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.issues.forEach((e: any) => {
          fieldErrors[e.path[0]] = e.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({
          general: err.response?.data?.message ||
            err.response?.data?.error ||
            "Registration failed"
        });
      }
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-30">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl">Register</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Full Name */}
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="grow"
                  required
                />
              </label>
              {errors.fullName && (
                <p className="text-error text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </g>
                </svg>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  className="grow"
                  required
                />
              </label>
              {errors.age && (
                <p className="text-error text-sm mt-1">{errors.age}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  name="email"
                  placeholder="mail@site.com"
                  className="grow"
                  required
                />
              </label>
              {errors.email && (
                <p className="text-error text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <svg className="h-4 w-4 opacity-70" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                    ></path>
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="grow"
                  required
                />
              </label>
              {errors.password && (
                <p className="text-error text-sm mt-1">{errors.password}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Must be 8+ characters with uppercase, lowercase, number & special character
              </p>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="alert alert-error">
                <span>{errors.general}</span>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="alert alert-success">
                <span>{success}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}