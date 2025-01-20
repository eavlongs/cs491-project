import { BuyTicket } from '@/components/custom/BuyTicket'
import { getMovie, getMovieSchedules } from './actions'
import { redirect } from 'next/navigation'

export default async function Page({
    params,
    searchParams,
}: {
    params: { id: string }
    searchParams: { start_date: string; end_date: string }
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

    const { start_date, end_date } = searchParams

    // validate date
    let startDate = new Date(start_date)
    let endDate = new Date(end_date)
    let rewriteRoute = false

    if (startDate.toString() == 'Invalid Date') {
        rewriteRoute = true
        startDate = new Date()
    }

    if (endDate.toString() == 'Invalid Date') {
        rewriteRoute = true
        // change to startDate + 7 days
        endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    }

    if (rewriteRoute) {
        // redirect to new route
        const newRoute = `/buy-ticket/${id}?start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}`
        redirect(newRoute)
    }

    const schedules = await getMovieSchedules(id, startDate, endDate)

    return (
        <div className="min-h-min w-2/3 rounded-xl flex justify-center">
            <BuyTicket movie={movie} schedules={schedules} />
        </div>
    )
}
