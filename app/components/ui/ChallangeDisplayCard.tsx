'use client'
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import ImageCarousel from "@/app/components/ui/imagesCarousel";
import {Challange} from "@/lib/globals";
import getIssue from "@/lib/firebase/issueGet";
import {ReactNode, useEffect, useState} from "react";


interface Props {
    id: string;
    children?: ReactNode;
}

export default function ChallangeDisplayCard({id,children}: Props) {

    const [data,setData] = useState<Challange>();
    useEffect(() => {
        console.log(id)
        getIssue<Challange>(id,"/challanges/").then((data) => setData(data))
    }, [id]);



    return (
        <Card className="max-w-md mx-auto mt-8 shadow-lg ">
            <CardHeader className={"text-black"}>
                <CardTitle>{data?.title}</CardTitle>

            </CardHeader>
            <CardContent>
                {data?.description}
                <ImageCarousel images={data?.images}/>
                {children}
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    );
}
