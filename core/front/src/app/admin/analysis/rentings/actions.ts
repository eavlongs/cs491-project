import { ApiResponse, MovieSale } from '@/app/types'
import { storeApiUrl } from '@/app/utils'

export async function getMovieRentings() {
    const resposne = await fetch(`${storeApiUrl}/movies/rentings`)

    const json: ApiResponse<{ rentings: MovieSale[] }> = await resposne.json()

    if (!resposne.ok || !json.success || !json.data) {
        return []
    }

    return json.data.rentings
}
