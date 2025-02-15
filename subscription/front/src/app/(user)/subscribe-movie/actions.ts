import { ActionResponse, ApiResponse } from '@/app/types'
import { apiUrl } from '@/app/utils'

export async function subscribeMovieService(
    token: string,
    cardNumber: string
): Promise<ActionResponse> {
    const response = await fetch(`${apiUrl}/subscribe`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            card_number: cardNumber,
        }),
    })

    const json: ApiResponse = await response.json()

    if (!response.ok || !json.success) {
        return {
            success: false,
            message: json.message,
        }
    }

    return {
        success: true,
        message: json.message,
    }
}
