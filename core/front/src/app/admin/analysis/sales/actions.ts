import { ApiResponse, MovieSale } from '@/app/types'
import { storeApiUrl } from '@/app/utils'

export async function getMovieSales() {
    const resposne = await fetch(`${storeApiUrl}/movies/sales`)

    const json: ApiResponse<{ sales: MovieSale[] }> = await resposne.json()

    if (!resposne.ok || !json.success || !json.data) {
        return []
    }

    return json.data.sales
}
