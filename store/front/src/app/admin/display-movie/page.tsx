'use client'


import { Movie } from '@/components/custom/Movie'

export default function Page() {

    return (
        <div className="container mx-auto py-6 space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Movie key={index} />
                ))}
            </div>
        </div>
    )
}
