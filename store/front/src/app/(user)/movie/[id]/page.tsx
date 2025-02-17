import { getMovie } from '@/app/admin/movie/[id]/actions'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { MovieDetail } from '@/components/custom/moviedetail'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
export default async function Page({
    params,
}: {
    params: {
        id: string
    }
}) {
    const { id } = await params
    const session = await getServerSession(authOptions)
    const movie = await getMovie(id, session?.token ?? '')

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

    if (movie.video_url) {
        redirect(`/movie/${id}/watch`)
    }

    return (
        <div className="min-h-min w-full rounded-xl flex justify-center">
            <MovieDetail movie={movie} />
        </div>
    )
}
