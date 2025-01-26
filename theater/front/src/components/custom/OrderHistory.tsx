import { Hall, Movie, Schedule, Ticket } from '@/app/types'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

// Combining relevant fields from the provided types
type OrderHistoryItem = {
    movieTitle: string
    hallName: string
    seats: string
    moviePlaytime: Date
    dateBought: Date
}

// Sample data for demonstration
const orderHistory: OrderHistoryItem[] = [
    {
        movieTitle: 'Inception',
        hallName: 'Hall A',
        seats: 'A1, A2, A3',
        moviePlaytime: new Date('2023-06-15T20:00:00'),
        dateBought: new Date('2023-06-10T14:30:00'),
    },
    {
        movieTitle: 'The Dark Knight',
        hallName: 'Hall B',
        seats: 'C5, C6',
        moviePlaytime: new Date('2023-06-18T19:30:00'),
        dateBought: new Date('2023-06-12T10:15:00'),
    },
    {
        movieTitle: 'Interstellar',
        hallName: 'Hall C',
        seats: 'B3, B4, B5, B6',
        moviePlaytime: new Date('2023-06-20T21:00:00'),
        dateBought: new Date('2023-06-15T16:45:00'),
    },
]

// Helper function to format date and time
const formatDateTime = (date: Date): string => {
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export default function OrderHistory({
    payments,
}: {
    payments: ({
        hall: Hall
        movie: Movie
        schedule: Schedule
        seats: string[]
    } & Pick<Ticket, 'id' | 'price' | 'created_at'>)[]
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Movie</TableHead>
                    <TableHead>Hall</TableHead>
                    <TableHead>Seats</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Playtime</TableHead>
                    <TableHead>Date Bought</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {payments.map((payment) => (
                    <TableRow key={payment.id}>
                        <TableCell className="font-medium">
                            {payment.movie.title}
                        </TableCell>
                        <TableCell>{payment.hall.name}</TableCell>
                        <TableCell>{payment.seats.join(', ')}</TableCell>
                        <TableCell>${payment.price.toFixed(2)}</TableCell>
                        <TableCell>
                            {formatDateTime(
                                new Date(payment.schedule.start_time)
                            )}
                        </TableCell>
                        <TableCell>
                            {formatDateTime(new Date(payment.created_at))}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
