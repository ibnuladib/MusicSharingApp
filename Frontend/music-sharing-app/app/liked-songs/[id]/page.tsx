'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { isLoggedIn, getUserId } from "../../utils/cookies";

interface LikedSong {
    id: number;
    songName: string;
}

export default function LikedSongsPage() {
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;

    const [likedSongs, setLikedSongs] = useState<LikedSong[]>([]);
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
            router.push(`/liked-songs/${storedUserId}`);
            return;
        }

        fetchLikedSongs();
    }, [router, userId]);

    const fetchLikedSongs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/consumer/dblikefromuser/${userId}`
            );

          
            if (response.data && response.data.songName) {
                setLikedSongs([response.data]);
            } else {
                setLikedSongs([]);
            }
            setError(null);
        } catch (err: any) {
            console.error("Error fetching liked songs:", err);
            if (err.response?.status === 404) {
                setLikedSongs([]);
                setError(null);
            } else {
                setError(err.response?.data?.message || "Failed to load liked songs");
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
                    <span className="text-lg font-semibold">🎵 My Liked Songs</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold mb-2">Your Liked Songs ❤️</h1>
                    <p className="text-base-content/70">All the songs you've liked in one place</p>
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
                {!loading && !error && likedSongs.length === 0 && (
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body items-center text-center py-16">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <h2 className="text-2xl font-bold mb-2">No songs liked yet</h2>
                            <p className="text-base-content/70 mb-6">Start exploring and like some songs to see them here!</p>
                            <button
                                onClick={() => router.push(`/dashboard/${userId}`)}
                                className="btn btn-primary">
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                )}

                {/* Liked Songs Grid */}
                {!loading && !error && likedSongs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {likedSongs.map((song) => (
                            <div key={song.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                                <div className="card-body">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h2 className="card-title text-xl mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                                </svg>
                                                {song.songName}
                                            </h2>
                                        </div>
                                        <div className="badge badge-error gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            Liked
                                        </div>
                                    </div>
                                    <div className="card-actions justify-end mt-4">
                                        <button className="btn btn-sm btn-ghost">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Play
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Stats */}
                {!loading && !error && likedSongs.length > 0 && (
                    <div className="stats shadow mt-8 w-full">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>
                            </div>
                            <div className="stat-title">Total Liked Songs</div>
                            <div className="stat-value text-primary">{likedSongs.length}</div>
                            <div className="stat-desc">Keep discovering more music!</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
