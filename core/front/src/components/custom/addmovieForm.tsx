'use client'
import { ApiResponse } from '@/app/types'
import { apiUrl } from '@/app/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export function AddMovieForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const titleRef = useRef<HTMLInputElement>(null)
    const durationRef = useRef<HTMLInputElement>(null)
    const releaseDateRef = useRef<HTMLInputElement>(null)
    const directorsRef = useRef<HTMLInputElement>(null)
    const castRef = useRef<HTMLInputElement>(null)
    const genresRef = useRef<HTMLInputElement>(null)
    const ageRestrictionRef = useRef<HTMLInputElement>(null)
    const trailerUrlRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLInputElement>(null)

    const posterUrlRef = useRef<HTMLInputElement>(null)
    const [posterUrl, setPosterUrl] = useState('')

    const session = useSession()
    const router = useRouter()

    const data = {
        items: [
            {
                label: ' Title',
                ref: titleRef,
            },
            {
                label: ' Duration',
                ref: durationRef,
            },
            {
                label: 'Release Date',
                ref: releaseDateRef,
            },
            {
                label: 'Directors',
                ref: directorsRef,
            },
            {
                label: 'Cast',
                ref: castRef,
            },
            {
                label: 'Genres',
                ref: genresRef,
            },
            {
                label: 'Age Restriction',
                ref: ageRestrictionRef,
            },
            {
                label: 'Trailer URL',
                ref: trailerUrlRef,
            },
            {
                label: 'Description',
                ref: descriptionRef,
            },
        ],
    }

    async function addMovie() {
        const title = titleRef.current?.value
        const duration = durationRef.current?.value
        const releaseDate = releaseDateRef.current?.value
        const directors = directorsRef.current?.value
        const cast = castRef.current?.value
        const genres = genresRef.current?.value
        const ageRestriction = ageRestrictionRef.current?.value
        const trailerUrl = trailerUrlRef.current?.value
        const description = descriptionRef.current?.value
        const posterUrl = posterUrlRef.current?.value

        const durationInt = parseInt(duration || '', 10)

        if (isNaN(durationInt)) {
            alert('Duration must be a number')
            return
        }

        if (new Date(releaseDate!).toString() === 'Invalid Date') {
            alert('Invalid Release Date')
            return
        }

        // standard format: YYYY-MM-DD
        const releasedDateStandardFormat = new Date(releaseDate!)
            .toISOString()
            .split('T')[0]

        const response = await fetch(`${apiUrl}/movies/create`, {
            headers: {
                Authorization: `Bearer ${session.data?.token}`,
            },
            method: 'POST',
            body: JSON.stringify({
                title,
                movie_duration: durationInt,
                release_date: releasedDateStandardFormat,
                directors,
                cast,
                genres,
                age_restriction: ageRestriction,
                trailer_url: trailerUrl,
                description,
                poster_url: posterUrl,
            }),
        })

        const json: ApiResponse = await response.json()

        if (!response.ok) {
            alert(json.message)
        } else {
            router.push('/admin')
        }
    }

    return (
        <div className={cn('flex gap-6', className)} {...props}>
            <Card className="p-4">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="p-4 flex flex-col items-center justify-center gap-4">
                        <div className="relative aspect-[2/3] min-h-[25rem] h-full ">
                            {posterUrl !== '' ? (
                                <Image
                                    src={posterUrl}
                                    alt="Image"
                                    className="rounded-md object-cover"
                                    fill
                                    unoptimized
                                />
                            ) : (
                                <div
                                    className="w-full h-full bg-gray-300 rounded-md flex items-center justify-center cursor-pointer"
                                    onClick={() =>
                                        posterUrlRef.current?.focus()
                                    }
                                >
                                    <span className=" text-gray-500">
                                        Image
                                    </span>
                                </div>
                            )}
                        </div>

                        <Input
                            id="poster_url"
                            ref={posterUrlRef}
                            onChange={(e) => setPosterUrl(e.target.value)}
                            required
                            placeholder="Poster URL"
                        />
                    </div>
                    <form className="p-6 md:p-8 ">
                        <div className="flex flex-col gap-x-6 gap-y-2 mb-4">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">
                                    Add Movie
                                </h1>
                            </div>
                            {data.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-7 gap-4"
                                >
                                    <div className="flex items-center col-span-2">
                                        <Label
                                            htmlFor={item.label
                                                .replace(/\s+/g, '')
                                                .toLowerCase()}
                                        >
                                            {item.label}:
                                        </Label>
                                    </div>
                                    <Input
                                        id={item.label
                                            .replace(/\s+/g, '')
                                            .toLowerCase()}
                                        type="text"
                                        ref={item.ref}
                                        required
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                addMovie()
                                            }
                                        }}
                                        className="col-span-5"
                                    />
                                </div>
                            ))}
                        </div>
                    </form>
                </CardContent>
                <div className="flex justify-end gap-x-4">
                    <Button variant="outline" type="button" className="w-16">
                        Cancel
                    </Button>

                    <Button className="w-16" type="button" onClick={addMovie}>
                        Create
                    </Button>
                </div>
            </Card>
        </div>
    )
}
