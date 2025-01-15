import { EditMovie } from '@/components/custom/editmovieForm'

export default function Page() {
    return (
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <div className="flex flex-col items-center justify-center bg-muted p-6 md:p-5">
                        <EditMovie></EditMovie>
                    </div>
                </div>
            </div>
        </div>
    )
}
