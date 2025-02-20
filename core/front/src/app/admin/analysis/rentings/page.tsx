import MovieRentings from '@/components/custom/MovieRentings'
import { getMovieRentings } from './actions'

export default async function Page() {
    const rentings = await getMovieRentings()
    return <MovieRentings rentings={rentings} />
}

export const dynamic = 'force-dynamic'
