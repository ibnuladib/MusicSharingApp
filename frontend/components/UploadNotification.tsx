'use client';

import { useEffect } from 'react';
import Pusher from 'pusher-js';

export default function UploadNotification() {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Use environment variables
        const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY;
        const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

        if (!pusherKey || !pusherCluster) {
            console.error('Pusher configuration missing');
            return;
        }

        const pusher = new Pusher(pusherKey, {
            cluster: pusherCluster,
        });

        const channel = pusher.subscribe('upload-channel');
        channel.bind('new-upload', (data: { message: string }) => {
            // Create notification using DOM manipulation for simple global toasts with DaisyUI
            const toastId = 'upload-toast-' + Date.now();
            const toastContainer = document.getElementById('toast-container') || createToastContainer();

            const toast = document.createElement('div');
            toast.id = toastId;
            toast.className = 'alert alert-info mb-2 text-white'; // DaisyUI alert class
            toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>${data.message}</span>
      `;

            toastContainer.appendChild(toast);

            setTimeout(() => {
                const t = document.getElementById(toastId);
                if (t) t.remove();
            }, 5000); // Remove after 5 seconds
        });

        return () => {
            pusher.unsubscribe('upload-channel');
        };
    }, []);

    return null; // This component doesn't render anything itself
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast toast-top toast-end z-50'; // DaisyUI toast container
    document.body.appendChild(container);
    return container;
}
