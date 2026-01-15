'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { isLoggedIn, getUserId } from "../utils/cookies";
import { usePusher } from "../hooks/usePusher";
import { Toaster } from "react-hot-toast";

interface Song {
    id: number;
    name: string;
    artist: string;
    album: string;
    albumArt: string;
}


const SONGS: Song[] = [
    {
        id: 1,
        name: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        albumArt: "/blindin_lights.png"
    },
    {
        id: 2,
        name: "Shape of You",
        artist: "Ed Sheeran",
        album: "÷ (Divide)",
        albumArt: "/sou.jpg"
    },
    {
        id: 3,
        name: "Someone Like You",
        artist: "Adele",
        album: "21",
        albumArt: "/adele.png"
    },
    {
        id: 4,
        name: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        albumArt: "/queen.jpg"
    },
    {
        id: 5,
        name: "Levitating",
        artist: "Dua Lipa",
        album: "Future Nostalgia",
        albumArt: "/dua.png"
    },
    {
        id: 6,
        name: "Watermelon Sugar",
        artist: "Harry Styles",
        album: "Fine Line",
        albumArt: "/harry.png"
    }
];

export default function SongsPage() {
    const router = useRouter();

    const [userId, setUserId] = useState<string | null>(null);
    const [currentFavorite, setCurrentFavorite] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<number | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [commentModalOpen, setCommentModalOpen] = useState(false);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    const [commentText, setCommentText] = useState("");
    const [commentSubmitting, setCommentSubmitting] = useState(false);


    usePusher(userId);

    useEffect(() => {
        const loggedIn = isLoggedIn();
        const storedUserId = getUserId();

        if (!loggedIn || !storedUserId) {
            router.push('/login');
            return;
        }

        setUserId(storedUserId);
        fetchCurrentFavorite(storedUserId);
    }, [router]);

    const fetchCurrentFavorite = async (uid: string) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/consumer/dblikefromuser/${uid}`
            );

            if (response.data && response.data.songName) {
                setCurrentFavorite(response.data.songName);
            }
        } catch (err: any) {

            console.log("No favorite song set yet");
        } finally {
            setLoading(false);
        }
    };

    const handleSetFavorite = async (song: Song) => {
        if (!userId) return;

        try {
            setActionLoading(song.id);
            setError(null);
            setSuccessMessage(null);

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/consumer/like`,
                {
                    songID: song.id,
                    songName: song.name,
                    consumerID: { id: parseInt(userId) }
                }
            );

            setCurrentFavorite(song.name);
            setSuccessMessage(`"${song.name}" set as your favorite! ❤️`);

            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any) {
            console.error("Error setting favorite:", err);
            setError(err.response?.data?.message || "Failed to set favorite");
        } finally {
            setActionLoading(null);
        }
    };

    const openCommentModal = (song: Song) => {
        setSelectedSong(song);
        setCommentText("");
        setCommentModalOpen(true);
        setError(null);
    };

    const closeCommentModal = () => {
        setCommentModalOpen(false);
        setSelectedSong(null);
        setCommentText("");
    };

    const handleSubmitComment = async () => {
        if (!userId || !selectedSong || !commentText.trim()) return;

        try {
            setCommentSubmitting(true);
            setError(null);

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/consumer/comment`,
                {
                    songID: selectedSong.id,
                    songName: selectedSong.name,
                    comment: commentText,
                    consumerID: { id: parseInt(userId) }
                }
            );

            setSuccessMessage(`Comment added on "${selectedSong.name}"! 💬`);
            closeCommentModal();

            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err: any) {
            console.error("Error posting comment:", err);
            setError(err.response?.data?.message || "Failed to post comment");
        } finally {
            setCommentSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            {/* Toast Notifications */}
            <Toaster />

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
                    <span className="text-lg font-semibold">🎵 Browse Songs</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto p-6">
                <div className="mb-6">
                    <h1 className="text-4xl font-bold mb-2">Browse Songs 🎵</h1>
                    <p className="text-base-content/70">
                        Set your favorite song and share your thoughts
                        {currentFavorite && (
                            <span className="ml-2 badge badge-primary">
                                Current Favorite: {currentFavorite}
                            </span>
                        )}
                    </p>
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="alert alert-success shadow-lg mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{successMessage}</span>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="alert alert-error shadow-lg mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                )}

                {/* Songs Grid */}
                {!loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {SONGS.map((song) => {
                            const isFavorite = currentFavorite === song.name;
                            const isLoading = actionLoading === song.id;

                            return (
                                <div key={song.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all">
                                    <figure className="relative">
                                        <img
                                            src={song.albumArt}
                                            alt={song.album}
                                            className="w-full h-64 object-cover"
                                        />
                                        {isFavorite && (
                                            <div className="badge badge-error absolute top-4 right-4 gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                                Favorite
                                            </div>
                                        )}
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{song.name}</h2>
                                        <p className="text-base-content/70">{song.artist}</p>
                                        <p className="text-sm text-base-content/50">{song.album}</p>

                                        <div className="card-actions justify-end mt-4">
                                            <button
                                                onClick={() => handleSetFavorite(song)}
                                                className={`btn btn-sm ${isFavorite ? 'btn-error' : 'btn-outline btn-error'}`}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? (
                                                    <span className="loading loading-spinner loading-xs"></span>
                                                ) : (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                        </svg>
                                                        {isFavorite ? 'Favorite' : 'Set Favorite'}
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={() => openCommentModal(song)}
                                                className="btn btn-sm btn-outline btn-primary"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                                </svg>
                                                Comment
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Comment Modal */}
            {commentModalOpen && selectedSong && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">
                            Comment on "{selectedSong.name}"
                        </h3>
                        <p className="text-sm text-base-content/70 mb-4">
                            by {selectedSong.artist}
                        </p>

                        <textarea
                            className="textarea textarea-bordered w-full h-32"
                            placeholder="Share your thoughts about this song..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            disabled={commentSubmitting}
                        ></textarea>

                        <div className="modal-action">
                            <button
                                onClick={closeCommentModal}
                                className="btn btn-ghost"
                                disabled={commentSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitComment}
                                className="btn btn-primary"
                                disabled={commentSubmitting || !commentText.trim()}
                            >
                                {commentSubmitting ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Posting...
                                    </>
                                ) : (
                                    'Post Comment'
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={closeCommentModal}></div>
                </div>
            )}
        </div>
    );
}
