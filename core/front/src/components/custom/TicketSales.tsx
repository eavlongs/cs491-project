'use client'

import { TicketSale } from '@/app/types'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

export default function TicketSales({ sales }: { sales: TicketSale[] }) {
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-xl font-bold mb-6">Ticket Sales</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Hall</TableHead>
                        <TableHead>Seats</TableHead>
                        <TableHead>Show time</TableHead>
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
                            <TableCell>{sale.hall}</TableCell>
                            <TableCell>{sale.seats.join(', ')}</TableCell>
                            <TableCell>
                                {new Date(sale.showtime).toLocaleString()}
                            </TableCell>
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
