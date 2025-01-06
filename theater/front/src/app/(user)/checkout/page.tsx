import { PaymentCard } from '@/components/custom/payment-card'

export default function CheckoutPage() {
    // In a real app, you'd get this from your state management solution
    const bookingDetails = {
        seats: ['H6', 'H7', 'H8'],
        movieTitle: 'JoJo Bizze Adventure',
        showTime: '21:00',
        showDate: 'Sun, 22 Dec',
        hallName: 'Hall A',
    }

    return (
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="container mx-auto py-10 flex justify-center">
                <PaymentCard
                    totalAmount={10.5}
                    bookingDetails={bookingDetails}
                />
            </div>
        </div>
    )
}
