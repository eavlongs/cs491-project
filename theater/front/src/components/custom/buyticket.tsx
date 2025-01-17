'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
} from '@/components/ui/select'

const data = {
    items: [
        {
            label: 'Title',
            detail: 'JoJos bizarre adventure',
        },
        {
            label: ' Duration',
            detail: '2 Hours',
        },
        {
            label: 'Release Date',
            detail: '12/01/1998',
        },
        {
            label: 'Directors',
            detail: 'Hirohiko Arak',
        },
        {
            label: 'Cast',
            detail: 'Jojo',
        },
        {
            label: 'Genre',
            detail: 'Adventure',
        },
        {
            label: 'Age Restriction',
            detail: '13+',
        },
        {
            label: 'Description',
            detail: "JoJo's Bizarre Adventure is a Japanese manga series written and illustrated by Hirohiko Araki.",
        },
    ],
    options: [
        { label: 'Hall A, Time: 21:00 - 22:00', value: 'hall_a_21_22' },
        { label: 'Hall B, Time: 19:00 - 20:00', value: 'hall_b_19_20' },
        { label: 'Hall C, Time: 16:00 - 17:00', value: 'hall_c_16_17' },
    ],
}

export function MovieDetail({ ...props }) {
    return (
        <div className={cn('flex flex-col gap-6', props.className)} {...props}>
            <Card className="">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="p-4 flex flex-col items-center justify-center gap-4">
                        <div className="w-full h-full bg-gray-300 rounded-md flex items-center justify-center">
                            <span className=" text-gray-500">
                                Image Placeholder
                            </span>
                        </div>
                    </div>
                    <form className="p-6 md:p-8 ">
                        <div className="flex flex-col gap-6 mb-4">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold mb-2">
                                    Buy Ticket
                                </h1>
                                <div className="flex items-center gap-2">
                                    <div className="flex"></div>
                                </div>
                            </div>
                            {data.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    <div className="flex items-center">
                                        <Label
                                            htmlFor={item.label
                                                .replace(/\s+/g, '')
                                                .toLowerCase()}
                                        >
                                            {item.label}:
                                        </Label>
                                    </div>
                                    <Label
                                        htmlFor={item.detail
                                            .replace(/\s+/g, '')
                                            .toLowerCase()}
                                    >
                                        {item.detail}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </form>
                </CardContent>
                <div className="w-full flex p-4">
                    <Button type="submit" className="w-32">
                        Cancel
                    </Button>
                    <div className="w-full flex flex-row-reverse ">
                        <Button type="submit" className="w-32">
                            Buy
                        </Button>
                        <Select>
                            <SelectTrigger className="w-[180px] mr-5">
                                <SelectValue placeholder="Select Hall & Time" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Halls & Times</SelectLabel>
                                    {data.options.map((option, index) => (
                                        <SelectItem
                                            key={index}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </Card>
        </div>
    )
}
