import MovieSales from '@/components/custom/MovieSales'
import { getMovieSales } from './actions'

export default async function Page() {
    const sales = await getMovieSales()
    return <MovieSales sales={sales} />
}

export const dynamic = 'force-dynamic'
