import { Movie } from '@/components/custom/Movie'
import { getMovies } from '@/app/(user)/actions'

export default async function Page() {
    const movies = await getMovies()
    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 mx-auto">
            {movies.map((movie) => (
                <Movie key={movie.id} movie={movie} admin />
            ))}
        </div>
    )
}
