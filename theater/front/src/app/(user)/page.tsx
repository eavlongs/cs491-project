import { getMovies, getPlayingMovies } from '@/app/(user)/actions'
import { DateSelector } from '@/components/custom/DateSelector'
import { Movie } from '@/components/custom/Movie'
import { redirect } from 'next/navigation'

export default async function Page({
    searchParams,
}: {
    searchParams: {
        start_date: string
    }
}) {
    let { start_date: startDateString } = await searchParams

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    let startDate = new Date(startDateString)
    if (startDate.toString() === 'Invalid Date' || startDate < today) {
        startDate = new Date()
        redirect(`/?start_date=${startDate.toLocaleDateString('en-CA')}`)
    }

    startDate.setHours(0, 0, 0, 0)

    startDate.setHours(0, 0, 0, 0)

    const movies = await getPlayingMovies(startDate)

    return (
        <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min">
            <DateSelector date={startDate} />

            <div className="grid auto-rows-min gap-6 md:grid-cols-3 items-center">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <Movie movie={movie} key={movie.id} date={startDate} />
                    ))
                ) : (
                    <div className="col-span-3 text-center text-lg text-gray-500">
                        No movies playing on this day
                    </div>
                )}
            </div>
        </div>
    )
}
