'use client';

import { usePathname } from 'next/navigation';

export default function ConditionalHeader() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return (
    <>
      <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
        MusicShare
      </h1>
      <h2 className="text-xl text-center text-white/80 italic mb-12">
        Connect Through Sound
      </h2>
    </>
  );
}