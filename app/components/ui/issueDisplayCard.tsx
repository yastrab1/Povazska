import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import ImageCarousel from "@/app/components/ui/imagesCarousel";
import {Issue} from "@/lib/globals";


interface Props {
    data: Issue;
}

export default function IssueDisplayCard({data}: Props) {
    return (
        <Card className="max-w-md mx-auto mt-8 shadow-lg">
            <CardHeader>
                <CardTitle>{data.tags.join(" #")}</CardTitle>

            </CardHeader>
            <CardContent>
                {""}
                <ImageCarousel images={data?.images}/>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    );
}
