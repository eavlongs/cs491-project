'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

interface DateButton {
    date: number
    day: string
    month: string
    dateObj: Date
}

export function DateSelector({ date }: { date: Date }) {
    const [selectedDate, setSelectedDate] = useState<Date>(date)
    const path = usePathname()
    const today = new Date()

    const dates: DateButton[] = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        return {
            date: date.getDate(),
            day: date.toLocaleDateString('en-US', {
                weekday: 'short',
                timeZone: 'Asia/Phnom_Penh',
            }),
            month: date.toLocaleDateString('en-US', {
                month: 'short',
                timeZone: 'Asia/Phnom_Penh',
            }),
            dateObj: date,
        }
    })

    const router = useRouter()

    const handleDateClick = (date: Date) => {
        setSelectedDate(date)
        router.replace(`${path}?start_date=${date.toISOString().split('T')[0]}`)
    }

    return (
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 justify-center">
            {dates.map((date) => (
                <Button
                    key={date.date}
                    className={cn(
                        'min-w-[80px] aspect-square flex flex-col items-center justify-center p-10 bg-black text-white hover:bg-gray-800 rounded-lg',
                        selectedDate.getDate() === date.dateObj.getDate() &&
                            'bg-gray-800'
                    )}
                    onClick={() => handleDateClick(date.dateObj)}
                >
                    <div className="flex flex-col items-center">
                        <span>{date.month}</span>
                        <span className="text-xl font-bold">{date.date}</span>
                        <span>{date.day}</span>
                    </div>
                </Button>
            ))}
        </div>
    )
}
