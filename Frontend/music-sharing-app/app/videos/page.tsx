'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { isLoggedIn, getUserId } from "../utils/cookies";

interface Comment {
    id: number;
    comment: string;
    consumerID?: any;
}

export default function VideosPage() {
    const router = useRouter();

    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const loggedIn = isLoggedIn();
        const storedUserId = getUserId();

        if (!loggedIn || !storedUserId) {
            router.push('/login');
            return;
        }

        setUserId(storedUserId);
        fetchAllComments();
    }, [router]);

    const fetchAllComments = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/consumer/showcomments`
            );

            if (response.data && Array.isArray(response.data)) {
                setComments(response.data);
            } else {
                setComments([]);
            }
            setError(null);
        } catch (err: any) {
            console.error("Error fetching comments:", err);
            setError(err.response?.data?.message || "Failed to load comments");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!newComment.trim()) {
            setError("Please enter a comment");
            return;
        }

        if (!userId) {
            setError("User not authenticated");
            return;
        }

        try {
            setSubmitting(true);
            setError(null);
            setSuccessMessage(null);

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/consumer/comment`,
                {
                    comment: newComment,
                    consumerID: { id: parseInt(userId) }
                }
            );

            setSuccessMessage("Comment posted successfully!");
            setNewComment("");

            // Refresh comments list
            await fetchAllComments();

            // Clear success message after 3 seconds
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any) {
            console.error("Error posting comment:", err);
            setError(err.response?.data?.message || "Failed to post comment");
        } finally {
            setSubmitting(false);
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
                    <span className="text-lg font-semibold">🎥 Videos & Comments</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto p-6 max-w-5xl">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold mb-2">Comment on Videos 🎥</h1>
                    <p className="text-base-content/70">Share your thoughts on available videos and songs</p>
                </div>

                {/* Add Comment Form */}
                <div className="card bg-base-100 shadow-xl mb-8">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4">Add Your Comment</h2>
                        <form onSubmit={handleSubmitComment}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Your Comment</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered h-32"
                                    placeholder="Share your thoughts about the music..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    disabled={submitting}
                                ></textarea>
                            </div>

                            {/* Success Message */}
                            {successMessage && (
                                <div className="alert alert-success mt-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{successMessage}</span>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="alert alert-error mt-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="card-actions justify-end mt-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={submitting || !newComment.trim()}
                                >
                                    {submitting ? (
                                        <>
                                            <span className="loading loading-spinner"></span>
                                            Posting...
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            Post Comment
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* All Comments Section */}
                <div className="mb-6">
                    <h2 className="text-3xl font-bold mb-4">All Comments ({comments.length})</h2>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                )}

                {/* Comments List */}
                {!loading && comments.length === 0 && (
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center py-16">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            <h2 className="text-2xl font-bold mb-2">No comments yet</h2>
                            <p className="text-base-content/70">Be the first to share your thoughts!</p>
                        </div>
                    </div>
                )}

                {!loading && comments.length > 0 && (
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <div key={comment.id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="card-body">
                                    <div className="flex items-start gap-4">
                                        <div className="avatar placeholder">
                                            <div className="bg-accent text-accent-content rounded-full w-12 h-12">
                                                <span className="text-xl">💬</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="badge badge-accent">Comment</span>
                                                <span className="text-sm text-base-content/60">ID: {comment.id}</span>
                                                {comment.consumerID && (
                                                    <span className="text-sm font-semibold text-primary">
                                                        • By: {comment.consumerID.fullName || `User ${comment.consumerID.id}`}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-base-content whitespace-pre-wrap leading-relaxed">
                                                {comment.comment}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Stats */}
                {!loading && comments.length > 0 && (
                    <div className="stats shadow mt-8 w-full">
                        <div className="stat">
                            <div className="stat-figure text-accent">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                                </svg>
                            </div>
                            <div className="stat-title">Total Comments</div>
                            <div className="stat-value text-accent">{comments.length}</div>
                            <div className="stat-desc">Community discussions</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
