"use client";

import React, {useEffect, useState} from "react";
import {auth} from "@/app/config/firebase";
import {onAuthStateChanged} from "firebase/auth";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {Textarea} from "@/components/ui/textarea";
import {addIssue} from "@/lib/firebase/issueUpload";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import ImageCarousel from "@/app/components/ui/imagesCarousel";
import {Data, Issue} from "@/lib/globals";
import {Timestamp} from "firebase/firestore";
import {Separator} from "@/components/ui/separator";
import DuplicateCard from "@/app/components/ui/duplicateCard";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";

interface Props {
    data: Data;
}

function constructIssueFromData(data: Data): Issue {
    return {
        title: data.title,
        description: data.description,
        tags: data.userSelectedTags,
        timestamp: Timestamp.now(),
        images: data.images,
        lat: data.lat,
        lng: data.lng,
        status: "open",
        resolve: ""
    } as Issue;
}

export default function PersonalInfoCard({data}: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");

    const shouldLetUserWriteOwnDescription = data.userSelectedTags.length === 0;
    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setName(user.displayName || "");
                setEmail(user.email || "");
            }
        });
    }, []);

    const form = useForm({
        defaultValues: {
            popis: "",
        },
    });

    return (
        <Card className="max-w-md mx-auto mt-8 shadow-lg border border-black bg-[#00A84E] text-white font-petrzalka">
            <CardHeader>
                {shouldLetUserWriteOwnDescription ? (
                    <Input
                        alt="Zadaj krátky popis tvojho problému"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        className="w-full h-12 rounded-md border border-black px-4 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-[#00A84E] focus:outline-none"
                    />
                ) : (
                    <CardTitle>{"#" + data.userSelectedTags.join(" #")}</CardTitle>
                )}
                <CardDescription>{name + " --- " + email}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="popis"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-lg font-semibold">Popis</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        className="w-full h-24 rounded-md border border-black px-4 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-[#00A84E] focus:outline-none"
                                    />
                                </FormControl>
                                <FormDescription className="text-sm text-gray-300">Zadaj popis k
                                    podnetu.</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </Form>
                <ImageCarousel images={data.images}/>
                <Separator/>
                <h1 className="text-lg font-semibold">Potential duplicates</h1>
                <Carousel>
                    <CarouselContent>
                        {data.duplicates.map((duplicate, index) => (
                            <CarouselItem key={index}>
                                <DuplicateCard issue={duplicate}/>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={() => {
                        if (shouldLetUserWriteOwnDescription) {
                            data.title = title;
                        }
                        data.description = form.getValues().popis;
                        const issue = constructIssueFromData(data);
                        addIssue(JSON.stringify(issue)).then(async (id) => {
                            const obj = {
                                issueID: id,
                                issueJSON: issue,
                            };
                            console.log(data)
                            console.log(JSON.stringify(obj));
                            fetch("/api/resolve/", {
                                method: "POST",
                                body: JSON.stringify(obj),
                            });
                            router.push(`/issues/${id}`);
                        });
                    }}
                    className="w-full h-12 bg-black text-white font-bold rounded-md hover:bg-gray-800"
                >
                    Upload Images!
                </Button>
            </CardFooter>
        </Card>
    );
}