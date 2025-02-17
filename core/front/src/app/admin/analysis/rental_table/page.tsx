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

interface Rental {
    id: number
    name: string
    email: string
    price: number
    rentedAt: string
    expiresAt: string
}

export default function RentalsPage() {
    const [rentals, setRentals] = useState<Rental[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchRentals = async () => {
            // Simulating API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const data: Rental[] = [
                {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@gmail.com',
                    price: 4.99,
                    rentedAt: '17/02/2025',
                    expiresAt: '19/02/2025',
                },
                {
                    id: 2,
                    name: 'Jane Smith',
                    email: 'jane@gmail.com',
                    price: 4.99,
                    rentedAt: '17/02/2025',
                    expiresAt: '19/02/2025',
                },
                {
                    id: 3,
                    name: 'Alice Johnson',
                    email: 'alice@gmail.com',
                    price: 5.99,
                    rentedAt: '18/02/2025',
                    expiresAt: '20/02/2025',
                },
            ]
            setRentals(data)
            setLoading(false)
        }

        fetchRentals()
    }, [])

    if (loading) {
        return <div className="container mx-auto py-10">Loading...</div>
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-xl font-bold mb-6">Rent</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Rented at</TableHead>
                        <TableHead>Expires at</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rentals.map((rental) => (
                        <TableRow key={rental.id}>
                            <TableCell>{rental.id}</TableCell>
                            <TableCell>{rental.name}</TableCell>
                            <TableCell>{rental.email}</TableCell>
                            <TableCell>${rental.price.toFixed(2)}</TableCell>
                            <TableCell>{rental.rentedAt}</TableCell>
                            <TableCell>{rental.expiresAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
