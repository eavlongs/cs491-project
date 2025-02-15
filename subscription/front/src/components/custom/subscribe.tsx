'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { useState } from 'react'
import PaymentCard from './payment-card'

export function SubscriptionCard({ token }: { token: string }) {
    const [paymentVisible, setPaymentVisible] = useState(false)
    const handleNext = () => {
        setPaymentVisible(true)
    }

    return paymentVisible ? (
        <PaymentCard token={token} />
    ) : (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle className="text-center">
                    SUBSCRIBE TO WATCH MOVIE
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
                    <div>
                        <h3 className="font-semibold">Standard</h3>
                        <p className="text-sm text-gray-600">1080p</p>
                    </div>
                    <Check className="h-5 w-5 text-blue-500" />
                </div>

                <div className="space-y-4">
                    <div className="space-y-1">
                        <h4 className="font-medium">Monthly Price</h4>
                        <p>15.00$</p>
                    </div>

                    <div className="space-y-1">
                        <h4 className="font-medium">Video and sound quality</h4>
                        <p>Great</p>
                    </div>

                    <div className="space-y-1">
                        <h4 className="font-medium">Resolution</h4>
                        <p>1080p (Full HD)</p>
                    </div>

                    <div className="space-y-1">
                        <h4 className="font-medium">Supported devices</h4>
                        <p>TV, computer, mobile phone, tablet</p>
                    </div>
                </div>

                <Button className="w-full" onClick={handleNext}>
                    NEXT
                </Button>
            </CardContent>
        </Card>
    )
}
