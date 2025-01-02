import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import Image from "next/image"


export function Movie() {
    return (
        <Card className="w-[350px]">

            <CardHeader>
                <CardTitle className="flex justify-between items-center">The Imitation Game <Button className="w-10">Edit</Button></CardTitle>
                
            </CardHeader>

            <CardContent>
            </CardContent>

            <CardFooter className="flex justify-between">
            </CardFooter>
        </Card>
    );
}
