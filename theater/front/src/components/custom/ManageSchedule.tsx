'use client'
import { Hall, Movie, Schedule } from '@/app/types'
import { DateSelector } from '@/components/custom/DateSelector'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import { Button } from '../ui/button'
import { AssignSchedule } from './AssignSchdule'

export default function ManageSchedule({
    hallSchedules,
    date,
    allMovies,
    token,
}: {
    hallSchedules: {
        hall: Hall
        schedules: {
            schedule: Schedule
            movie: Movie
        }[]
    }[]
    date: Date
    allMovies: Movie[]
    token: string
}) {
    const [selectedSchedule, setSelectedSchedule] = useState<{
        hall: Hall
        startTime: Date
    } | null>(null)

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
                                                            ).getHours()

                                                        const scheduleEndTime =
                                                            new Date(
                                                                schedule.schedule.end_time
                                                            ).getHours()

                                                        console.log({
                                                            startTime,
                                                            scheduleStartTime,
                                                            scheduleEndTime,
                                                        })

                                                        return (
                                                            scheduleStartTime <=
                                                                startTime &&
                                                            scheduleEndTime >
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
                                                        className="w-full px-4 py-2 text-center rounded disabled:opacity-90"
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
                                                    onClick={() =>
                                                        setSelectedSchedule({
                                                            hall: hallSchedule.hall,
                                                            startTime:
                                                                startDateTime,
                                                        })
                                                    }
                                                >
                                                    {startToEndTimeString}{' '}
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

            {selectedSchedule && (
                <AssignSchedule
                    hall={selectedSchedule.hall}
                    startTime={selectedSchedule.startTime}
                    movies={allMovies}
                    isOpen={selectedSchedule !== null}
                    setOpen={(value) => {
                        if (!value) {
                            setSelectedSchedule(null)
                        }
                    }}
                    token={token}
                />
            )}
        </div>
    )
}
