import { getMovies } from '@/app/(user)/actions'
import { Movie } from '@/components/custom/Movie'

export default async function Page() {
    const movies = await getMovies()
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
