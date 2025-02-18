'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import { MovieSubscription } from '@/app/types'

export default function MovieSubscriptions({
    subscriptions,
}: {
    subscriptions: MovieSubscription[]
}) {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-xl font-bold mb-6">Movie Subscriptions</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Subscribed at</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {subscriptions.map((sub) => (
                        <TableRow key={sub.id}>
                            <TableCell>{sub.id}</TableCell>
                            <TableCell>{sub.user_name}</TableCell>
                            <TableCell>{sub.user_email}</TableCell>
                            <TableCell>${sub.amount.toFixed(2)}</TableCell>
                            <TableCell>
                                {new Date(sub.created_at).toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
