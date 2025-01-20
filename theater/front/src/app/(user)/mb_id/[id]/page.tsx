import { redirect } from 'next/navigation'
import { getMovieByMbId } from './actions'

export default async function Page({
    params,
}: {
    params: {
        id: string
    }
}) {
    const { id } = await params
    const movie = await getMovieByMbId(id)

    if (movie) {
        console.log('redirecting')
        redirect('/buy-ticket')
    }
}
