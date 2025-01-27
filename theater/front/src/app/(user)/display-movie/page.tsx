'use client'

import { DateSelector } from '@/components/custom/DateSelector'
import { Movie } from '@/components/custom/movies'

export default function Page() {
    const startDate = new Date()
    startDate.setHours(0, 0, 0, 0)

    return (
        <div className="container mx-auto py-6 space-y-6">
            <DateSelector date={startDate} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Movie key={index} />
                ))}
            </div>
        </div>
    )
}
