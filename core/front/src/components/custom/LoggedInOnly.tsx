import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'

export default async function LoggedInOnly({
    children,
    otherwise,
}: {
    children: ReactNode
    otherwise?: ReactNode | null
}) {
    if (!otherwise) {
        otherwise = null
    }

    const session = await getServerSession()

    return session && session.user ? children : otherwise
}
