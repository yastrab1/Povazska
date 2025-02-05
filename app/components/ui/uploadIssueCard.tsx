"use client";

import React, {useEffect, useState} from "react";
import {auth} from "@/app/config/firebase";
import {onAuthStateChanged} from "firebase/auth";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {Textarea} from "@/components/ui/textarea";
import {addIssue, addSuggestedResolve} from "@/lib/firebase/issueUpload";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import ImageCarousel from "@/app/components/ui/imagesCarousel";
import {Data, Issue} from "@/lib/globals";
import {Timestamp} from "firebase/firestore";

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
    } as Issue
}

export default function PersonalInfoCard({data}: Props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");


    const shouldLetUserWriteOwnDescription = (data.userSelectedTags.length == 0)
    const router = useRouter();

    useEffect(() => {
        // Fetch user data from Firebase Auth if logged in
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setName(user.displayName || "");
                setEmail(user.email || "");
            }
        });
    });

    const form = useForm({
        defaultValues: {
            popis: "", // Default popis to data.description
        },
    });

    return (
        <Card className="max-w-md mx-auto mt-8 shadow-lg">
            <CardHeader>
                {shouldLetUserWriteOwnDescription ? <Input alt={"Zadaj krátky popis tvojho problému"} value={title}
                                                           onChange={event => setTitle(event.target.value)}></Input>
                    : <CardTitle>{"#" + data.userSelectedTags.join(" #")}</CardTitle>}

                <CardDescription>{name + " --- " + email}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="popis"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Popis</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormDescription>Zadaj popis k podnetu.</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </Form>
                <ImageCarousel images={data.images}/>
            </CardContent>
            <CardFooter>
                <Button onClick={() => {
                    if (shouldLetUserWriteOwnDescription) {
                        data.title = title;
                    }
                    data.description = form.getValues().popis;
                    const issue = constructIssueFromData(data);
                    addIssue(JSON.stringify((issue))).then(async id => {
                        await addSuggestedResolve(id, JSON.stringify(issue))
                        router.push(`/issues/${id}`)
                    });

                }}>Upload Images!</Button>
            </CardFooter>
        </Card>
    );
}
