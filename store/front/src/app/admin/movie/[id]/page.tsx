import { EditMovieForm } from '@/components/custom/EditMovieForm'
import { getMovie } from './actions'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const session = await getServerSession(authOptions)
    const movie = await getMovie(id, session!.token)

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
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] rounded-xl">
            <div className="flex flex-col items-center justify-center px-0 md:px-6 lg:px-10">
                <div className="w-full">
                    <div className="flex flex-col items-center justify-center">
                        <EditMovieForm movie={movie} token={session!.token} />
                    </div>
                </div>
            </div>
        </div>
    )
}
