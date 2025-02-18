import { ActionResponse, ApiResponse } from '@/app/types'
import { apiUrl } from '@/app/utils'

export async function buyOrRentMovie(
    id: string,
    cardNumber: string,
    token: string,
    type: 'buy' | 'rent'
): Promise<ActionResponse> {
    const response = await fetch(`${apiUrl}/movies/${id}/${type}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            card_number: cardNumber,
        }),
    })

    const json: ApiResponse = await response.json()

    if (!response.ok || !json.success) {
        return {
            success: false,
            message: json.message ?? 'Failed to ' + type + ' movie',
        }
    }

    return {
        success: true,
        message: json.message,
    }
}
