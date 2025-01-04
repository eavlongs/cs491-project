import {Movie} from "@/components/custom/movies"

export default function Page() {
    return (
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Movie key={index} />
                        ))}
                    </div>
    );
}
