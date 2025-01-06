import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'

export function Movie() {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    The Imitation Game <Button className="w-10">Edit</Button>
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="w-[450px]">
                    <AspectRatio ratio={16 / 9}>
                        <Image
                            src="/core/front/public/image/image1.jpg"
                            alt="Image"
                            className="rounded-md object-cover"
                            width={300}
                            height={250}
                        />
                    </AspectRatio>
                </div>
            </CardContent>

            <CardFooter className="flex justify-between">
                <div className="grid gap-2">
                    <CardDescription>09/11/2001</CardDescription>
                    <CardDescription>2h 1min</CardDescription>
                </div>
            </CardFooter>
        </Card>
    )
}
