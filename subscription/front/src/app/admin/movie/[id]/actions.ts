import { ApiResponse, Movie } from '@/app/types'
import { apiUrl } from '@/app/utils'

export async function getMovie(id: string) {
    const response = await fetch(`${apiUrl}/movies/${id}`)

    const json: ApiResponse<{ movie: Movie }> = await response.json()

    if (!json.success) {
        return null
    }

    return json.data?.movie
}
