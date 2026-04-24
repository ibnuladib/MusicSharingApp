"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hasToken = document.cookie.includes("access_token=");
    setIsLoggedIn(hasToken);
  }, []);

  const handleLogout = () => {
    document.cookie = "access_token=; path=/; max-age=0";
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">Music Sharing App</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {!isLoggedIn ? (
            <>
              <li><Link href="/login">Login</Link></li>
              <li><Link href="/registration">Register</Link></li>
            </>
          ) : (
            <>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
