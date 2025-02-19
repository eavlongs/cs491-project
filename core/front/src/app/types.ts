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
    id: number
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
    id: number
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
    avg_rating?: number
    number_of_ratings?: number
}

export type TicketSale = {
    user_email: string
    price: number
    showtime: Date
    user_name: string
    created_at: Date
    hall: string
    id: string
    title: string
    seats: string[]
}

export type MovieSale = {
    id: number
    title: string
    user_id: number
    movie_id: number
    user_name: string
    user_email: string
    amount: number
    created_at: string
}

export type MovieRenting = {
    id: number
    title: string
    user_id: number
    movie_id: number
    user_name: string
    user_email: string
    amount: number
    created_at: string
}

export type MovieSubscription = {
    id: number
    user_id: number
    card_number: string
    amount: number
    user_name: string
    user_email: string
    created_at: Date
}
