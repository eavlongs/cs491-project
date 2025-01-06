"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SeatProps {
    id: string;
    isAvailable: boolean;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

const Seat = ({ id, isAvailable, isSelected, onSelect }: SeatProps) => {
    return (
        <button
            onClick={() => isAvailable && onSelect(id)}
            className={cn(
                "w-12 h-12 border-2 rounded-lg flex items-center justify-center transition-colors",
                isAvailable
                    ? isSelected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-green-500 hover:bg-green-100"
                    : "border-red-500 bg-red-100 cursor-not-allowed"
            )}
            disabled={!isAvailable}
        >
            {id}
        </button>
    );
};

interface SeatSelectionCardProps {
    movieTitle: string;
    showTime: string;
    showDate: string;
    hallName: string;
    seatPrice: number;
}

export function SeatSelectionCard({
    movieTitle,
    showTime,
    showDate,
    hallName,
    seatPrice,
}: SeatSelectionCardProps) {
    const router = useRouter();
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const seats = [
        { id: "H6", available: true },
        { id: "H7", available: true },
        { id: "H8", available: true },
        { id: "H9", available: false },
        { id: "I1", available: true },
        { id: "I2", available: false },
        { id: "I3", available: true },
        { id: "I4", available: true },
        { id: "I5", available: true },
    ];

    const handleSeatSelect = (seatId: string) => {
        setSelectedSeats((prev) =>
            prev.includes(seatId)
                ? prev.filter((id) => id !== seatId)
                : [...prev, seatId]
        );
    };

    const totalPrice = selectedSeats.length * seatPrice;

    return (
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
                                isAvailable={seat.available}
                                isSelected={selectedSeats.includes(seat.id)}
                                onSelect={handleSeatSelect}
                            />
                        ))}
                    </div>
                    <p className="text-center font-medium">
                        Regular Seat ${seatPrice.toFixed(2)}
                    </p>
                </CardContent>
            </Card>

            <Card className="w-80">
                <CardContent className="p-6 space-y-6">
                    <h3 className="font-semibold">Selected Seats</h3>
                    <div className="flex justify-between items-center">
                        <span>{selectedSeats.join(", ")}</span>
                        <span>{selectedSeats.length}x</span>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Movie:</span>
                            <span>{movieTitle}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Time:</span>
                            <span>{showTime}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Date:</span>
                            <span>{showDate}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Hall:</span>
                            <span>{hallName}</span>
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
                            onClick={() => setSelectedSeats([])}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="flex-1"
                            onClick={() => router.push("/checkout")}
                            disabled={selectedSeats.length === 0}
                        >
                            PAY
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
