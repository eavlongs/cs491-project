import Link from 'next/link'
import { Button } from '../ui/button'

export default function LogInButton() {
    return (
        <Link href="/login">
            <Button>Log In</Button>
        </Link>
    )
}
