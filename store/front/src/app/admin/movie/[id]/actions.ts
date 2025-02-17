import { ApiResponse, Movie } from '@/app/types'
import { apiUrl } from '@/app/utils'

export async function getMovie(id: string, token: string) {
    const response = await fetch(`${apiUrl}/movies/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
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
