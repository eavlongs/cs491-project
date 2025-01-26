'use client'

import { buyTickets } from '@/app/(user)/buy-ticket/[id]/[schedule_id]/actionts'
import { Hall, Movie, Schedule } from '@/app/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { PaymentCard } from './payment-card'

interface SeatProps {
    id: string
    isAvailable: boolean
    isSelected: boolean
    onSelect: (id: string) => void
    code: string
}

const Seat = ({ id, code, isAvailable, isSelected, onSelect }: SeatProps) => {
    return (
        <button
            onClick={() => isAvailable && onSelect(id)}
            className={cn(
                'w-12 h-12 border-2 rounded-lg flex items-center justify-center transition-colors',
                isAvailable
                    ? isSelected
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-green-500 hover:bg-green-100'
                    : 'border-red-500 bg-red-100 cursor-not-allowed'
            )}
            disabled={!isAvailable}
        >
            {code}
        </button>
    )
}

interface BuyTicketProps {
    movie: Movie
    showTime: string
    showDate: string
    hall: Hall
    seats: {
        id: string
        available: boolean
        code: string
    }[]
    schedule: Schedule
    token: string
}

export function BuyTicket({
    movie,
    showTime,
    showDate,
    hall,
    seats,
    schedule,
    token,
}: BuyTicketProps) {
    const [isSelectingSeats, setIsSelectingSeats] = useState(true)

    const router = useRouter()
    const [selectedSeats, setSelectedSeats] = useState<
        {
            id: string
            available: boolean
            code: string
        }[]
    >([])

    const handleSeatSelect = (seatId: string) => {
        let isRemovingSeat = false
        selectedSeats.map((_selectedSeat) => {
            if (_selectedSeat.id === seatId) {
                isRemovingSeat = true
                return setSelectedSeats((prev) =>
                    prev.filter((item) => item.id !== seatId)
                )
            }
        })

        if (isRemovingSeat) {
            return
        }

        const seat = seats.find((seat) => seat.id === seatId)

        if (seat) {
            setSelectedSeats((prev) => [...prev, seat])
        }
    }

    const totalPrice = selectedSeats.length * hall.seat_price

    async function onSubmit(cardNumber: string) {
        const actionResponse = await buyTickets(
            schedule.id,
            selectedSeats.map((seat) => seat.id),
            cardNumber,
            token
        )

        if (actionResponse.success) {
            router.push('/order-history')
        } else {
            alert(actionResponse.message)
        }
    }

    return isSelectingSeats ? (
        <div className="flex gap-6">
            <Card className="flex-1">
                <CardHeader className="text-center font-bold bg-black text-white">
                    Screen
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {seats.map((seat) => (
                            <Seat
                                key={seat.id}
                                id={seat.id}
                                code={seat.code}
                                isAvailable={seat.available}
                                isSelected={selectedSeats.some(
                                    (selectedSeat) =>
                                        selectedSeat.id === seat.id
                                )}
                                onSelect={handleSeatSelect}
                            />
                        ))}
                    </div>
                    <p className="text-center font-medium">
                        Regular Seat ${hall.seat_price.toFixed(2)}
                    </p>
                </CardContent>
            </Card>

            <Card className="w-80">
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Movie:</span>
                            <span>{movie.title}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Hall:</span>
                            <span>{hall.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Time:</span>
                            <span>{showTime}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Date:</span>
                            <span>{showDate}</span>
                        </div>
                        <h3 className="font-semibold pt-6">
                            Selected Seats:{' '}
                            {selectedSeats.length > 0
                                ? selectedSeats.length + 'x'
                                : 'None'}
                        </h3>
                        <div className="flex justify-between items-center">
                            <span>
                                {selectedSeats
                                    .map((seat) => seat.code)
                                    .join(', ')}
                            </span>
                            <span></span>
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() =>
                                router.push('/buy-ticket/' + movie.id)
                            }
                        >
                            Cancel
                        </Button>
                        <Button
                            className="flex-1"
                            onClick={() => setIsSelectingSeats(false)}
                            disabled={selectedSeats.length === 0}
                        >
                            Pay
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    ) : (
        <PaymentCard
            onSubmit={onSubmit}
            totalAmount={totalPrice}
            bookingDetails={{
                seats: selectedSeats.map((seat) => seat.code),
                hallName: hall.name,
                movieTitle: movie.title,
                showDate,
                showTime,
            }}
            onBack={() => setIsSelectingSeats(true)}
        />
    )
}
