'use client'

import { MovieSale } from '@/app/types'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

export default function MovieSales({ sales }: { sales: MovieSale[] }) {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-xl font-bold mb-6">Movies Sold</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Bought at</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sales.map((sale) => (
                        <TableRow key={sale.id}>
                            <TableCell>{sale.id}</TableCell>
                            <TableCell>{sale.title}</TableCell>
                            <TableCell>{sale.user_name}</TableCell>
                            <TableCell>{sale.user_email}</TableCell>
                            <TableCell>${sale.amount.toFixed(2)}</TableCell>
                            <TableCell>
                                {new Date(sale.created_at).toLocaleString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
