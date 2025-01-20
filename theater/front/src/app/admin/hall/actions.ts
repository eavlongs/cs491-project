'use server'

import { ActionResponse, ApiResponse } from '@/app/types'
import { apiUrl } from '@/app/utils'
import { revalidatePath } from 'next/cache'

type CreateHall = {
    name: string
    seat_price: number
}

export async function createHall(
    values: CreateHall,
    token: string
): Promise<ActionResponse> {
    const resposne = await fetch(`${apiUrl}/halls`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
    })

    const json: ApiResponse = await resposne.json()

    if (!resposne.ok || !json.success) {
        return {
            success: false,
            message: json.message || 'Failed to create hall',
        }
    }

    revalidatePath('/admin/hall')

    return {
        success: true,
        message: 'Hall created',
    }
}

export async function editHall(
    id: string,
    values: CreateHall,
    token: string
): Promise<ActionResponse> {
    const resposne = await fetch(`${apiUrl}/halls/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
    })

    const json: ApiResponse = await resposne.json()

    if (!resposne.ok || !json.success) {
        return {
            success: false,
            message: json.message || 'Failed to edit hall',
        }
    }

    revalidatePath('/admin/hall')

    return {
        success: true,
        message: 'Hall edited',
    }
}

export async function deleteHall(
    id: string,
    token: string
): Promise<ActionResponse> {
    const resposne = await fetch(`${apiUrl}/halls/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    const json: ApiResponse = await resposne.json()

    if (!resposne.ok || !json.success) {
        return {
            success: false,
            message: json.message || 'Failed to delete hall',
        }
    }

    revalidatePath('/admin/hall')

    return {
        success: true,
        message: 'Hall deleted',
    }
}
