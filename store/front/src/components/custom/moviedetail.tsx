'use client'

import { Movie } from '@/app/types'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { VideoPlayer } from './video-player'

export function MovieDetail({
    movie,
    className,
    ...props
}: React.ComponentProps<'div'> & {
    movie: Movie
}) {
    // const rating = movie.avg_rating || 0
    // const [hoverRating, setHoverRating] = useState(0)
    // const [userRated] = useState(false)
    // const totalReviews = movie.number_of_ratings || 0
    // const session = useSession()
    // const stars = 5

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

    return (
        <div className={cn('', className)} {...props}>
            <p className="text-xl font-bold text-center mb-2">Trailer</p>
            <VideoPlayer videoUrl={movie.trailer_url} />
            <Card className="w-full mt-4">
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
                <div className="w-full flex flex-wrap p-4 gap-6 items-center justify-center">
                    <Link href={`/movie/${movie.id}/buy`}>
                        <Button className="w-32">
                            Buy: {movie.buy_price}$
                        </Button>
                    </Link>

                    <Link href={`/movie/${movie.id}/rent`}>
                        <Button className="w-32">
                            Rent: {movie.rent_price}$/week
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    )
}
