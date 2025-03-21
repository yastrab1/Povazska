'use client'
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import ImageCarousel from "@/app/components/ui/imagesCarousel";
import {Issue} from "@/lib/globals";
import getIssue from "@/lib/firebase/issueGet";
import {ReactNode, useEffect, useState} from "react";


interface Props {
    id: string;
    children?: ReactNode;
}

export default function IssueDisplayCard({id,children}: Props) {

    const [data,setData] = useState<Issue>();
    useEffect(() => {
        getIssue<Issue>(id).then((data) => setData(data as Issue))
    }, []);



    return (
        <Card className="max-w-md mx-auto mt-8 shadow-lg ">
            <CardHeader className={"text-black"}>
                <CardTitle>{data?.tags.join(" #")}</CardTitle>

            </CardHeader>
            <CardContent>
                {""}
                <ImageCarousel images={data?.images}/>
                {children}
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    );
}
