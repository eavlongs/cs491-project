'use server'
import { ActionResponse, ApiResponse, Hall, Movie, Schedule } from '@/app/types'
import { apiUrl } from '@/app/utils'
import { revalidatePath } from 'next/cache'

export async function getSchedulesFromAllHalls(startDate: Date) {
    const urlSearchParams = new URLSearchParams()

    urlSearchParams.append('start_date', startDate.toLocaleDateString('en-CA'))

    const response = await fetch(
        `${apiUrl}/movies/schedules/all-halls?${urlSearchParams}`,
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

    console.log(
        'getScheduleFromAllHalls',
        `${apiUrl}/movies/schedules/all-halls?${urlSearchParams}`,
        json.data?.schedules
    )

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

    if (!response.ok || !json.success || !json.data) {
        return []
    }

    return json.data.halls
}

export async function assignSchedule(
    movie: Movie,
    hall: Hall,
    startTime: Date,
    token: string
): Promise<ActionResponse> {
    const response = await fetch(`${apiUrl}/movies/schedules`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            movie_id: movie.id,
            hall_id: hall.id,
            start_time: startTime.toISOString(),
        }),
    })

    const json: ApiResponse = await response.json()

    if (!response.ok || !json.success) {
        return { success: false, message: json.message }
    }

    revalidatePath('/admin/schedule')
    return { success: true, message: json.message }
}
