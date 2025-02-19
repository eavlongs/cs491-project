'use client'

import { Hall, Movie, Schedule } from '@/app/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export function SelectMovieScheduleToBuyTicket({
    movie,
    schedules,
    ...props
}: React.ComponentProps<'div'> & {
    movie: Movie
    schedules: { schedule: Schedule; hall: Hall }[]
}) {
    const [selectedSchedule, setSelectedSchedule] = useState<string | null>(
        null
    )

    const router = useRouter()
    const path = usePathname()

    const data = {
        items: [
            {
                label: 'Title',
                value: movie.title,
            },
            {
                label: 'Duration',
                value: `${movie.movie_duration} Minutes`,
            },
            {
                label: 'Release Date',
                value: new Date(movie.release_date).toISOString().split('T')[0],
            },
            {
                label: 'Directors',
                value: movie.directors,
            },
            {
                label: 'Cast',
                value: movie.cast,
            },
            {
                label: 'Genre',
                value: movie.genres,
            },
            {
                label: 'Age Restriction',
                value: movie.age_restriction,
            },
            {
                label: 'Description',
                value: movie.description,
            },
        ],
        options: schedules.map(({ schedule, hall }) => ({
            // hall_name - YYYY-MM-DD at HH:MM
            label: `${hall.name} - ${new Date(schedule.start_time).toISOString().split('T')[0]} at ${new Date(
                schedule.start_time
            ).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
            value: schedule.id,
        })),
    }
    return (
        <div
            className={cn('flex flex-col gap-6 min-w-[50rem]', props.className)}
            {...props}
        >
            <Card>
                <CardContent className="flex flex-col lg:flex-row mx-4 mt-8 gap-x-20 justify-around">
                    <div className="flex items-center justify-center">
                        <div className="relative h-[400px] aspect-[2/3]">
                            <Image
                                src={movie.poster_url}
                                alt="Image"
                                className="rounded-md object-cover w-full"
                                fill
                                unoptimized
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 mb-4">
                        <div className="flex flex-col items-center text-center">
                            <h1 className="text-2xl font-bold mb-2">
                                Buy Ticket
                            </h1>
                            <div className="flex items-center gap-2">
                                <div className="flex"></div>
                            </div>
                        </div>
                        {data.items.map((item, index) => (
                            <div key={index} className="grid grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <p>{item.label}:</p>
                                </div>
                                <p>{item.value}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
                <div className="w-full flex p-4">
                    <div className="flex ml-auto gap-x-5">
                        <Select
                            onValueChange={(value) =>
                                setSelectedSchedule(value)
                            }
                        >
                            <SelectTrigger className="w-[250px]">
                                <SelectValue placeholder="Select Hall & Time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Halls & Times</SelectLabel>
                                    {data.options.map((option, index) => (
                                        <SelectItem
                                            key={index}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button
                            className="w-32"
                            disabled={!selectedSchedule}
                            onClick={() =>
                                router.push(path + '/' + selectedSchedule!)
                            }
                        >
                            Select Seats
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
