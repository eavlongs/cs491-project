import LoggedInOnly from '@/components/custom/LoggedInOnly'
import LogInButton from '@/components/custom/LogInButton'
import { LogOut } from '@/components/custom/LogOut'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { ReactNode } from 'react'

interface LayoutProps {
    children: Readonly<ReactNode>
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Link href="/">Core System</Link>
                <div className="ml-auto">
                    <LoggedInOnly otherwise={<LogInButton />}>
                        <LogOut />
                    </LoggedInOnly>
                </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 py-6 px-10 items-center">
                {children}
            </div>
        </>
    )
}
