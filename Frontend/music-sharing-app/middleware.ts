
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = [
    '/dashboard',
    '/songs',
    '/liked-songs',
    '/my-comments',
    '/profile-settings',
    '/videos',
];

// Define public routes that should redirect to dashboard if already logged in
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if user has authentication cookies
    const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
    const userId = request.cookies.get('userId')?.value;
    const accessToken = request.cookies.get('access_token')?.value;

    // Consider user authenticated if they have all required cookies
    const isAuthenticated = isLoggedIn && userId && accessToken;

    // Check if current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // Check if current path is an auth route (login/register)
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

    // Redirect unauthenticated users trying to access protected routes
    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect authenticated users trying to access login/register to their dashboard
    if (isAuthRoute && isAuthenticated) {
        const dashboardUrl = new URL(`/dashboard/${userId}`, request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc.)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
