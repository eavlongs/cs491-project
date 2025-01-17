import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
        {
            label: 'Link Movie',
        },
    ],
}

export function EditMovie({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card className="">
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
                                    Edit Movie
                                </h1>
                            </div>
                            {data.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-2 gap-4"
                                >
                                    <div className="flex items-center">
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
                                    />
                                </div>
                            ))}
                        </div>
                    </form>
                </CardContent>
                <div className="w-full flex p-4">
                    <Button
                        type="submit"
                        variant="destructive"
                        className="w-16"
                    >
                        Delete
                    </Button>
                    <div className="w-full flex flex-row-reverse ">
                        <Button type="submit" className="w-16 ">
                            Create
                        </Button>
                        <div className="pr-10">
                            <Button
                                type="submit"
                                variant="outline"
                                className="w-16"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
