import { MovieDetail } from '@/components/custom/MovieDetail'
export default function Page() {
    return (
        <div className="min-h-[100vh] rounded-xl md:min-h-min flex justify-center">
            <div className="w-2/3">
                <MovieDetail />
            </div>
        </div>
    )
}
