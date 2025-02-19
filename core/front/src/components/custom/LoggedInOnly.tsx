import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import { ReactNode } from 'react'

export default async function LoggedInOnly({
    children,
    admin = false,
    otherwise,
}: {
    children: ReactNode
    admin?: boolean
    otherwise?: ReactNode | null
}) {
    if (!otherwise) {
        otherwise = null
    }

    const session = await getServerSession(authOptions)

    if (session && session.user) {
        if (!admin) return children
        return session.user.is_admin ? children : otherwise
    }
    return otherwise
}
