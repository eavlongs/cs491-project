'use client'

// import { signOut, useSession } from "next-auth/react"
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

export function LogOut() {
    //   const { data: session } = useSession()

    return (
        <div className="flex items-center gap-4">
            {/* {session?.user?.name && <span className="text-sm font-medium">{session.user.name}</span>} */}
            <Button
                variant="destructive"
                onClick={async () =>
                    signOut({
                        callbackUrl: '/',
                        redirect: true,
                    })
                }
            >
                Log Out
            </Button>
        </div>
    )
}
