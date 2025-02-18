import { ApiResponse, Movie } from '@/app/types'
import { apiUrl } from '@/app/utils'

export async function getMovieByMbId(mb_id: string) {
    const response = await fetch(`${apiUrl}/movies/mb_id/${mb_id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const json: ApiResponse<{ movie: Movie }> = await response.json()

    console.log(json)
    if (!json.success || !json.data?.movie) {
        return null
    }

    return json.data?.movie
}
