import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const data = {
    items: [
        {
            label: " Title",
        },
        {
            label: " Duration",
        },
        {
            label: "Release Date",
        },
        {
            label: "Directors",
        },
        {
            label: "Cast",
        },
        {
            label: "Genre",
        },
        {
            label: "Age Restriction",
        },
        {
            label: "Description",
        },
    ],
};

export function AddMovieForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="/placeholder.svg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                            width={100}
                            height={330}
                        />
                    </div>
                    <form className="p-6 md:p-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">
                                    Add Movie
                                </h1>
                            </div>
                                {data.items.map((item, index) => (
                                    <div key={index} className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center">
                                            <Label htmlFor={item.label.replace(/\s+/g, "").toLowerCase()}>
                                                {item.label}:
                                            </Label>
                                        </div>
                                        <Input
                                            id={item.label.replace(/\s+/g, "").toLowerCase()}
                                            type="text"
                                            required
                                        />
                                    </div>
                                ))}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}