import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { ApiResponse } from './app/types'
import { apiUrl } from './app/utils'

export default withAuth(
    async function middleware(request) {
        const pathname = request.nextUrl.pathname

        if (
            (pathname === '/' ||
                pathname.startsWith('/movie') ||
                pathname === '/subscribe-movie') &&
            !request.nextauth.token
        ) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        if (
            pathname.startsWith('/admin') &&
            !request.nextauth.token?.user.is_admin
        ) {
            return NextResponse.rewrite(new URL('/not-found', request.url))
        }

        let subscriptionIsActive = false
        const response = await fetch(`${apiUrl}/subscription/check`, {
            headers: {
                Authorization: `Bearer ${request.nextauth.token!.token}`,
            },
        })

        const json: ApiResponse = await response.json()

        if (response.ok && json.success) {
            subscriptionIsActive = true
        }

        if (pathname === '/subscribe-movie' && subscriptionIsActive) {
            return NextResponse.redirect(new URL('/', request.url))
        }

        if (pathname === '/' || pathname.startsWith('/movie')) {
            if (request.nextauth.token?.user.is_admin) {
                return NextResponse.next()
            }

            if (!subscriptionIsActive) {
                return NextResponse.redirect(
                    new URL('/subscribe-movie', request.url)
                )
            }
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
    matcher: ['/'],
}
