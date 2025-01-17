'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DateButton {
    date: number
    day: string
    month: string
}

export function DateSelector({
    onDateSelect,
}: {
    onDateSelect: (date: string) => void
}) {
    const [selectedDate, setSelectedDate] = useState<number>(25)

    const dates: DateButton[] = [
        { date: 25, day: 'Wed', month: 'Dec' },
        { date: 26, day: 'Thu', month: 'Dec' },
        { date: 27, day: 'Fri', month: 'Dec' },
        { date: 28, day: 'Sat', month: 'Dec' },
        { date: 29, day: 'Sun', month: 'Dec' },
        { date: 30, day: 'Mon', month: 'Dec' },
        { date: 31, day: 'Tue', month: 'Dec' },
    ]

    const handleDateClick = (date: number) => {
        setSelectedDate(date)
        onDateSelect(`${date} Dec`)
    }

    return (
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
            {dates.map((date) => (
                <Button
                    key={date.date}
                    variant="outline"
                    className={cn(
                        'min-w-[80px] flex flex-col items-center py-3 px-4 bg-black text-white hover:bg-gray-800',
                        selectedDate === date.date && 'bg-gray-800'
                    )}
                    onClick={() => handleDateClick(date.date)}
                >
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-medium">
                            {date.month}
                        </span>
                        <span className="text-lg font-bold">{date.date}</span>
                        <span className="text-xs font-medium">{date.day}</span>
                    </div>
                </Button>
            ))}
        </div>
    )
}
