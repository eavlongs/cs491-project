import { Movie } from "@/components/custom/movies";


export default function Page() {
    return (
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3 items-center">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Movie key={index} />
                        ))}
                    </div>
        </div>
    )
}
