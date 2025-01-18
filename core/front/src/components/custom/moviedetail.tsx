'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const data = {
    items: [
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
}

export function MovieDetail({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [rating, setRating] = useState(4.6)
    const [hoverRating, setHoverRating] = useState(0)
    const [userRated, setUserRated] = useState(false)
    const totalReviews = 1242
    const stars = 5

    const handleRating = (value: number) => {
        setRating(value)
        setUserRated(true)
    }

    const handleMouseEnter = (value: number) => {
        if (!userRated) {
            setHoverRating(value)
        }
    }

    const handleMouseLeave = () => {
        if (!userRated) {
            setHoverRating(0)
        }
    }

    return (
        <div className={cn('', className)} {...props}>
            <Card>
                <CardContent className="grid p-0 lg:grid-cols-2 mx-4 my-8">
                    <div className="flex items-center justify-center">
                        <div className="relative w-full h-full max-w-[25rem]">
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPgESi2rO2Mj8F3_EFLgxxd7rtsBF_55Hh5A&s"
                                alt="Image"
                                className="rounded-md object-cover w-full"
                                fill
                            />
                        </div>
                    </div>
                    <form className="p-6 md:p-8">
                        <div className="flex flex-col gap-6 mb-4">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold mb-2">
                                    JoJo&apos;s bizarre adventure
                                </h1>
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(stars)].map((_, index) => {
                                            const starValue = index + 1
                                            return (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    className="p-0 hover:scale-110 transition-transform"
                                                    onClick={() =>
                                                        handleRating(starValue)
                                                    }
                                                    onMouseEnter={() =>
                                                        handleMouseEnter(
                                                            starValue
                                                        )
                                                    }
                                                    onMouseLeave={
                                                        handleMouseLeave
                                                    }
                                                >
                                                    <Star
                                                        className={cn(
                                                            'w-5 h-5 transition-colors',
                                                            (hoverRating ||
                                                                rating) >=
                                                                starValue
                                                                ? 'fill-yellow-400 stroke-yellow-400'
                                                                : 'stroke-gray-200 fill-gray-200'
                                                        )}
                                                    />
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <span className="text-sm text-gray-600">
                                        {rating}/5 (
                                        {totalReviews.toLocaleString()} reviews)
                                    </span>
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
                <div className="w-full flex flex-row-reverse p-4 gap-x-6">
                    <Button className="w-32">Watch in Cinema</Button>

                    <Button className="w-32">Buy / Rent Movie</Button>
                    <Button className="w-32">Watch Online</Button>
                </div>
            </Card>
        </div>
    )
}
