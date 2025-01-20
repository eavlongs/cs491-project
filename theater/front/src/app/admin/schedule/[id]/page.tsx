'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Toast } from '@/components/ui/toast'

export default function AssignHall({ params }: { params: { id: string } }) {
    const router = useRouter()
    const [isAvailable, setIsAvailable] = useState(true)
    const [startHour, setStartHour] = useState('')
    const [endHour, setEndHour] = useState('')

    const hours = Array.from({ length: 24 }, (_, i) => {
        const hour = i.toString().padStart(2, '0')
        return `${hour}:00`
    })

    const handleAssign = () => {
        if (!startHour || !endHour) {
            Toast({
                variant: 'destructive',
                title: 'Error',
                content: 'Please select both start and end hours',
            })
            return
        }

        const start = parseInt(startHour.split(':')[0])
        const end = parseInt(endHour.split(':')[0])

        if (start >= end) {
            Toast({
                variant: 'destructive',
                title: 'Invalid Time Selection',
                content: 'Start hour must be before end hour',
            })
            return
        }

        // Here you would typically make an API call to save the assignment
        Toast({
            title: 'Success',
            content: 'Hall has been assigned successfully',
        })
        router.push('/')
    }

    return (
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="container mx-auto py-20">
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">
                            Hall {params.id}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="status">Status</Label>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="status"
                                    checked={isAvailable}
                                    onCheckedChange={setIsAvailable}
                                />
                                <span>
                                    {isAvailable ? 'Available' : 'Unavailable'}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="startHour">
                                        Start Hour
                                    </Label>
                                    <Select
                                        value={startHour}
                                        onValueChange={setStartHour}
                                    >
                                        <SelectTrigger id="startHour">
                                            <SelectValue placeholder="Select start time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {hours.map((hour) => (
                                                <SelectItem
                                                    key={hour}
                                                    value={hour}
                                                >
                                                    {hour}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="endHour">End Hour</Label>
                                    <Select
                                        value={endHour}
                                        onValueChange={setEndHour}
                                    >
                                        <SelectTrigger id="endHour">
                                            <SelectValue placeholder="Select end time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {hours.map((hour) => (
                                                <SelectItem
                                                    key={hour}
                                                    value={hour}
                                                >
                                                    {hour}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" onClick={handleAssign}>
                            Assign Hall
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
