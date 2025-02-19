import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'

import { Movie as MovieType } from '@/app/types'
import Link from 'next/link'

export function MovieGeneral({
    movie,
    admin = false,
}: {
    movie: MovieType
    admin?: boolean
}) {
    return (
        <Link href={admin ? `/admin/movie/${movie.id}` : `/movie/${movie.id}`}>
            <Card className="w-[350px] hover:cursor-pointer">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        {movie.title}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="relative h-[350px] aspect-[2/3] mx-auto">
                        <Image
                            src={movie.poster_url}
                            alt="Image"
                            className="rounded-md object-cover"
                            fill
                            unoptimized
                        />
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <div className="grid gap-2">
                        <CardDescription>
                            {new Date(movie.release_date).toLocaleDateString()}
                        </CardDescription>
                        <CardDescription>
                            {movie.movie_duration} Minutes
                        </CardDescription>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}
