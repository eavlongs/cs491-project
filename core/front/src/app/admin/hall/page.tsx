'use client'

import { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface Hall {
    id: number
    name: string
    seatPrice: number
}

const formSchema = z.object({
    name: z.string().min(1, 'Hall name is required'),
    seatPrice: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: 'Seat price must be a positive number',
        }),
})

export default function HallsTable() {
    const [halls, setHalls] = useState<Hall[]>([
        { id: 1, name: 'Hall A', seatPrice: 3.5 },
        { id: 2, name: 'IMAX', seatPrice: 5.5 },
        { id: 3, name: 'VIP', seatPrice: 8.5 },
        { id: 4, name: 'Hall B', seatPrice: 4.0 },
        { id: 5, name: 'Hall C', seatPrice: 3.5 },
        { id: 6, name: 'Premium', seatPrice: 7.0 },
        { id: 7, name: 'Hall D', seatPrice: 3.5 },
        { id: 8, name: 'Hall E', seatPrice: 4.0 },
        { id: 9, name: 'Hall F', seatPrice: 4.5 },
        { id: 10, name: 'Hall G', seatPrice: 3.5 },
        { id: 11, name: 'Hall H', seatPrice: 4.0 },
        { id: 12, name: 'Hall I', seatPrice: 4.5 },
    ])
    const [currentPage, setCurrentPage] = useState(1)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editingHall, setEditingHall] = useState<Hall | null>(null)
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const [deletingHallId, setDeletingHallId] = useState<number | null>(null)
    const itemsPerPage = 10

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            seatPrice: '',
        },
    })

    const handleDelete = (id: number) => {
        setHalls(halls.filter((hall) => hall.id !== id))
        setDeleteConfirmOpen(false)
        setDeletingHallId(null)
    }

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (editingHall) {
            setHalls(
                halls.map((hall) =>
                    hall.id === editingHall.id
                        ? {
                              ...hall,
                              name: values.name,
                              seatPrice: Number(values.seatPrice),
                          }
                        : hall
                )
            )
            setIsEditOpen(false)
            setEditingHall(null)
        } else {
            const newHall = {
                id: halls.length + 1,
                name: values.name,
                seatPrice: Number(values.seatPrice),
            }
            setHalls([...halls, newHall])
            setIsAddOpen(false)
        }
        form.reset()
    }

    const openEditDialog = (hall: Hall) => {
        setEditingHall(hall)
        form.reset({
            name: hall.name,
            seatPrice: hall.seatPrice.toString(),
        })
        setIsEditOpen(true)
    }

    const openDeleteConfirm = (id: number) => {
        setDeletingHallId(id)
        setDeleteConfirmOpen(true)
    }

    // Pagination calculations
    const totalPages = Math.ceil(halls.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentHalls = halls.slice(startIndex, endIndex)

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Halls</h1>
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button
                            variant="default"
                            className="bg-black hover:bg-gray-800"
                        >
                            New Hall
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Hall</DialogTitle>
                        </DialogHeader>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    {...form.register('name')}
                                    placeholder="Enter hall name"
                                />
                                {form.formState.errors.name && (
                                    <p className="text-sm text-red-500">
                                        {form.formState.errors.name.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="seatPrice">Seat Price</Label>
                                <Input
                                    id="seatPrice"
                                    {...form.register('seatPrice')}
                                    placeholder="Enter seat price"
                                    type="number"
                                    step="0.1"
                                />
                                {form.formState.errors.seatPrice && (
                                    <p className="text-sm text-red-500">
                                        {
                                            form.formState.errors.seatPrice
                                                .message
                                        }
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsAddOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button>Add Hall</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">No</TableHead>
                        <TableHead>Hall Name</TableHead>
                        <TableHead>Seat Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentHalls.map((hall) => (
                        <TableRow key={hall.id}>
                            <TableCell>{hall.id}</TableCell>
                            <TableCell>{hall.name}</TableCell>
                            <TableCell>${hall.seatPrice.toFixed(1)}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => openEditDialog(hall)}
                                    >
                                        <Pencil className="h-4 w-4" />
                                        <span className="sr-only">Edit</span>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() =>
                                            openDeleteConfirm(hall.id)
                                        }
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="sr-only">Delete</span>
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    <Button
                        variant="outline"
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Button
                                key={i + 1}
                                variant={
                                    currentPage === i + 1
                                        ? 'default'
                                        : 'outline'
                                }
                                onClick={() => setCurrentPage(i + 1)}
                                className="w-8 h-8 p-0"
                            >
                                {i + 1}
                            </Button>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </Button>
                </div>
            )}

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Hall</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Name</Label>
                            <Input
                                id="edit-name"
                                {...form.register('name')}
                                placeholder="Enter hall name"
                            />
                            {form.formState.errors.name && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-seatPrice">Seat Price</Label>
                            <Input
                                id="edit-seatPrice"
                                {...form.register('seatPrice')}
                                placeholder="Enter seat price"
                                type="number"
                                step="0.1"
                            />
                            {form.formState.errors.seatPrice && (
                                <p className="text-sm text-red-500">
                                    {form.formState.errors.seatPrice.message}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsEditOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button>Save Changes</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog
                open={deleteConfirmOpen}
                onOpenChange={setDeleteConfirmOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to delete this hall?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete the hall from the database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setDeleteConfirmOpen(false)}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() =>
                                deletingHallId && handleDelete(deletingHallId)
                            }
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
