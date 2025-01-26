'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CreditCard } from 'lucide-react'
import { useRef } from 'react'

interface PaymentCardProps {
    totalAmount: number
    bookingDetails: {
        seats: string[]
        movieTitle: string
        showTime: string
        showDate: string
        hallName: string
    }
    onBack: () => void
    onSubmit: (cardNumber: string) => void
}

export function PaymentCard({
    totalAmount,
    bookingDetails,
    onBack,
    onSubmit,
}: PaymentCardProps) {
    const cardNumberRef = useRef<HTMLInputElement>(null)
    const ccvRef = useRef<HTMLInputElement>(null)
    const expiryMonthRef = useRef<HTMLInputElement>(null)
    const expiryYearRef = useRef<HTMLInputElement>(null)

    const handleSubmit = () => {
        const allRefsWithName = [
            { ref: cardNumberRef, name: 'Card Number', len: 16 },
            { ref: ccvRef, name: 'CVV', len: 3 },
            {
                ref: expiryMonthRef,
                name: 'Expiry Month',
                len: 2,
                min: 1,
                max: 12,
            },
            {
                ref: expiryYearRef,
                name: 'Expiry Year',
                len: 2,
                min: 0,
                max: 99,
            },
        ]

        for (const { ref, name, len, min, max } of allRefsWithName) {
            if (!ref.current || !ref.current.value) {
                alert(`${name} is required`)
                return
            }

            if (isNaN(parseInt(ref.current.value))) {
                alert(`${name} must be a number`)
                return
            }

            if (parseInt(ref.current.value) < 0) {
                alert(`${name} must be a positive number`)
                return
            }

            if (ref.current.value.length !== len) {
                alert(`${name} must be ${len} digits`)
                return
            }

            if (min && parseInt(ref.current.value) < min) {
                alert(`${name} must be at least ${min}`)
                return
            }

            if (max && parseInt(ref.current.value) > max) {
                alert(`${name} must be at most ${max}`)
                return
            }
        }

        onSubmit(cardNumberRef.current!.value)
    }

    return (
        <div className="flex gap-6">
            <Card className="w-96">
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <RadioGroup defaultValue="card" className="space-y-4">
                        <div className="flex items-center space-x-2 border rounded-lg p-4">
                            <RadioGroupItem value="card" id="card" />
                            <Label
                                htmlFor="card"
                                className="flex items-center gap-2"
                            >
                                <CreditCard className="h-4 w-4" />
                                Debit/Credit Card
                            </Label>
                        </div>
                    </RadioGroup>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                                id="cardNumber"
                                ref={cardNumberRef}
                                placeholder="1234 5678 9012 3456"
                                maxLength={16}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSubmit()
                                    }
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <Input
                                    id="cvv"
                                    ref={ccvRef}
                                    maxLength={3}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSubmit()
                                        }
                                    }}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="month">Month</Label>
                                <Input
                                    id="month"
                                    ref={expiryMonthRef}
                                    placeholder="MM"
                                    maxLength={2}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSubmit()
                                        }
                                    }}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="year">Year</Label>
                                <Input
                                    id="year"
                                    ref={expiryYearRef}
                                    placeholder="YY"
                                    maxLength={2}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSubmit()
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="w-80">
                <CardContent className="p-6 space-y-6">
                    <h3 className="font-semibold">RECEIPT</h3>
                    <div className="flex justify-between items-center">
                        <span>{bookingDetails.seats.join(', ')}</span>
                        <span>{bookingDetails.seats.length}x</span>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Movie:</span>
                            <span>{bookingDetails.movieTitle}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Time:</span>
                            <span>{bookingDetails.showTime}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Date:</span>
                            <span>{bookingDetails.showDate}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Hall:</span>
                            <span>{bookingDetails.hallName}</span>
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={onBack}
                        >
                            Back
                        </Button>
                        <Button className="flex-1" onClick={handleSubmit}>
                            Checkout
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
