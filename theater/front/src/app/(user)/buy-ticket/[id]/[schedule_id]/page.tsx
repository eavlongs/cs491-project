import { SeatSelectionCard } from '@/components/custom/seat-selection'
import { getMovieScheduleDetail } from './actionts'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

export default async function Page({
    params,
}: {
    params: { schedule_id: string }
}) {
    const { schedule_id } = await params
    const session = await getServerSession(authOptions)
    const data = await getMovieScheduleDetail(schedule_id, session!.token)

    if (!data) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] rounded-xl">
                <div className="flex flex-col items-center justify-center px-0 md:px-6 lg:px-10">
                    <div className="w-full">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-2xl font-bold text-gray-800">
                                Schedule not found
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    data.schedule.start_time = new Date(data.schedule.start_time)
    data.schedule.end_time = new Date(data.schedule.end_time)

    const seats = data.seats.map((seat) => ({
        id: seat.id,
        code: seat.code,
        available: seat.is_available,
    }))

    return (
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="container mx-auto py-10">
                <SeatSelectionCard
                    movie={data.movie}
                    showTime={
                        data.schedule.start_time.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                        }) +
                        ' - ' +
                        data.schedule.end_time.toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                        })
                    }
                    showDate={data.schedule.start_time.toLocaleDateString(
                        'en-US',
                        {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        }
                    )}
                    hallName={data.hall.name}
                    seatPrice={data.hall.seat_price}
                    seats={seats}
                />
            </div>
        </div>
    )
}
