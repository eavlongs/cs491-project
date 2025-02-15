'use client'
import { ApiResponse, Movie } from '@/app/types'
import { apiUrl } from '@/app/utils'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

export function EditMovieForm({
    movie,
    className,
    token,
    ...props
}: React.ComponentProps<'div'> & {
    movie: Movie
    token: string
}) {
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
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
    const mbIdRef = useRef<HTMLInputElement>(null)
    const videoUrlRef = useRef<HTMLInputElement>(null)
    const [posterUrl, setPosterUrl] = useState(movie.poster_url)

    const session = useSession()
    const router = useRouter()

    const data = {
        items: [
            {
                label: ' Title',
                ref: titleRef,
                defaultValue: movie.title,
            },
            {
                label: ' Duration',
                ref: durationRef,
                defaultValue: movie.movie_duration.toString(),
            },
            {
                label: 'Release Date',
                ref: releaseDateRef,
                defaultValue: new Date(movie.release_date)
                    .toISOString()
                    .split('T')[0],
            },
            {
                label: 'Directors',
                ref: directorsRef,
                defaultValue: movie.directors,
            },
            {
                label: 'Cast',
                ref: castRef,
                defaultValue: movie.cast,
            },
            {
                label: 'Genres',
                ref: genresRef,
                defaultValue: movie.genres,
            },
            {
                label: 'Age Restriction',
                ref: ageRestrictionRef,
                defaultValue: movie.age_restriction.toString(),
            },
            {
                label: 'Description',
                ref: descriptionRef,
                defaultValue: movie.description,
            },
            {
                label: 'Link Movie',
                ref: mbIdRef,
                defaultValue: movie.mb_id || '', // Use empty string as default if null
            },
            {
                label: 'Video URL',
                ref: videoUrlRef,
                defaultValue: movie.video_url || '', // Use empty string as default if null
            },
        ],
    }

    async function editMovie() {
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
        const mbId = mbIdRef.current?.value
        const videoUrl = videoUrlRef.current?.value
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

        const response = await fetch(`${apiUrl}/movies/${movie.id}`, {
            headers: {
                Authorization: `Bearer ${session.data?.token}`,
                'Content-Type': 'application/json',
            },
            method: 'PATCH',
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
                mb_id: mbId,
                video_url: videoUrl,
            }),
        })

        const json: ApiResponse = await response.json()

        if (!response.ok) {
            alert(json.message)
        } else {
            router.push('/admin')
        }
    }

    async function deleteMovie() {
        const response = await fetch(`${apiUrl}/movies/${movie.id}`, {
            headers: {
                Authorization: `Bearer ${session.data?.token}`,
            },
            method: 'DELETE',
        })

        const json: ApiResponse = await response.json()

        if (!response.ok) {
            alert(json.message)
            return
        }

        router.push('/admin')
    }

    return (
        <>
            <div className={cn('flex gap-6', className)} {...props}>
                <Card className="p-4">
                    <CardContent className="grid p-0 md:grid-cols-2">
                        <div className="p-4 flex flex-col items-center justify-center gap-4">
                            <div className="relative aspect-[2/3] min-h-[25rem] h-full">
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
                                defaultValue={movie.poster_url}
                            />
                        </div>
                        <form className="p-6 md:p-8 ">
                            <div className="flex flex-col gap-x-6 gap-y-2 mb-4">
                                <div className="flex flex-col items-center text-center">
                                    <h1 className="text-2xl font-bold">
                                        Edit Movie
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
                                            defaultValue={item.defaultValue}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    editMovie()
                                                }
                                            }}
                                            className="col-span-5"
                                        />
                                    </div>
                                ))}
                            </div>
                        </form>
                    </CardContent>
                    <div className="flex justify-between gap-x-4">
                        <Button
                            variant="outline"
                            type="button"
                            className="w-16"
                        >
                            Cancel
                        </Button>

                        <div className="flex gap-x-4">
                            <Button
                                variant="destructive"
                                className="w-16"
                                onClick={() => setDeleteConfirmationOpen(true)}
                            >
                                Delete
                            </Button>
                            <Button
                                className="w-16"
                                type="button"
                                onClick={editMovie}
                            >
                                Update
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            <AlertDialog
                open={deleteConfirmationOpen}
                onOpenChange={setDeleteConfirmationOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to delete this movie?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the movie from the database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setDeleteConfirmationOpen(false)}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={deleteMovie}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
