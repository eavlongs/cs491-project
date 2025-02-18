import { ApiResponse, Movie } from '@/app/types'
import { apiUrl } from '@/app/utils'

export async function getMovieByMbId(id: string) {
    const response = await fetch(`${apiUrl}/movies/mbid/${id}`, {
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
