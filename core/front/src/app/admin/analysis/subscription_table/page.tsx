'use client'

import { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

interface Subscription {
    id: number
    name: string
    email: string
    price: number
    subscribedAt: string
    expiresAt: string
}

export default function SubscriptionsPage() {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSubscriptions = async () => {
            // Simulating API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const data: Subscription[] = [
                {
                    id: 1,
                    name: 'Hall A',
                    email: 'naruto@gmail.com',
                    price: 3.5,
                    subscribedAt: '17/02/2025',
                    expiresAt: '24/02/2025',
                },
                {
                    id: 2,
                    name: 'IMAX',
                    email: 'hello@gmail.com',
                    price: 5.5,
                    subscribedAt: '17/02/2025',
                    expiresAt: '24/02/2025',
                },
                {
                    id: 3,
                    name: 'VIP',
                    email: 'mouse@yahoo.com',
                    price: 8.5,
                    subscribedAt: '17/02/2025',
                    expiresAt: '24/02/2025',
                },
            ]
            setSubscriptions(data)
            setLoading(false)
        }

        fetchSubscriptions()
    }, [])

    if (loading) {
        return <div className="container mx-auto py-10">Loading...</div>
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-xl font-bold mb-6">Subscribe</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Subscribed at</TableHead>
                        <TableHead>Expires at</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subscriptions.map((sub) => (
                        <TableRow key={sub.id}>
                            <TableCell>{sub.id}</TableCell>
                            <TableCell>{sub.name}</TableCell>
                            <TableCell>{sub.email}</TableCell>
                            <TableCell>${sub.price.toFixed(2)}</TableCell>
                            <TableCell>{sub.subscribedAt}</TableCell>
                            <TableCell>{sub.expiresAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
