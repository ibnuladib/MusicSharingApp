"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                    <div className="text-secondary mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="card-title text-3xl font-bold mb-2">404 - Not Found</h2>
                    <p className="text-base-content/70 mb-6">
                        Sorry, the page you are looking for does not exist or has been moved.
                    </p>
                    <div className="card-actions flex-col w-full gap-2">
                        <Link href="/" className="btn btn-primary w-full">
                            Go Home
                        </Link>
                        <Link href="/dashboard" className="btn btn-ghost w-full">
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
