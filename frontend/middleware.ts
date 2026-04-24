import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = [
    '/dashboard',
    '/createupload',
    '/updateupload',
    '/profile', 
]

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname

    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))

    if (isProtectedRoute) {
        const accessToken = request.cookies.get('access_token')?.value

        if (!accessToken) {
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
