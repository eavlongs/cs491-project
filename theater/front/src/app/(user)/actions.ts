import { ApiResponse, Movie } from '@/app/types'
import { apiUrl } from '@/app/utils'

export async function getMovies() {
    const response = await fetch(`${apiUrl}/movies`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const json: ApiResponse<{ movies: Movie[] }> = await response.json()

    if (!json.success) {
        return []
    }

    return json.data?.movies || []
}

export async function getPlayingMovies(startDate: Date) {
    const urlSearchParam = new URLSearchParams({
        start_date: startDate.toLocaleString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'Asia/Phnom_Penh',
        }),
    })
    const response = await fetch(`${apiUrl}/movies/playing?${urlSearchParam}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const json: ApiResponse<{ movies: Movie[] }> = await response.json()

    if (!json.success) {
        return []
    }

    return json.data?.movies || []
}
