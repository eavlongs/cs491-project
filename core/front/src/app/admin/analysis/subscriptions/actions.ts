import { ApiResponse, MovieSubscription } from '@/app/types'
import { subscriptionApiUrl } from '@/app/utils'

export async function getMovieSubscriptions() {
    const response = await fetch(`${subscriptionApiUrl}/subscriptions`)

    const json: ApiResponse<{ subscriptions: MovieSubscription[] }> =
        await response.json()

    if (!response.ok || !json.success || !json.data) {
        return []
    }

    return json.data.subscriptions
}
