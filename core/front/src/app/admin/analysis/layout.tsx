import type React from 'react'
import { Inter } from 'next/font/google'
import Link from 'next/link'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <nav className="border-b">
                    <div className="container mx-auto flex gap-6 py-4">
                        <Link
                            href="/subscriptions"
                            className="hover:text-primary"
                        >
                            Subscriptions
                        </Link>
                        <Link href="/rentals" className="hover:text-primary">
                            Rentals
                        </Link>
                        <Link href="/purchases" className="hover:text-primary">
                            Purchases
                        </Link>
                        <Link href="/tickets" className="hover:text-primary">
                            Tickets
                        </Link>
                    </div>
                </nav>
                <main>{children}</main>
            </body>
        </html>
    )
}
