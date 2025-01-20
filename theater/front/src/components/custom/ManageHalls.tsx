'use client'

import { createHall, deleteHall, editHall } from '@/app/admin/hall/actions'
import { ActionResponse, Hall } from '@/app/types'
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
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
    name: z.string().min(1, 'Hall name is required'),
    seat_price: z
        .string()
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: 'Seat price must be a positive number',
        }),
})

export default function ManageHalls({ halls }: { halls: Hall[] }) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editingHall, setEditingHall] = useState<Hall | null>(null)
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const [deletingHall, setDeletingHall] = useState<Hall | null>(null)
    const itemsPerPage = 10
    const session = useSession()

    const openEditDialog = (hall: Hall) => {
        setEditingHall(hall)
        setIsEditOpen(true)
    }

    const openDeleteConfirm = (hall: Hall) => {
        setDeletingHall(hall)
        setDeleteConfirmOpen(true)
    }

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Halls</h1>
                <CreateHall token={session.data?.token || ''} />
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
                    {halls.map((hall) => (
                        <TableRow key={hall.id}>
                            <TableCell>{hall.id}</TableCell>
                            <TableCell>{hall.name}</TableCell>
                            <TableCell>${hall.seat_price.toFixed(1)}</TableCell>
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
                                        onClick={() => openDeleteConfirm(hall)}
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

            <EditHall
                isOpen={isEditOpen}
                setOpen={setIsEditOpen}
                hall={editingHall}
                token={session.data?.token || ''}
            />

            <DeleteHall
                isOpen={deleteConfirmOpen}
                setOpen={setDeleteConfirmOpen}
                hall={deletingHall}
                token={session.data?.token || ''}
            />
        </div>
    )
}

function CreateHall({ token }: { token: string }) {
    const [isOpen, setOpen] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            seat_price: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const actionResponse: ActionResponse = await createHall(
            {
                name: values.name,
                seat_price: parseFloat(values.seat_price),
            },
            token
        )

        if (actionResponse.success) {
            form.reset()
            setOpen(false)
            return
        }

        alert(actionResponse.message)
    }
    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
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
                        <Label htmlFor="seat_price">Seat Price</Label>
                        <Input
                            id="seat_price"
                            {...form.register('seat_price')}
                            placeholder="Enter seat price"
                            type="number"
                            step="0.1"
                        />
                        {form.formState.errors.seat_price && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.seat_price.message}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button>Add Hall</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function EditHall({
    isOpen,
    setOpen,
    hall,
    token,
}: {
    isOpen: boolean
    setOpen: (open: boolean) => void
    hall: Hall | null
    token: string
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            seat_price: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!hall) return
        const actionResponse: ActionResponse = await editHall(
            hall.id,
            {
                name: values.name,
                seat_price: parseFloat(values.seat_price),
            },
            token
        )
        if (actionResponse.success) {
            form.reset()
            setOpen(false)
            return
        }

        alert(actionResponse.message)
    }

    useEffect(() => {
        if (isOpen && hall) {
            form.reset({
                name: hall.name,
                seat_price: hall.seat_price.toString(),
            })
        }
    }, [isOpen])

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
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
                        <Label htmlFor="edit-seat_price">Seat Price</Label>
                        <Input
                            id="edit-seat_price"
                            {...form.register('seat_price')}
                            placeholder="Enter seat price"
                            type="number"
                            step="0.1"
                        />
                        {form.formState.errors.seat_price && (
                            <p className="text-sm text-red-500">
                                {form.formState.errors.seat_price.message}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button>Save Changes</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

function DeleteHall({
    isOpen,
    setOpen,
    hall,
    token,
}: {
    isOpen: boolean
    setOpen: (open: boolean) => void
    hall: Hall | null
    token: string
}) {
    async function handleDelete() {
        if (!hall) return
        const actionResponse: ActionResponse = await deleteHall(hall.id, token)
        if (actionResponse.success) {
            setOpen(false)
            return
        }

        alert(actionResponse.message)
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setOpen}>
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
                    <AlertDialogCancel onClick={() => setOpen(false)}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => handleDelete()}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
