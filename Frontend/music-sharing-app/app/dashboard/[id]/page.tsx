'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { isLoggedIn, getUserId, getUserName, getUserEmail, clearAuthCookies } from "../../utils/cookies";
import { usePusher } from "../../hooks/usePusher";
import { Toaster } from "react-hot-toast";

export default function DashboardPage() {
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;

    const [userName, setUserName] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [profilePicture, setProfilePicture] = useState<string | null>(null);

    usePusher(userId);

    useEffect(() => {
        const loggedIn = isLoggedIn();
        const storedUserId = getUserId();
        const storedUserName = getUserName();
        const storedUserEmail = getUserEmail();

        if (!loggedIn || !storedUserId) {
            router.push('/login');
            return;
        }

        if (storedUserId !== userId) {
            router.push(`/dashboard/${storedUserId}`);
            return;
        }

        setUserName(storedUserName || "User");
        setUserEmail(storedUserEmail || "");

        fetchUserProfile(userId);
    }, [router, userId]);

    const fetchUserProfile = async (id: string) => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/consumer/dbshowID/${id}`
            );
            if (response.data && response.data.profilePicture) {
                setProfilePicture(`${process.env.NEXT_PUBLIC_API_URL}/uploads/${response.data.profilePicture}`);
            }
        } catch (err) {
            console.error("Error fetching user profile:", err);
        }
    };

    const handleLogout = () => {
        clearAuthCookies();
        router.push('/login');
    };

    return (
        <div className="min-h-screen bg-base-200">
            {/* Toast Notifications */}
            <Toaster />

            {/* Navbar */}
            <div className="navbar bg-base-100 shadow-lg">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">🎵 MusicShare</a>
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center overflow-hidden">
                                {profilePicture ? (
                                    <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-lg font-bold">{userName.charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li className="menu-title">
                                <span>{userName}</span>
                                <span className="text-xs opacity-60">{userEmail}</span>
                            </li>
                            <li><a onClick={() => router.push(`/profile-settings/${userId}`)}>Profile Settings</a></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto p-6">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Welcome back, {userName}! 👋</h1>
                    <p className="text-base-content/70">Ready to discover and share amazing music?</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="stat bg-base-100 rounded-lg shadow">
                        <div className="stat-figure text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                            </svg>
                        </div>
                        <div className="stat-title">Total Playlists</div>
                        <div className="stat-value text-primary">12</div>
                        <div className="stat-desc">↗︎ 2 new this week</div>
                    </div>

                    <div className="stat bg-base-100 rounded-lg shadow">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                        </div>
                        <div className="stat-title">Favorite Songs</div>
                        <div className="stat-value text-secondary">87</div>
                        <div className="stat-desc">↗︎ 12 added recently</div>
                    </div>

                    <div className="stat bg-base-100 rounded-lg shadow">
                        <div className="stat-figure text-accent">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                            </svg>
                        </div>
                        <div className="stat-title">Shared With</div>
                        <div className="stat-value text-accent">24</div>
                        <div className="stat-desc">Friends</div>
                    </div>

                    <div className="stat bg-base-100 rounded-lg shadow">
                        <div className="stat-figure text-info">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <div className="stat-title">Listening Time</div>
                        <div className="stat-value text-info">42h</div>
                        <div className="stat-desc">This month</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card bg-base-100 shadow-xl mb-8">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button
                                onClick={() => router.push(`/liked-songs/${userId}`)}
                                className="btn btn-primary btn-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                My Favorite Song
                            </button>
                            <button
                                onClick={() => router.push(`/my-comments/${userId}`)}
                                className="btn btn-secondary btn-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                                My Comments
                            </button>
                            <button
                                onClick={() => router.push('/songs')}
                                className="btn btn-accent btn-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                                Browse Songs
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-xl mb-4">Recent Activity</h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-3 hover:bg-base-200 rounded-lg transition-colors">
                                    <div className="avatar placeholder">
                                        <div className="bg-primary text-primary-content rounded-full w-12">
                                            <span>🎵</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">Added to "Summer Vibes"</p>
                                        <p className="text-sm text-base-content/70">2 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-3 hover:bg-base-200 rounded-lg transition-colors">
                                    <div className="avatar placeholder">
                                        <div className="bg-secondary text-secondary-content rounded-full w-12">
                                            <span>❤️</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">Liked "Midnight Dreams"</p>
                                        <p className="text-sm text-base-content/70">5 hours ago</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-3 hover:bg-base-200 rounded-lg transition-colors">
                                    <div className="avatar placeholder">
                                        <div className="bg-accent text-accent-content rounded-full w-12">
                                            <span>🔊</span>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">Shared playlist with Alex</p>
                                        <p className="text-sm text-base-content/70">1 day ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-xl mb-4">Top Genres</h2>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">Pop</span>
                                        <span className="text-sm text-base-content/70">45%</span>
                                    </div>
                                    <progress className="progress progress-primary w-full" value="45" max="100"></progress>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">Rock</span>
                                        <span className="text-sm text-base-content/70">30%</span>
                                    </div>
                                    <progress className="progress progress-secondary w-full" value="30" max="100"></progress>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">Electronic</span>
                                        <span className="text-sm text-base-content/70">15%</span>
                                    </div>
                                    <progress className="progress progress-accent w-full" value="15" max="100"></progress>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium">Jazz</span>
                                        <span className="text-sm text-base-content/70">10%</span>
                                    </div>
                                    <progress className="progress progress-info w-full" value="10" max="100"></progress>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
