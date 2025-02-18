import { ApiResponse, TicketSale } from '@/app/types'
import { theaterApiUrl } from '@/app/utils'

export async function getTicketSales() {
    const response = await fetch(`${theaterApiUrl}/ticket-sales`)

    const json: ApiResponse<{ ticket_sales: TicketSale[] }> =
        await response.json()

    console.log(json)

    if (!response.ok || !json.success || !json.data?.ticket_sales) {
        return []
    }

    return json.data.ticket_sales
}
