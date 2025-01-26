import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import OrderHistroy from '@/components/custom/OrderHistory'
import { getServerSession } from 'next-auth'
import { getOrderHistory } from './actionts'

export default async function Page() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return { redirect: { destination: '/login', permanent: false } }
    }

    const payments = await getOrderHistory(session.token)
    return <OrderHistroy payments={payments} />
}
