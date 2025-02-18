import { redirect } from 'next/navigation'
import { getMovieByMbId } from './actions'
export default async function Page({
    params,
}: {
    params: {
        mb_id: string
    }
}) {
    const { mb_id } = await params
    const movie = await getMovieByMbId(mb_id)

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

    redirect(`/movie/${movie.id}`)
}
