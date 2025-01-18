'use client'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { DateSelector } from '@/components/custom/date-box'

interface TimeSlot {
    time: string
    status: 'available' | 'unavailable' | 'scheduled'
}

interface Hall {
    id: string
    name: string
    status: 'inactive' | 'active'
    timeSlots: TimeSlot[]
}



const halls: Hall[] = [
    {
        id: 'b1',
        name: 'HALL B1',
        status: 'active',
        timeSlots: [
            { time: '2:00-3:00', status: 'scheduled' },
            { time: 'Unavailable', status: 'unavailable' },
        ],
    },
    {
        id: 'b2',
        name: 'Hall B2',
        status: 'inactive',
        timeSlots: [{ time: 'Click to Assign', status: 'available' }],
    },
    {
        id: 'b3',
        name: 'Hall B3',
        status: 'inactive',
        timeSlots: [{ time: 'Click to Assign', status: 'available' }],
    },
    {
        id: 'b4',
        name: 'Hall B4',
        status: 'active',
        timeSlots: [
            { time: '2:00-3:00', status: 'scheduled' },
            { time: 'Unavailable', status: 'unavailable' },
        ],
    },
    {
        id: 'b5',
        name: 'Hall B5',
        status: 'active',
        timeSlots: [
            { time: '2:00-3:00', status: 'scheduled' },
            { time: 'Unavailable', status: 'unavailable' },
        ],
    },
    {
        id: 'b6',
        name: 'Hall B6',
        status: 'active',
        timeSlots: [
            { time: '2:00-3:00', status: 'scheduled' },
            { time: 'Unavailable', status: 'unavailable' },
        ],
    },
]

export default function Page() {
    const [, setSelectedDate] = useState<string>('25 Dec')
    return (
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="container mx-auto p-6">
                <DateSelector onDateSelect={setSelectedDate} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                    {halls.map((hall) => (
                        <div key={hall.id} className="relative h-full">
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold">
                                        {hall.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <div className="space-y-2">
                                        {hall.timeSlots.map((slot, index) =>
                                            slot.status === 'scheduled' ? (
                                                <div
                                                    key={index}
                                                    className="w-full px-4 py-2 text-center rounded text-black"
                                                >
                                                    {slot.time}
                                                </div>
                                            ) : slot.status ===
                                            'unavailable' ? (
                                                <div
                                                    key={index}
                                                    className="w-full px-4 py-2 text-center rounded text-black"
                                                >
                                                    {slot.time}
                                                </div>
                                            ) : (
                                                <Button
                                                    key={index}
                                                    variant="outline"
                                                    className={cn(
                                                        'w-full justify-center hover:bg-primary hover:text-primary-foreground'
                                                    )}
                                                >
                                                    {slot.time}
                                                </Button>
                                            )
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
