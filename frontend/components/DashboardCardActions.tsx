"use client";

import { useRouter } from "next/navigation";
import axios from "axios";

interface DashboardCardActionsProps {
    uploadId: number;
}

function getCookie(name: string): string | undefined {
    if (typeof document === "undefined") return undefined;
    return document.cookie
        .split("; ")
        .find((row) => row.startsWith(`${name}=`))
        ?.split("=")[1];
}

export default function DashboardCardActions({ uploadId }: DashboardCardActionsProps) {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/updateupload/${uploadId}`);
    };

    const confirmDelete = async () => {
        const creatorId = getCookie("creatorId");
        const token = getCookie("access_token");

        if (!token || !creatorId) {
            router.push("/unauthorized");
            return;
        }

        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/creator/${creatorId}/upload/${uploadId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );
            router.refresh();
        } catch (err: any) {
            alert(err.response?.data?.message || "Failed to delete upload");
        }
    };

    const openModal = () => {
        const modal = document.getElementById(`delete_modal_${uploadId}`) as HTMLDialogElement | null;
        if (modal) {
            modal.showModal();
        }
    };

    return (
        <>
            <div className="card-actions justify-end">
                <button
                    className="btn btn-sm btn-info"
                    onClick={handleEdit}
                >
                    Edit
                </button>
                <button
                    className="btn btn-sm btn-error"
                    onClick={openModal}
                >
                    Delete
                </button>
            </div>

            {/* DaisyUI Modal */}
            <dialog id={`delete_modal_${uploadId}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm Deletion</h3>
                    <p className="py-4">Are you sure you want to delete this upload? This action cannot be undone.</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-ghost mr-2">Cancel</button>
                            <button
                                className="btn btn-error"
                                onClick={(e) => {
                                    // prevented default form submission if needed, but onClick runs first
                                    confirmDelete();
                                }}
                            >
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
