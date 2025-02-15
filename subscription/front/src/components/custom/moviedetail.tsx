'use client'

import { rateMovieAction } from '@/app/(user)/movie/[id]/actions'
import { Movie } from '@/app/types'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'

export function MovieDetail({
    movie,
    className,
    ...props
}: React.ComponentProps<'div'> & {
    movie: Movie
}) {
    const rating = movie.avg_rating || 0
    const [hoverRating, setHoverRating] = useState(0)
    const [userRated] = useState(false)
    const totalReviews = movie.number_of_ratings || 0
    const session = useSession()
    const stars = 5

    const data = {
        items: [
            {
                label: ' Duration',
                detail: movie.movie_duration + ' Minutes',
            },
            {
                label: 'Release Date',
                detail: new Date(movie.release_date)
                    .toISOString()
                    .split('T')[0],
            },
            {
                label: 'Directors',
                detail: movie.directors,
            },
            {
                label: 'Cast',
                detail: movie.cast,
            },
            {
                label: 'Genre',
                detail: movie.genres,
            },
            {
                label: 'Age Restriction',
                detail: movie.age_restriction,
            },
            {
                label: 'Description',
                detail: movie.description,
            },
        ],
    }

    const handleRating = async (value: number) => {
        if (!session.data) {
            alert('Please login to rate this movie')
            return
        }

        const success = await rateMovieAction(
            movie.id.toString(),
            value,
            session.data.token
        )

        if (!success) {
            alert('Failed to rate this movie')
            return
        }
    }

    const handleMouseEnter = (value: number) => {
        if (!userRated) {
            setHoverRating(value)
        }
    }

    const handleMouseLeave = () => {
        if (!userRated) {
            setHoverRating(0)
        }
    }

    return (
        <div className={cn('', className)} {...props}>
            <Card className="w-full">
                <CardContent className="flex flex-col lg:flex-row mx-4 mt-8 gap-x-20 justify-between">
                    <div className="flex items-center justify-center">
                        <div className="relative h-[400px] aspect-[2/3]">
                            <Image
                                src={movie.poster_url}
                                alt="Image"
                                className="rounded-md object-cover w-full"
                                fill
                                unoptimized
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 mb-4">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-2xl font-bold mb-2">
                                {movie.title}
                            </h1>
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[...Array(stars)].map((_, index) => {
                                        const starValue = index + 1
                                        return (
                                            <button
                                                key={index}
                                                type="button"
                                                className="p-0 hover:scale-110 transition-transform"
                                                onClick={() =>
                                                    handleRating(starValue)
                                                }
                                                onMouseEnter={() =>
                                                    handleMouseEnter(starValue)
                                                }
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <Star
                                                    className={cn(
                                                        'w-5 h-5 transition-colors',
                                                        (hoverRating ||
                                                            rating) >= starValue
                                                            ? 'fill-yellow-400 stroke-yellow-400'
                                                            : 'stroke-gray-200 fill-gray-200'
                                                    )}
                                                />
                                            </button>
                                        )
                                    })}
                                </div>
                                <span className="text-sm text-gray-600">
                                    {rating}/5 ({totalReviews.toLocaleString()}{' '}
                                    reviews)
                                </span>
                            </div>
                        </div>
                        {data.items.map((item, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-2 gap-x-4 items-center min-w-[20rem]"
                            >
                                <p>{item.label}:</p>
                                <p>{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <div className="w-full flex flex-wrap p-4 gap-6 items-center justify-center"></div>
            </Card>
        </div>
    )
}
