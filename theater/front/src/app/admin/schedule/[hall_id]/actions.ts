import { ApiResponse, Hall, Movie, Schedule } from '@/app/types'
import { apiUrl } from '@/app/utils'

export async function getSchedule(id: string, startDate: Date, token: string) {
    const response = await fetch(
        `${apiUrl}/movies/schedules/${id}?start_date=${startDate.toISOString()}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    const json: ApiResponse<{ schedule: Schedule; hall: Hall }> =
        await response.json()

    console.log(json)

    if (!response.ok || !json.success || !json.data) {
        return null
    }

    return json.data
}
