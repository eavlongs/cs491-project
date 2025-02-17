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

interface Ticket {
    id: number
    title: string
    name: string
    email: string
    hall: string
    seats: string
    showTime: string
    boughtAt: string
}

export default function TicketsPage() {
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTickets = async () => {
            // Simulating API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const data: Ticket[] = [
                {
                    id: 1,
                    title: 'Avatar 3',
                    name: 'Carol Brown',
                    email: 'carol@gmail.com',
                    hall: 'IMAX 1',
                    seats: 'A1, A2',
                    showTime: '19:30',
                    boughtAt: '17/02/2025',
                },
                {
                    id: 2,
                    title: 'Dune 2',
                    name: 'David Lee',
                    email: 'david@gmail.com',
                    hall: 'Hall A',
                    seats: 'B3, B4',
                    showTime: '20:00',
                    boughtAt: '17/02/2025',
                },
                {
                    id: 3,
                    title: 'Oppenheimer',
                    name: 'Eva Green',
                    email: 'eva@gmail.com',
                    hall: 'VIP',
                    seats: 'C5, C6',
                    showTime: '18:45',
                    boughtAt: '18/02/2025',
                },
            ]
            setTickets(data)
            setLoading(false)
        }

        fetchTickets()
    }, [])

    if (loading) {
        return <div className="container mx-auto py-10">Loading...</div>
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-xl font-bold mb-6">Ticket Receipts</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
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
                    {tickets.map((ticket) => (
                        <TableRow key={ticket.id}>
                            <TableCell>{ticket.id}</TableCell>
                            <TableCell>{ticket.title}</TableCell>
                            <TableCell>{ticket.name}</TableCell>
                            <TableCell>{ticket.email}</TableCell>
                            <TableCell>{ticket.hall}</TableCell>
                            <TableCell>{ticket.seats}</TableCell>
                            <TableCell>{ticket.showTime}</TableCell>
                            <TableCell>{ticket.boughtAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
