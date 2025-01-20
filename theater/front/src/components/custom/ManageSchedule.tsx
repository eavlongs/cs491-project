'use client'
import { Hall, Movie, Schedule } from '@/app/types'
import { DateSelector } from '@/components/custom/DateSelector'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '../ui/button'

// const halls = [
//     {
//         id: 'b1',
//         name: 'HALL B1',
//         timeSlots: [
//             { time: '2:00-3:00', status: 'scheduled' },
//             { time: 'Unavailable', status: 'unavailable' },
//         ],
//     },
//     {
//         id: 'b2',
//         name: 'Hall B2',
//         timeSlots: [{ time: 'Click to Assign', status: 'available' }],
//     },
//     {
//         id: 'b3',
//         name: 'Hall B3',
//         timeSlots: [{ time: 'Click to Assign', status: 'available' }],
//     },
//     {
//         id: 'b4',
//         name: 'Hall B4',
//         timeSlots: [
//             { time: '2:00-3:00', status: 'scheduled' },
//             { time: 'Unavailable', status: 'unavailable' },
//         ],
//     },
//     {
//         id: 'b5',
//         name: 'Hall B5',
//         timeSlots: [
//             { time: '2:00-3:00', status: 'scheduled' },
//             { time: 'Unavailable', status: 'unavailable' },
//         ],
//     },
//     {
//         id: 'b6',
//         name: 'Hall B6',
//         timeSlots: [
//             { time: '2:00-3:00', status: 'scheduled' },
//             { time: 'Unavailable', status: 'unavailable' },
//         ],
//     },
// ]

export default function ManageSchedule({
    hallSchedules,
    date,
}: {
    hallSchedules: {
        hall: Hall
        schedules: {
            schedule: Schedule
            movie: Movie
        }[]
    }[]
    date: Date
}) {
    return (
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="container mx-auto p-6">
                <div className="flex justify-center">
                    <DateSelector date={date} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {hallSchedules.map((hallSchedule) => (
                        <div
                            key={hallSchedule.hall.id}
                            className="relative h-full"
                        >
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold text-center">
                                        {hallSchedule.hall.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="space-y-2">
                                        {Array.from(
                                            { length: 12 },
                                            (_, i) => i + 10
                                        ).map((startTime) => {
                                            let startDateTime = new Date(date)
                                            startDateTime.setHours(
                                                startTime,
                                                0,
                                                0,
                                                0
                                            )

                                            const startToEndTimeString = `${startTime}:00 - ${startTime + 1}:00`

                                            const occupiedSlot =
                                                hallSchedule.schedules.find(
                                                    (schedule) => {
                                                        const scheduleStartTime =
                                                            new Date(
                                                                schedule.schedule.start_time
                                                            ).getTime()

                                                        const scheduleEndTime =
                                                            new Date(
                                                                schedule.schedule.end_time
                                                            ).getTime()

                                                        return (
                                                            scheduleStartTime <=
                                                                startTime &&
                                                            scheduleEndTime >=
                                                                startTime
                                                        )
                                                    }
                                                )

                                            if (occupiedSlot) {
                                                return (
                                                    <Button
                                                        variant="destructive"
                                                        disabled
                                                        key={
                                                            hallSchedule.hall
                                                                .id + startTime
                                                        }
                                                        className="w-full px-4 py-2 text-center roundedbg-red-700 hover:bg-red-600"
                                                    >
                                                        {
                                                            occupiedSlot.movie
                                                                .title
                                                        }
                                                    </Button>
                                                )
                                            }

                                            return (
                                                <Button
                                                    variant="outline"
                                                    key={
                                                        hallSchedule.hall.id +
                                                        startTime
                                                    }
                                                    className="w-full px-4 py-2 text-center rounded"
                                                >
                                                    <Link
                                                        href={`/admin/schedule/${hallSchedule.hall.id}`}
                                                    >
                                                        {startToEndTimeString}{' '}
                                                    </Link>
                                                </Button>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
