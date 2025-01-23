"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Movie {
  id: string
  title: string
  duration: number // in minutes
}

interface AssignScheduleProps {
  isOpen: boolean
  onClose: () => void
  hallId: string
  startTime: string
  onSubmit: (data: ScheduleFormData) => Promise<void>
  movies: Movie[]
}

interface ScheduleFormData {
  movieId: string
  startTime: string
  endTime: string
}

const formSchema = z.object({
  movieId: z.string().min(1, "Please select a movie"),
  startTime: z.string(),
  endTime: z.string(),
})

export function AssignSchedule({ isOpen, onClose, startTime, onSubmit, movies }: AssignScheduleProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      movieId: "",
      startTime: startTime,
      endTime: "",
    },
  })

  useEffect(() => {
    if (selectedMovie) {
      // Calculate end time based on movie duration
      const start = new Date(`2000/01/01 ${startTime}`)
      const end = new Date(start.getTime() + selectedMovie.duration * 60000)
      const endTimeString = end.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      form.setValue("endTime", endTimeString)
    }
  }, [selectedMovie, startTime])

  const handleMovieSelect = (movieId: string) => {
    const movie = movies.find((m) => m.id === movieId)
    setSelectedMovie(movie || null)
    form.setValue("movieId", movieId)
  }

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    await onSubmit(values)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Schedule</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="movieId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movie</FormLabel>
                  <Select onValueChange={handleMovieSelect} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a movie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {movies.map((movie) => (
                        <SelectItem key={movie.id} value={movie.id}>
                          {movie.title} ({movie.duration} mins)
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
                name="startTime"
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
                name="endTime"
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

            {selectedMovie && (
              <div className="text-sm text-muted-foreground">Duration: {selectedMovie.duration} minutes</div>
            )}

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Assign</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

