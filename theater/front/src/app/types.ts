export enum JwtTokenOptions {
    // for cookie of next auth
    AccessTokenExpireTimeInSeconds = 60 * 60 * 24, // 1 day

    // TODO: remove if u want this is for test purpose
    // RefreshTokenExpireTimeInMs = 5 * 60 * 1000,
    // AccessTokenExpireTimeInSeconds = 30 * 1000,
}

export type JwtToken = {
    accessToken: string
}

export type User = {
    id: string
    first_name?: string
    last_name?: string
    email: string
    is_admin: boolean
}

export type ApiResponse<T = any> = {
    success: boolean
    message: string
    error?: any
    data?: T
}

export type Movie = {
    id: string
    genres: string
    age_restriction: string
    title: string
    description: string
    poster_url: string
    directors: string
    cast: string
    release_date: string
    movie_duration: number
    trailer_url: string
    mb_id: string
}

export type Schedule = {
    id: string
    movie_id: string
    hall_id: string
    start_time: Date
    end_time: Date
}

export type Hall = {
    id: string
    name: string
    seat_price: number
}

export type Seat = {
    id: string
    row: number
    column: number
    hall_id: string
    code: string
}

export type Ticket = {
    id: string
    schedule_id: string
    seat_id: string
    payment_id: string
    price: number
    created_at: Date
}

export type Payment = {
    id: string
    user_id: string
    card_number: string
    amount: number
    created_at: Date
}

export type ActionResponse = {
    success: boolean
    message: string
}

export type Prettify<T> = {
    [K in keyof T]: T[K]
}
