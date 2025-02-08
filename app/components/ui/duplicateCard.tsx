import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Issue} from "@/lib/globals";
import Image from "next/image";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import Link from "next/link";
import {Button} from "@/components/ui/button";


export default function DuplicateCard({issue}:{issue:Issue}){
    if (!issue){
        return <></>
    }
    let title = issue.title;
    if (title == ""){
        title = issue.tags.join(" ")
    }
    return <Card>
        <CardHeader>
            {title}
        </CardHeader>
        <CardContent>
            <Carousel>
                <CarouselContent>
                    {issue.images?.map((image,index)=> <CarouselItem key={index}>
                        <Link href={image} rel="noopener noreferrer" target={"_blank"}>
                            <Image src={image} alt={""} width={100} height={100}/>
                        </Link>
                        <Button className={"mt-10"}>Mark as duplicate of this issue</Button>
                    </CarouselItem>)}
                </CarouselContent>
            </Carousel>
        </CardContent>
    </Card>
}