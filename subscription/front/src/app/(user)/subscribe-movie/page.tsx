import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { SubscriptionCard } from '@/components/custom/subscribe'
import { getServerSession } from 'next-auth'

export default async function Page() {
    const session = await getServerSession(authOptions)
    return (
        <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <SubscriptionCard token={session!.token} />
        </div>
    )
}
