import { DateSelector } from '@/components/custom/DateSelector'
import { SelectMovieScheduleToBuyTicket } from '@/components/custom/SelectMovieScheduleToBuyTicket'
import { VideoPlayer } from '@/components/custom/video-player'
import { redirect } from 'next/navigation'
import { getMovie, getMovieSchedules } from './actions'

export default async function Page({
    params,
    searchParams,
}: {
    params: { id: string }
    searchParams: { start_date: string }
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

    const { start_date } = await searchParams

    // validate date
    let startDate = new Date(start_date)
    let rewriteRoute = false

    if (startDate.toString() == 'Invalid Date') {
        rewriteRoute = true
        startDate = new Date()
    }

    if (rewriteRoute) {
        // redirect to new route
        const newRoute = `/buy-ticket/${id}?start_date=${startDate.toLocaleDateString('en-CA')}`
        redirect(newRoute)
    }

    const schedules = await getMovieSchedules(id, startDate)

    return (
        <>
            <DateSelector date={startDate} />
            <div className="min-h-min w-2/3 rounded-xl flex justify-center">
                <SelectMovieScheduleToBuyTicket
                    movie={movie}
                    schedules={schedules}
                />
            </div>
            <div className="w-full">
                <p className="font-bold text-center text-2xl mb-2">Trailer</p>
                <VideoPlayer videoUrl={movie.trailer_url} />
            </div>
        </>
    )
}
