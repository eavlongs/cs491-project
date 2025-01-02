import { AppSidebar } from "@/components/custom/app-sidebar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {Movie} from "@/components/custom/movies"

export default function Page() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "19rem",
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    Logo
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                            <Movie></Movie>
                        
                        
                        <div className="w-1/2 h-80 rounded-xl bg-muted/50" />
                        <div className="w-1/2 h-80 rounded-xl bg-muted/50" />
                    </div>
                   
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
