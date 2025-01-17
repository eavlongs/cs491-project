import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const data = {
    items: [
        {
            label: ' Title',
        },
        {
            label: ' Duration',
        },
        {
            label: 'Release Date',
        },
        {
            label: 'Directors',
        },
        {
            label: 'Cast',
        },
        {
            label: 'Genre',
        },
        {
            label: 'Age Restriction',
        },
        {
            label: 'Description',
        },
    ],
}

export function AddMovieForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div className={cn('flex gap-6', className)} {...props}>
            <Card className="p-4">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <div className="p-4 flex flex-col items-center justify-center gap-4">
                        <div className="w-full h-full bg-gray-300 rounded-md flex items-center justify-center">
                            <span className=" text-gray-500">
                                Image Placeholder
                            </span>
                        </div>
                        <Button variant="ghost" className="w-12">
                            Image
                        </Button>
                    </div>
                    <form className="p-6 md:p-8 ">
                        <div className="flex flex-col gap-6 mb-4">
                            <div className="flex flex-col items-center text-center">
                                <h1 className="text-2xl font-bold">
                                    Add Movie
                                </h1>
                            </div>
                            {data.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-7 gap-4"
                                >
                                    <div className="flex items-center col-span-2">
                                        <Label
                                            htmlFor={item.label
                                                .replace(/\s+/g, '')
                                                .toLowerCase()}
                                        >
                                            {item.label}:
                                        </Label>
                                    </div>
                                    <Input
                                        id={item.label
                                            .replace(/\s+/g, '')
                                            .toLowerCase()}
                                        type="text"
                                        required
                                        className="col-span-5"
                                    />
                                </div>
                            ))}
                        </div>
                    </form>
                </CardContent>
                <div className="flex justify-end gap-x-4">
                    <Button variant="outline" className="w-16">
                        Cancel
                    </Button>

                    <Button className="w-16">Create</Button>
                </div>
            </Card>
        </div>
    )
}
