import { getMovie } from '@/app/admin/movie/[id]/actions'
import { MovieDetail } from '@/components/custom/MovieDetail'
export default async function Page({
    params,
}: {
    params: {
        id: string
    }
}) {
    const { id } = await params
    const movie = await getMovie(id)

    if (!movie) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] rounded-xl">
                <div className="flex flex-col items-center justify-center px-0 md:px-6 lg:px-10">
                    <div className="w-full">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-2xl font-bold text-gray-800">
                                Movie not found
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-min w-full rounded-xl flex justify-center">
            <MovieDetail movie={movie} />
        </div>
    )
}
