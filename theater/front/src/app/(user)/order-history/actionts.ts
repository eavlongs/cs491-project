import { ApiResponse, Hall, Movie, Schedule, Ticket } from '@/app/types'
import { apiUrl } from '@/app/utils'

export async function getOrderHistory(token: string): Promise<
    ({
        hall: Hall
        movie: Movie
        schedule: Schedule
        seats: string[]
    } & Pick<Ticket, 'id' | 'price' | 'created_at'>)[]
> {
    const response = await fetch(`${apiUrl}/order-history`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })

    const json: ApiResponse<{
        payments: ({
            hall: Hall
            movie: Movie
            schedule: Schedule
            seats: string[]
        } & Pick<Ticket, 'id' | 'price' | 'created_at'>)[]
    }> = await response.json()

    if (!response.ok || !json.success || !json.data) {
        return []
    }

    return json.data.payments!
}
