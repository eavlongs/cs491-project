export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
};

export type UserSubscription = {
    id: number;
    userId: number;
    startsAt: Date;
    endsAt: Date;
};

export type Payment = {
    id: number;
    userId: number;
    cardNumber: string;
    amount: number;
    createdAt: Date;
};

export type Movie = {
    id: number;
    mb_id: string;
    genres: string;
    ageRestriction: string;
    title: string;
    description: string;
    posterUrl: string;
    videoUrl: string;
    director: string;
    writers: string;
    cast: string;
    releaseDate: Date;
    movieDuration: number;
};
