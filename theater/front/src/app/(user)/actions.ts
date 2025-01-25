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
