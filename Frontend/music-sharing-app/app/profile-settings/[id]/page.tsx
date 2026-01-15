'use client';

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { isLoggedIn, getUserId, clearAuthCookies } from "../../utils/cookies";

export default function ProfileSettingsPage() {
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentProfilePic, setCurrentProfilePic] = useState<string | null>(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showFinalConfirm, setShowFinalConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const loggedIn = isLoggedIn();
        const storedUserId = getUserId();

        if (!loggedIn || !storedUserId) {
            router.push('/login');
            return;
        }

        if (storedUserId !== userId) {
            router.push(`/profile-settings/${storedUserId}`);
            return;
        }

        fetchUserProfile();
    }, [router, userId]);

    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/consumer/dbshowID/${userId}`
            );
            if (response.data && response.data.profilePicture) {
                setCurrentProfilePic(`${process.env.NEXT_PUBLIC_API_URL}/uploads/${response.data.profilePicture}`);
            }
        } catch (err) {
            console.error("Error fetching user profile:", err);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile));
            setError(null);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            setError("Please select a file to upload");
            return;
        }

        if (!userId) {
            setError("User ID not found");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);
            setError(null);
            setSuccessMessage(null);

            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/consumer/upload-profile/${userId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setSuccessMessage("Profile picture updated successfully!");
            fetchUserProfile();
            setFile(null);
            setPreviewUrl(null);

            setTimeout(() => setSuccessMessage(null), 3000);

        } catch (err: any) {
            console.error("Error uploading file:", err);
            setError(err.response?.data?.message || "Failed to upload profile picture");
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!userId) return;

        try {
            setDeleting(true);
            setError(null);

            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/consumer/dbdelete/${userId}`
            );

            clearAuthCookies();
            router.push('/login');

        } catch (err: any) {
            console.error("Error deleting account:", err);
            setError(err.response?.data?.message || "Failed to delete account");
            setDeleting(false);
            setShowDeleteModal(false);
            setShowFinalConfirm(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <div className="navbar bg-base-100 shadow-lg">
                <div className="flex-1">
                    <button
                        onClick={() => router.push(`/dashboard/${userId}`)}
                        className="btn btn-ghost text-xl">
                        ← Back to Dashboard
                    </button>
                </div>
                <div className="flex-none">
                    <span className="text-lg font-semibold">⚙️ Profile Settings</span>
                </div>
            </div>

            <div className="container mx-auto p-6 max-w-lg space-y-6">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-6 justify-center">Update Profile Picture</h2>

                        <div className="flex flex-col items-center gap-6 mb-8">
                            <div className="avatar placeholder">
                                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    {(previewUrl || currentProfilePic) ? (
                                        <img src={previewUrl || currentProfilePic || ""} alt="Profile" />
                                    ) : (
                                        <div className="bg-neutral text-neutral-content w-32 rounded-full flex items-center justify-center">
                                            <span className="text-3xl">?</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {(previewUrl || currentProfilePic) && (
                                <p className="text-sm text-base-content/70">
                                    {previewUrl ? "Preview" : "Current Picture"}
                                </p>
                            )}
                        </div>

                        <form onSubmit={handleUpload} className="flex flex-col gap-4">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Select Image File</span>
                                </label>
                                <input
                                    type="file"
                                    className="file-input file-input-bordered file-input-primary w-full"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>

                            {error && (
                                <div className="alert alert-error shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            {successMessage && (
                                <div className="alert alert-success shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{successMessage}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-4"
                                disabled={uploading || !file}
                            >
                                {uploading ? <span className="loading loading-spinner"></span> : "Update Picture"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl border-2 border-error">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-4 text-error justify-center">Danger Zone</h2>
                        <p className="text-center text-base-content/70 mb-4">
                            Deleting your account is permanent and cannot be undone. All your data, including likes and comments, will be removed.
                        </p>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="btn btn-error w-full"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg text-error">⚠️ Delete Account?</h3>
                        <p className="py-4">
                            Are you absolutely sure you want to delete your account? This action cannot be undone.
                        </p>
                        <div className="modal-action">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="btn btn-ghost"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setShowFinalConfirm(true);
                                }}
                                className="btn btn-warning"
                            >
                                Yes, I'm Sure
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => setShowDeleteModal(false)}></div>
                </div>
            )}

            {showFinalConfirm && (
                <div className="modal modal-open">
                    <div className="modal-box border-4 border-error">
                        <h3 className="font-bold text-lg text-error">🚨 Final Confirmation</h3>
                        <p className="py-4 font-semibold">
                            This is your last chance! Deleting your account will:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mb-4">
                            <li>Permanently delete your profile</li>
                            <li>Remove all your likes</li>
                            <li>Remove all your comments</li>
                            <li>Log you out immediately</li>
                        </ul>
                        <p className="text-error font-bold">This cannot be undone!</p>
                        <div className="modal-action">
                            <button
                                onClick={() => setShowFinalConfirm(false)}
                                className="btn btn-ghost"
                                disabled={deleting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                className="btn btn-error"
                                disabled={deleting}
                            >
                                {deleting ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete Forever'
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="modal-backdrop" onClick={() => !deleting && setShowFinalConfirm(false)}></div>
                </div>
            )}
        </div>
    );
}
