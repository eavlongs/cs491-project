'use client'
import { signOut } from 'next-auth/react'
import { Button } from '../ui/button'

export function LogOut() {
    return (
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
    )
}
