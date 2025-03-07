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
import styles from "../design/styles";

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

    function handleIssueUpload() {
        if (!data.readyToUpload) {
            console.log("not finished uploading to firebase")
            return;
        }
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
            await fetch("/api/resolve/", {
                method: "POST",
                body: JSON.stringify(obj),
            });
            router.push(`/issues/${id}`);
        });
    }

    return (
        <div className={styles.container}>

      <CardHeader className={styles.cardHeader}>
        {/* User Info Section */}
        <div className={styles.userInfoContainer}>
            <p className={styles.userName}>{name}</p>
            <p className={styles.userEmail}>{email}</p>
        </div>

        {/* Tag Selection */}
        {shouldLetUserWriteOwnDescription ? (
            <Input
            alt="Zadaj krátky popis tvojho problému"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={styles.inputField}
            placeholder="Napíš vlastné tagy..."
            />
        ) : data.userSelectedTags.length > 0 ? (
            <div className={styles.tagContainer}>
            {data.userSelectedTags.map((tag) => (
                <span key={tag} className={styles.tagPill}>#{tag}</span>
            ))}
            </div>
        ) : (
            <p className={styles.noTagsText}>Žiadne tagy neboli vybrané.</p>
        )}

<Separator className={styles.separator} />

        </CardHeader>



      <CardContent>
            <Form {...form}>
    <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Chcete podrobnejšie vysvetliť váš problém?</h2>
        <p className={styles.formSubtitle}>
        Ak je to potrebné, môžete sem pridať dodatočný popis.
        </p>
    </div>

    <FormField
        control={form.control}
        name="popis"
        render={({ field }) => (
        <FormItem>
            <FormLabel className={styles.formLabel}>Podrobný Popis</FormLabel>
            <FormControl>
            <Textarea
                {...field}
                className={styles.textarea}
                placeholder="Tu môžete podrobnejšie opísať váš problém..."
            />
            </FormControl>
            
            <FormMessage />
        </FormItem>
        )}
    />
    </Form>

    <Separator className={styles.separator} />

        <ImageCarousel images={data.images} />
        <Separator className={styles.separator} />

        <h1 className={styles.sectionTitle}>Potential duplicates</h1>
        <Carousel>
          <CarouselContent>
            {data.duplicates.map((duplicate, index) => (
              <CarouselItem key={index}>
                <DuplicateCard issue={duplicate} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleIssueUpload}
          className={styles.buttonPrimary}
          disabled={!data.readyToUpload}
        >
          Upload Images!
        </Button>
      </CardFooter>
    </div>
    
    );
}