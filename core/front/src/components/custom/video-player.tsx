'use client'

interface VideoPlayerProps {
    videoUrl: string
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
    // Simple function to get video ID from URL
    const getVideoId = (url: string) => {
        try {
            // Handle youtu.be format
            if (url.includes('youtu.be/')) {
                return url.split('youtu.be/')[1].split('?')[0]
            }
            // Handle youtube.com format
            if (url.includes('youtube.com/watch?v=')) {
                return url.split('v=')[1].split('&')[0]
            }
            return null
        } catch {
            return null
        }
    }

    const videoId = getVideoId(videoUrl)

    console.log(videoId)

    if (!videoId) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="relative w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">
                        Please provide a valid YouTube URL
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="relative w-full aspect-video">
                <iframe
                    className="absolute inset-0 w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    )
}
