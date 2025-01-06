"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard } from "lucide-react";

interface PaymentCardProps {
    totalAmount: number;
    bookingDetails: {
        seats: string[];
        movieTitle: string;
        showTime: string;
        showDate: string;
        hallName: string;
    };
}

export function PaymentCard({ totalAmount, bookingDetails }: PaymentCardProps) {
    const router = useRouter();
    const [cardNumber, setCardNumber] = useState("");
    const [cvv, setCvv] = useState("");
    const [expiryMonth, setExpiryMonth] = useState("");
    const [expiryYear, setExpiryYear] = useState("");

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
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="1234 5678 9012 3456"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <Input
                                    id="cvv"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    maxLength={3}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="month">Month</Label>
                                <Input
                                    id="month"
                                    value={expiryMonth}
                                    onChange={(e) =>
                                        setExpiryMonth(e.target.value)
                                    }
                                    placeholder="MM"
                                    maxLength={2}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="year">Year</Label>
                                <Input
                                    id="year"
                                    value={expiryYear}
                                    onChange={(e) =>
                                        setExpiryYear(e.target.value)
                                    }
                                    placeholder="YY"
                                    maxLength={2}
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
                        <span>{bookingDetails.seats.join(", ")}</span>
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
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="flex-1"
                            onClick={() => router.push("/confirmation")}
                        >
                            CHECK OUT
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
