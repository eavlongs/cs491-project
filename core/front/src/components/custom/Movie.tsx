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
import Link from 'next/link'

export function Movie() {
    return (
        <Link href="/admin/movie/1">
            <Card className="w-[350px] hover:cursor-pointer">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        The Imitation Game{' '}
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="h-[450px]">
                        <AspectRatio ratio={2 / 3}>
                            <Image
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPgESi2rO2Mj8F3_EFLgxxd7rtsBF_55Hh5A&s"
                                alt="Image"
                                className="rounded-md object-cover"
                                fill
                            />
                        </AspectRatio>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                    <div className="grid gap-2">
                        <CardDescription>09/11/2001</CardDescription>
                        <CardDescription>2 hours</CardDescription>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}
