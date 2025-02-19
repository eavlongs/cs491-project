import Link from 'next/link'
import { Button } from '../ui/button'

export function GoToAdminDashboardButton() {
    return (
        <Link href="/admin">
            <Button>Admin Dashboard</Button>
        </Link>
    )
}
