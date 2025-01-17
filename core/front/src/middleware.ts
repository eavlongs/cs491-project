import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(request) {
        const pathname = request.nextUrl.pathname

        console.log(request.nextauth.token)
        console.log(request.nextauth.token?.user.is_admin)
        if (
            pathname.startsWith('/admin') &&
            !request.nextauth.token?.user.is_admin
        ) {
            return NextResponse.rewrite(new URL('/not-found', request.url))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                // return true or false, if true = authenticated
                return !!token
            },
        },
    }
)

export const config = {
    matcher: ['/admin/:path*'],
}
