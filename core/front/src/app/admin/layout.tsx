import { AppSidebar } from '@/components/custom/app-sidebar'
import { Separator } from '@/components/ui/separator'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': '19rem',
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                    <SidebarTrigger className="mr-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Link href="/admin">Logo</Link>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
