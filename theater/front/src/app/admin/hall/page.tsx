import ManageHalls from '@/components/custom/ManageHalls'
import { getAllHalls } from '../schedule/actions'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'

export default async function Page() {
    const session = await getServerSession(authOptions)
    const halls = await getAllHalls(session!.token)
    return <ManageHalls halls={halls} />
}
