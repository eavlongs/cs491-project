export enum JwtTokenOptions {
    // for cookie of next auth
    AccessTokenExpireTimeInMs = 1 * 60 * 60 * 1000, // 1 day

    // TODO: remove if u want this is for test purpose
    // RefreshTokenExpireTimeInMs = 5 * 60 * 1000,
    // AccessTokenExpireTimeInMs = 30 * 1000,
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
