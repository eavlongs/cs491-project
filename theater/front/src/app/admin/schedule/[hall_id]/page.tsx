import AssignHall from '@/components/custom/AssignHall'
import { getSchedule } from './actions'
import { getMovies } from '@/app/(user)/actions'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import { start } from 'repl'
import { AssignSchedule } from '@/components/custom/AssignSchdule'

export default async function Page({
    params,
    searchParams,
}: {
    params: { hall_id: string }
    searchParams: {
        start_date: string
        start_time: string
    }
}) {
    const { hall_id } = await params

    const { start_date } = await searchParams

    // validate date
    let startDate = new Date(start_date)
    let rewriteRoute = false

    if (startDate.toString() == 'Invalid Date') {
        rewriteRoute = true
        startDate = new Date()
        // add 1 day to startDate
        startDate.setDate(startDate.getDate() + 1)
        if (startDate.getHours() >= 22) {
            startDate.setDate(startDate.getDate() + 1)
            startDate.setHours(10)
        } else if (startDate.getHours() < 10) {
            startDate.setHours(10)
        }
    }

    if (rewriteRoute) {
        // redirect to new route
        const newRoute = `/admin/schedule/${hall_id}?start_date=${startDate.toISOString().split('T')[0]}&start_time=${startDate.getHours()}`
        redirect(newRoute)
    }

    const session = await getServerSession(authOptions)
    const data = await getSchedule(hall_id, startDate, session!.token)

    if (!data) {
        return null
    }

    const movies = await getMovies()

    return (
        // <AssignHall
        //     schedule={data.schedule}
        //     hall={data.hall}
        //     movies={movies}
        //     date={startDate}
        // />

        <AssignSchedule
            hall={data.hall}
            movies={movies}
            startTime={startDate}
        />
    )
}
