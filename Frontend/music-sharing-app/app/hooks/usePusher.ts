import { useEffect, useRef } from 'react';
import Pusher from 'pusher-js';
import toast from 'react-hot-toast';

interface PusherNotification {
    type: 'like' | 'comment';
    songName: string;
    userName: string;
    comment?: string;
}

export const usePusher = (userId: string | null) => {
    const pusherRef = useRef<Pusher | null>(null);

    useEffect(() => {
        if (!userId) return;

        // Initialize Pusher
        pusherRef.current = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '', {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap2',
        });

        // Subscribe to user's private channel
        const channel = pusherRef.current.subscribe(`user-${userId}`);

        // Listen for like notifications
        channel.bind('like-notification', (data: PusherNotification) => {
            toast.success(
                `❤️ ${data.userName} liked "${data.songName}"!`,
                {
                    duration: 4000,
                    position: 'top-right',
                }
            );
        });

        // Listen for comment notifications
        channel.bind('comment-notification', (data: PusherNotification) => {
            toast.success(
                `💬 ${data.userName} commented on "${data.songName}": "${data.comment?.substring(0, 50)}${(data.comment?.length || 0) > 50 ? '...' : ''}"`,
                {
                    duration: 5000,
                    position: 'top-right',
                }
            );
        });

        // Cleanup on unmount
        return () => {
            if (pusherRef.current) {
                pusherRef.current.unsubscribe(`user-${userId}`);
                pusherRef.current.disconnect();
            }
        };
    }, [userId]);

    return pusherRef.current;
};
