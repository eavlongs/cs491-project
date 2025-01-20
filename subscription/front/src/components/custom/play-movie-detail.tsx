"use client"

import Image from "next/image"
import { Star } from "lucide-react"

interface MovieDetailsProps {
  movie: {
    title: string
    rating: number
    reviews: number
    duration: string
    releaseDate: string
    directors: string
    cast: string
    genre: string
    ageRestriction: string
    description: string
    posterUrl: string
  }
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="aspect-[3/4] relative">
            <Image
              src={movie.posterUrl || "/placeholder.svg"}
              alt={movie.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{movie.rating}</span>
                <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                <span className="text-gray-600">({movie.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1  gap-4">
            <div className="space-y-4">
              <div>
                <span className="font-semibold">Title: </span>
                <span>{movie.title}</span>
              </div>
              <div>
                <span className="font-semibold">Duration: </span>
                <span>{movie.duration}</span>
              </div>
              <div>
                <span className="font-semibold">Release Date: </span>
                <span>{movie.releaseDate}</span>
              </div>
              <div>
                <span className="font-semibold">Directors: </span>
                <span>{movie.directors}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="font-semibold">Cast: </span>
                <span>{movie.cast}</span>
              </div>
              <div>
                <span className="font-semibold">Genre: </span>
                <span>{movie.genre}</span>
              </div>
              <div>
                <span className="font-semibold">Age Restriction: </span>
                <span>{movie.ageRestriction}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-semibold">Description:</h2>
            <p className="text-gray-700 leading-relaxed">{movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

