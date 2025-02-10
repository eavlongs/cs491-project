"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard } from "lucide-react"
import { FormEvent, useRef } from "react"


interface PaymentCardProps {
  handleSubmit: (event?: FormEvent) => void; // Or a more specific return type if needed
}

export default function PaymentCard({ handleSubmit }: PaymentCardProps) {
  const cardNumberRef = useRef(null)
  const ccvRef = useRef(null)
  const expiryMonthRef = useRef(null)
  const expiryYearRef = useRef(null)

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
              <Label htmlFor="card" className="flex items-center gap-2">
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
                  if (e.key === "Enter") {
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
                    if (e.key === "Enter") {
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
                    if (e.key === "Enter") {
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
                    if (e.key === "Enter") {
                      handleSubmit()
                    }
                  }}
                />
              </div>
            </div>
          </div>
        <Button className="w-full mt-4" onClick={handleSubmit}>Pay Now</Button>
        </CardContent>
      </Card>
    </div>
  )
}

