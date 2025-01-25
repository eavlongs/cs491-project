import { ApiResponse, Hall, Movie, Schedule, Seat } from '@/app/types'
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
