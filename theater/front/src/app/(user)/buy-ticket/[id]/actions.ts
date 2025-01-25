import { ApiResponse, Hall, Movie, Schedule } from '@/app/types'
import { apiUrl } from '@/app/utils'

export async function getMovie(id: string) {
    const response = await fetch(`${apiUrl}/movies/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const json: ApiResponse<{ movie: Movie }> = await response.json()
    if (!response.ok || !json.success || !json.data) {
        return null
    }

    return json.data.movie
}

export async function getMovieSchedules(id: string, startDate: Date) {
    const urlSearchParams = new URLSearchParams({
        movie_id: id,
        start_date: startDate.toLocaleDateString('en-CA'),
    })

    const response = await fetch(
        `${apiUrl}/movies/schedules?${urlSearchParams}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )

    const json: ApiResponse<{
        schedules: {
            schedule: Schedule
            hall: Hall
        }[]
    }> = await response.json()

    if (!response.ok || !json.success || !json.data) {
        return []
    }

    return json.data.schedules
}
