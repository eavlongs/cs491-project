import { Hall, Movie, Schedule } from '@/app/types'
import ManageSchedule from '@/components/custom/ManageSchedule'
import { redirect } from 'next/navigation'
import { getAllHalls, getSchedulesFromAllHalls } from './actions'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { getMovies } from '@/app/(user)/actions'

export default async function Page({
    searchParams,
}: {
    searchParams: {
        start_date: string
    }
}) {
    let { start_date: startDateString } = await searchParams
    const session = await getServerSession(authOptions)

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    let startDate = new Date(startDateString)
    if (startDate.toString() === 'Invalid Date' || startDate < today) {
        startDate = new Date()
        redirect(
            `/admin/schedule?start_date=${startDate.toLocaleDateString('en-CA')}`
        )
    }

    startDate.setHours(0, 0, 0, 0)

    const schedules = await getSchedulesFromAllHalls(startDate)

    const halls = await getAllHalls(session!.token)

    const hallSchedulesSorted: {
        hall: Hall
        schedules: {
            schedule: Schedule
            movie: Movie
        }[]
    }[] = halls.map((hall) => {
        const schedulesForHall = schedules.filter((s) => s.hall.id === hall.id)
        const sortedSchedules = schedulesForHall.sort((a, b) => {
            return (
                new Date(a.schedule.start_time).getTime() -
                new Date(b.schedule.start_time).getTime()
            )
        })

        return {
            hall,
            schedules: sortedSchedules.map((s) => ({
                schedule: s.schedule,
                movie: s.movie,
            })),
        }
    })

    const allMovies = await getMovies()

    return (
        <ManageSchedule
            hallSchedules={hallSchedulesSorted}
            date={startDate}
            allMovies={allMovies}
            token={session!.token}
        />
    )
}
