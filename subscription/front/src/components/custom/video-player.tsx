'use client'

import { Play } from 'lucide-react'

interface VideoPlayerProps {
    videoUrl?: string
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
    return (
        <div className="max-w-2xl mx-auto">
            <div className="relative w-full aspect-video bg-gray-200 rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        className="w-16 h-16 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                        onClick={() => {
                            // Handle video playback
                            console.log('Play video:', videoUrl)
                        }}
                    >
                        <Play className="w-8 h-8 text-white fill-current" />
                    </button>
                </div>
            </div>
        </div>
    )
}
