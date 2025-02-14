import { MovieDetails } from "@/components/custom/play-movie-detail"
import { VideoPlayer } from "@/components/custom/video-player"

const movieData = {
  title: "Jojo's bizarre adventure",
  rating: 4.6,
  reviews: 1242,
  duration: "2 Hours",
  releaseDate: "12/01/1998",
  directors: "Hirohiko Arak",
  cast: "Jojo",
  genre: "Adventure",
  ageRestriction: "13 ",
  description:
    "JoJo's Bizarre Adventure is a Japanese manga series written and illustrated by Hirohiko Araki. It was originally serialized in Shueisha's shōnen manga",
  posterUrl: "/placeholder.svg",
}

export default function MoviePage() {
  return (
    <div className="min-h-screen bg-white space-y-8 py-8">
      <VideoPlayer videoUrl="https://youtu.be/NJfD9k9kSPo?si=FCIJKxTaQ5-FOufB" />
      <MovieDetails movie={movieData} />
    </div>
  )
}

