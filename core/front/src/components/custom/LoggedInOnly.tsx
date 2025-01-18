'use client'
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

export default function LoggedInOnly({
    children,
    otherwise,
}: {
    children: ReactNode
    otherwise?: ReactNode | null
}) {
    if (!otherwise) {
        otherwise = null
    }

    const session = useSession()

    return session.data && session.data.user ? children : otherwise
}
