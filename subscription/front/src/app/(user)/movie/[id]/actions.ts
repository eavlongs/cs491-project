'use server'

import { ApiResponse } from '@/app/types'
import { apiUrl } from '@/app/utils'
import { revalidatePath } from 'next/cache'

export async function rateMovieAction(
    id: string,
    rating: number,
    token: string
) {
    const response = await fetch(`${apiUrl}/movies/${id}/rate`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating }),
    })

    const json: ApiResponse = await response.json()

    if (!response.ok) {
        return false
    }

    revalidatePath(`/movie/${id}`)

    return json.success
}
