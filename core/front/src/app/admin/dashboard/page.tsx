import type React from 'react'
import { Users, Film, PlaySquare, UserCheck } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminDashboard() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Users" value="10,483" icon={Users} />
                <StatCard title="Total Movies" value="2,345" icon={Film} />
                <StatCard
                    title="Rented Movies"
                    value="1,274"
                    icon={PlaySquare}
                />
                <StatCard
                    title="Movie Subscribers"
                    value="8,901"
                    icon={UserCheck}
                />
            </div>
        </div>
    )
}

interface StatCardProps {
    title: string
    value: string
    icon: React.ElementType
}

function StatCard({ title, value, icon: Icon }: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    )
}
