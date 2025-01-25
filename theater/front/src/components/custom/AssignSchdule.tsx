'use client'

import { assignSchedule } from '@/app/admin/schedule/actions'
import { Hall, Movie } from '@/app/types'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface AssignScheduleProps {
    hall: Hall
    startTime: Date
    movies: Movie[]
    isOpen: boolean
    setOpen: (open: boolean) => void
    token: string
}

const formSchema = z.object({
    movie_id: z.string().min(1, 'Please select a movie'),
    start_time: z.string().refine(
        (value) => {
            const time = value.split(':')
            return (
                time.length === 2 &&
                time.every((t) => !isNaN(parseInt(t))) &&
                parseInt(time[0]) >= 0 &&
                parseInt(time[0]) < 24 &&
                parseInt(time[1]) >= 0 &&
                parseInt(time[1]) < 60
            )
        },
        {
            message: 'Invalid time format',
        }
    ),
    end_time: z.string(),
})

export function AssignSchedule({
    isOpen,
    setOpen,
    hall,
    startTime,
    movies,
    token,
}: AssignScheduleProps) {
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            movie_id: '',
            start_time:
                startTime.getHours().toString().padStart(2, '0') + ':00',
            end_time: '',
        },
    })

    useEffect(() => {
        if (selectedMovie) {
            // Calculate end time based on movie duration
            console.log(startTime)
            const end = new Date(
                startTime.getTime() + selectedMovie.movie_duration * 60000
            )
            const endTimeString = end.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            })
            form.setValue('end_time', endTimeString)
        }
    }, [selectedMovie, startTime])

    const handleMovieSelect = (movie_id: string) => {
        const movie = movies.find((m) => m.id === movie_id)
        setSelectedMovie(movie || null)
        form.setValue('movie_id', movie_id)
    }

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!selectedMovie) return
        const actionResponse = await assignSchedule(
            selectedMovie,
            hall,
            startTime,
            token
        )

        if (actionResponse.success) {
            setOpen(false)
        } else {
            alert(actionResponse.message)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Assign Schedule</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="movie_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Movie</FormLabel>
                                    <Select
                                        onValueChange={handleMovieSelect}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a movie" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {movies.map((movie) => (
                                                <SelectItem
                                                    key={movie.id}
                                                    value={movie.id}
                                                >
                                                    {movie.title} (
                                                    {movie.movie_duration}{' '}
                                                    minutes)
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="start_time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Time</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="end_time"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>End Time</FormLabel>
                                        <FormControl>
                                            <Input {...field} disabled />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="text-sm">
                            Duration:{' '}
                            {selectedMovie
                                ? selectedMovie.movie_duration
                                : '__'}{' '}
                            minutes
                        </div>

                        <div className="text-sm">
                            Date: {startTime.toLocaleDateString('en-CA')}
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
