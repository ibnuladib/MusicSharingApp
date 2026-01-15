'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { isLoggedIn, getUserId } from "../../utils/cookies";

interface Comment {
    id: number;
    comment: string;
    songName?: string;
}

export default function MyCommentsPage() {
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;

    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loggedIn = isLoggedIn();
        const storedUserId = getUserId();

        if (!loggedIn || !storedUserId) {
            router.push('/login');
            return;
        }

        if (storedUserId !== userId) {
            router.push(`/my-comments/${storedUserId}`);
            return;
        }

        fetchUserComments();
    }, [router, userId]);

    const fetchUserComments = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/consumer/dbcommentfromuser/${userId}`
            );

            if (response.data && response.data.consumerComments) {
                setComments(response.data.consumerComments);
            } else {
                setComments([]);
            }
            setError(null);
        } catch (err: any) {
            console.error("Error fetching comments:", err);
            if (err.response?.status === 404) {
                setComments([]);
                setError(null);
            } else {
                setError(err.response?.data?.message || "Failed to load comments");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            {/* Navbar */}
            <div className="navbar bg-base-100 shadow-lg">
                <div className="flex-1">
                    <button
                        onClick={() => router.push(`/dashboard/${userId}`)}
                        className="btn btn-ghost text-xl">
                        ← Back to Dashboard
                    </button>
                </div>
                <div className="flex-none">
                    <span className="text-lg font-semibold">💬 My Comments</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto p-6 max-w-4xl">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold mb-2">Your Comments 💬</h1>
                    <p className="text-base-content/70">All the comments you've made on songs</p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="alert alert-error shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && comments.length === 0 && (
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center py-16">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            <h2 className="text-2xl font-bold mb-2">No comments yet</h2>
                            <p className="text-base-content/70 mb-6">Start sharing your thoughts on songs!</p>
                            <button
                                onClick={() => router.push('/videos')}
                                className="btn btn-primary">
                                Comment on Videos
                            </button>
                        </div>
                    </div>
                )}

                {/* Comments List */}
                {!loading && !error && comments.length > 0 && (
                    <>
                        <div className="space-y-4">
                            {comments.map((comment, index) => (
                                <div key={comment.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="card-body">
                                        <div className="flex items-start gap-4">
                                            <div className="avatar placeholder">
                                                <div className="bg-secondary text-secondary-content rounded-full w-12 h-12">
                                                    <span className="text-xl">💬</span>
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="badge badge-primary">Comment #{index + 1}</span>
                                                    <span className="text-sm text-base-content/60">ID: {comment.id}</span>
                                                    {comment.songName && (
                                                        <span className="badge badge-secondary">🎵 {comment.songName}</span>
                                                    )}
                                                </div>
                                                <p className="text-base-content whitespace-pre-wrap">{comment.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="stats shadow mt-8 w-full">
                            <div className="stat">
                                <div className="stat-figure text-secondary">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                                    </svg>
                                </div>
                                <div className="stat-title">Total Comments</div>
                                <div className="stat-value text-secondary">{comments.length}</div>
                                <div className="stat-desc">Keep sharing your thoughts!</div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
