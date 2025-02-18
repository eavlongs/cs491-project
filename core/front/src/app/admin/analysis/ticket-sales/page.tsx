import TicketSales from '@/components/custom/TicketSales'
import { getTicketSales } from './actions'

export default async function Page() {
    const sales = await getTicketSales()
    return <TicketSales sales={sales} />
}
