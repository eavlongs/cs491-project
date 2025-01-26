import {
    ActionResponse,
    ApiResponse,
    Hall,
    Movie,
    Schedule,
    Seat,
} from '@/app/types'
import { apiUrl } from '@/app/utils'

export async function getMovieScheduleDetail(
    schedule_id: string,
    token: string
) {
    const response = await fetch(`${apiUrl}/movies/seats/${schedule_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const json: ApiResponse<{
        schedule: Schedule
        seats: (Seat & { is_available: boolean })[]
        movie: Movie
        hall: Hall
    }> = await response.json()

    if (!response.ok || !json.success || !json.data) {
        return null
    }

    return json.data
}

export async function buyTickets(
    schedule_id: string,
    seat_ids: string[],
    cardNumber: string,
    token: string
): Promise<ActionResponse> {
    const response = await fetch(
        `${apiUrl}/movies/schedules/${schedule_id}/buy`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                seats: seat_ids,
                card_number: cardNumber,
            }),
        }
    )

    const json: ApiResponse<{
        schedule: Schedule
        seats: (Seat & { is_available: boolean })[]
        movie: Movie
        hall: Hall
    }> = await response.json()

    if (!response.ok || !json.success) {
        return {
            success: false,
            message: json.message,
        }
    }

    return {
        success: true,
        message: 'Tickets bought successfully',
    }
}
