import { Movie } from '@/components/custom/Movie'
import { getMovies } from '@/app/(user)/actions'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'

export default async function Page() {
    const session = await getServerSession(authOptions)
    const movies = await getMovies(session!.token)
    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 mx-auto">
            {movies.map((movie) => (
                <Movie key={movie.id} movie={movie} admin />
            ))}
        </div>
    )
}
