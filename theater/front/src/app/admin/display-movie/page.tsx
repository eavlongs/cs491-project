'use client'

import { useState } from 'react'
import { Movie } from '@/components/custom/movies'
import { DateSelector } from '@/components/custom/date-box'

export default function Page() {
    const [, setSelectedDate] = useState<string>('25 Dec')

    return (
        <div className="container mx-auto py-6 space-y-6">
            <DateSelector onDateSelect={setSelectedDate} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Movie key={index} />
                ))}
            </div>
        </div>
    )
}

