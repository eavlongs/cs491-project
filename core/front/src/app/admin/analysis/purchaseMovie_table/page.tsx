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

interface Purchase {
    id: number
    title: string
    name: string
    email: string
    price: number
    boughtAt: string
}

export default function PurchasesPage() {
    const [purchases, setPurchases] = useState<Purchase[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPurchases = async () => {
            // Simulating API call
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const data: Purchase[] = [
                {
                    id: 1,
                    title: 'Inception',
                    name: 'Alice Johnson',
                    email: 'alice@gmail.com',
                    price: 14.99,
                    boughtAt: '17/02/2025',
                },
                {
                    id: 2,
                    title: 'The Matrix',
                    name: 'Bob Wilson',
                    email: 'bob@gmail.com',
                    price: 14.99,
                    boughtAt: '17/02/2025',
                },
                {
                    id: 3,
                    title: 'Interstellar',
                    name: 'Charlie Brown',
                    email: 'charlie@gmail.com',
                    price: 16.99,
                    boughtAt: '18/02/2025',
                },
            ]
            setPurchases(data)
            setLoading(false)
        }

        fetchPurchases()
    }, [])

    if (loading) {
        return <div className="container mx-auto py-10">Loading...</div>
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-xl font-bold mb-6">Bought Movies</h1>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Bought at</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {purchases.map((purchase) => (
                        <TableRow key={purchase.id}>
                            <TableCell>{purchase.id}</TableCell>
                            <TableCell>{purchase.title}</TableCell>
                            <TableCell>{purchase.name}</TableCell>
                            <TableCell>{purchase.email}</TableCell>
                            <TableCell>${purchase.price.toFixed(2)}</TableCell>
                            <TableCell>{purchase.boughtAt}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
