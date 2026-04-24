"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Unauthorized() {
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                    <div className="text-warning mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="card-title text-3xl font-bold mb-2">Access Denied</h2>
                    <p className="text-base-content/70 mb-6">
                        Oops! You don't have permission to view this page. Please log in to continue.
                    </p>
                    <div className="card-actions flex-col w-full gap-2">
                        <button
                            onClick={() => router.push("/login")}
                            className="btn btn-primary w-full"
                        >
                            Log In
                        </button>
                        <Link href="/" className="btn btn-ghost w-full">
                            Go Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
