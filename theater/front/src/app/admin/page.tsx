import { MovieGeneral } from '@/components/custom/MovieGeneral'
import { getMovies } from '../(user)/actions'

export default async function Page() {
    const movies = await getMovies()

    if (!movies || movies.length === 0) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] rounded-xl">
                <div className="flex flex-col items-center justify-center px-0 md:px-6 lg:px-10">
                    <div className="w-full">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-2xl font-bold text-gray-800">
                                There are no movies
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-3 mx-auto">
            {movies.map((movie) => (
                <MovieGeneral key={movie.id} movie={movie} admin />
            ))}
        </div>
    )
}
