export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    is_admin: boolean;
};

export type UserSubscription = {
    id: number;
    user_id: number;
    starts_at: Date;
    ends_at: Date;
};

export type Payment = {
    id: number;
    user_id: number;
    card_number: string;
    amount: number;
    created_at: Date;
};

export type Movie = {
    id: number;
    mb_id: string;
    genres: string;
    age_restriction: string;
    title: string;
    description: string;
    poster_url: string;
    video_url: string;
    director: string;
    writers: string;
    cast: string;
    release_date: Date;
    movie_duration: number;
};
