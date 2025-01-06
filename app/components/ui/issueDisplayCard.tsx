import { auth } from "@/app/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
    Card,
    CardHeader,
    CardDescription,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { addIssue } from "@/lib/firebase/issueUpload";
import { Data } from "@/app/page";
import {Input} from "@/components/ui/input";
import ImageCarousel from "@/app/components/ui/imagesCarousel";


interface Props {
    data: Data|null;
}

export default function IssueDisplayCard({ data }: Props) {
    return (
    <Card className="max-w-md mx-auto mt-8 shadow-lg">
        <CardHeader>
            <CardTitle>{data?data.title : ""}</CardTitle>

        </CardHeader>
    <CardContent>
        {data?data.description : ""}
        <ImageCarousel images={data?.images}/>
    </CardContent>
    <CardFooter>
    </CardFooter>
    </Card>
);
}
