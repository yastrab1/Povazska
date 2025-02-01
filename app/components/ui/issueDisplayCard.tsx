import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {Data} from "@/app/page";
import ImageCarousel from "@/app/components/ui/imagesCarousel";


interface Props {
    data: Data | null;
}

export default function IssueDisplayCard({data}: Props) {
    return (
        <Card className="max-w-md mx-auto mt-8 shadow-lg">
            <CardHeader>
                <CardTitle>{data?.userSelectedTags.join(" #")}</CardTitle>

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
