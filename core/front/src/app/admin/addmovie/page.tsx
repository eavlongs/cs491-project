import { AppSidebar } from "@/components/custom/app-sidebar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Movie } from "@/components/custom/movies";
import { AddMovieForm } from "@/components/custom/addmovieForm";

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
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
                            <div className="w-full max-w-sm md:max-w-3xl">
                                <AddMovieForm></AddMovieForm>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
