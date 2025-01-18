import { EditMovieForm } from '@/components/custom/EditMovieForm'

export default function Page() {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] rounded-xl">
            <div className="flex flex-col items-center justify-center px-0 md:px-6 lg:px-10">
                <div className="w-full">
                    <div className="flex flex-col items-center justify-center">
                        <EditMovieForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
