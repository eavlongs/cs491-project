import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFoundCatchAll() {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-900">404</h1>
            <p className="text-lg text-gray-600">Page not found</p>
            {/* back to home page */}
            <Link href="/">
                <Button>Back to home</Button>
            </Link>
        </div>
    )
}
