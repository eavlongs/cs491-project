import MovieSubscriptions from '@/components/custom/MovieSubscriptions'
import { getMovieSubscriptions } from './actions'

export default async function Page() {
    const subscriptions = await getMovieSubscriptions()

    return <MovieSubscriptions subscriptions={subscriptions} />
}
