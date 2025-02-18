'use client'

import { MovieRenting } from '@/app/types'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

export default function MovieRentings({
    rentings,
}: {
    rentings: MovieRenting[]
}) {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-xl font-bold mb-6">Movies Rented</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Rented at</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rentings.map((renting) => (
                        <TableRow key={renting.id}>
                            <TableCell>{renting.id}</TableCell>
                            <TableCell>{renting.title}</TableCell>
                            <TableCell>{renting.user_name}</TableCell>
                            <TableCell>{renting.user_email}</TableCell>
                            <TableCell>${renting.amount.toFixed(2)}</TableCell>
                            <TableCell>
                                {new Date(renting.created_at).toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
