'use server'
import { ApiResponse, Hall, Movie, Schedule } from '@/app/types'
import { apiUrl } from '@/app/utils'

export async function getSchedulesFromAllHalls(startDate: Date) {
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append('start_date', startDate.toISOString().split('T')[0])

    const endDate = new Date(
        new Date(startDate).setDate(startDate.getDate() + 1)
    )
    urlSearchParams.append('end_date', endDate.toISOString().split('T')[0])
    const response = await fetch(
        `${apiUrl}/movies/schedule/all-halls?${urlSearchParams}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )

    const json: ApiResponse<{
        schedules: {
            schedule: Schedule
            hall: Hall
            movie: Movie
        }[]
    }> = await response.json()

    if (!response.ok || !json.success || !json.data) {
        return []
    }

    return json.data.schedules
}

export async function getAllHalls(token: string) {
    const response = await fetch(`${apiUrl}/halls`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })

    const json: ApiResponse<{ halls: Hall[] }> = await response.json()
    console.log(json)

    if (!response.ok || !json.success || !json.data) {
        return []
    }

    return json.data.halls
}
