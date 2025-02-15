import { Movie } from '@/components/custom/Movie'
import { getMovies } from './actions'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'

export default async function Page() {
    const session = await getServerSession(authOptions)
    const movies = await getMovies(session!.token)
    return (
        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <div className="grid auto-rows-min gap-6 md:grid-cols-3 items-center">
                {movies.map((movie) => (
                    <Movie movie={movie} key={movie.id} />
                ))}
            </div>
        </div>
    )
}
