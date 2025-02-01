"use client";

import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {Card, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import Image from "next/image";
import {LuImagePlus} from "react-icons/lu";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
import {Button} from "@/components/ui/button";
import {Data} from "@/app/page";
import uploadImages from "@/lib/firebase/imageUpload";

interface Props {
    setState: Dispatch<SetStateAction<number>>;
    setData: Dispatch<SetStateAction<Data>>;
}

export default function ImageUploadSection({setState, setData}: Props) {
    const [images, setImages] = useState<string[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    // Detect if the device is mobile
    useEffect(() => {
        const userAgent = navigator.userAgent;
        setIsMobile(/android|iphone|ipad|ipod|mobile/i.test(userAgent));
    }, []);

    // Update carousel
    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    // Handle uploading images
    const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileArray = event.target.files;
            const imagesCopy = images.slice();
            let validImagesCount = 0;

            for (let fileIndex = 0; fileIndex < fileArray.length; fileIndex++) {
                const file = fileArray[fileIndex];
                if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    imagesCopy.push(imageUrl);
                    validImagesCount++;
                }
            }

            api?.scrollTo(validImagesCount ? images.length + 1 : current, false);
            setImages(imagesCopy);
        }
    };

    // Handle removing images
    const removeImage = () => {
        const imagesCopy = images.slice(0, current - 1);
        console.log(imagesCopy);
        imagesCopy.push(...images.slice(current));
        console.log(imagesCopy);
        setImages(imagesCopy);
    };

    const handleUpload = async () => {
        setData((data) => {
            return {...data, images: images};
        });
        setState((state) => {
            return state + 1;
        });

        console.time("upload timer");
        const imageDownloadPromises: Promise<File>[] = [];
        let links: string[] = [""];

        images.forEach((image) => {
            const imageName = image.slice(image.lastIndexOf("/"));
            const promise = fetch(image)
                .then((res) => res.blob())
                .then((blob) => new File([blob], imageName, {type: "image/jpg"}));
            imageDownloadPromises.push(promise);
        });
        await Promise.all(imageDownloadPromises).then((res) =>
            uploadImages(res).then((res) => (links = res))
        );

        const response: Response = await fetch("/api/podnety", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({images: links}),
        });
        const resJson = await response.json();
        const responseData = resJson.message;
        responseData.images = links;
        setData((data) => ({
            ...data,
            images: responseData.images,
            rankings: responseData.rankings,
        }));
        console.timeEnd("upload timer");

    };

    return (
        <Card className="max-w-md mx-auto mt-8 shadow-lg">
            <CardHeader>
                <CardTitle>Nahrať obrázok</CardTitle>
            </CardHeader>
            <div className="p-4 flex flex-col gap-4">
                <div className="flex justify-center px-12">
                    <Carousel
                        setApi={setApi}
                        className="w-full max-w-xs h-full flex align-center"
                    >
                        <CarouselContent className="w-[calc(100%+1rem)]">
                            {images.map((value, index) => (
                                <CarouselItem key={value + index}>
                                    <Card
                                        className="aspect-square max-w-80 overflow-hidden flex justify-center items-center">
                                        <Image
                                            src={value}
                                            width={320}
                                            height={320}
                                            alt="uploaded image"
                                            className="h-[320px] w-[320px]"
                                        />
                                    </Card>
                                </CarouselItem>
                            ))}
                            <CarouselItem className="w-full">
                                <button
                                    className="rounded-lg border bg-card text-card-foreground shadow-sm w-full aspect-square flex items-center justify-center"
                                    onClick={() =>
                                        isMobile
                                            ? document.getElementById("galleryInput")?.click()
                                            : document.getElementById("imageUpload")?.click()
                                    }
                                >
                                    <div className="flex flex-col items-center justify-center">
                                        <LuImagePlus className="text-6xl text-gray-400"/>
                                        <p className="text-2xl font-semibold">Add images</p>
                                    </div>
                                </button>
                            </CarouselItem>
                        </CarouselContent>
                        <CarouselPrevious/>
                        <CarouselNext/>
                    </Carousel>
                </div>
                <div className="w-full px-2 flex gap-4 justify-center">
                    {images.length ? (
                        <Button
                            variant="destructive"
                            className="w-full h-10"
                            onClick={removeImage}
                        >
                            Remove image
                        </Button>
                    ) : null}
                    {isMobile ? (
                        <>
                            <Button
                                className="w-full h-10"
                                onClick={() => document.getElementById("galleryInput")?.click()}
                            >
                                Upload from gallery
                            </Button>
                            <Button
                                className="w-full h-10"
                                onClick={() => document.getElementById("cameraInput")?.click()}
                            >
                                Take photo
                            </Button>
                        </>
                    ) : (
                        <Button
                            className="w-full h-10"
                            onClick={() => document.getElementById("imageUpload")?.click()}
                        >
                            Upload images
                        </Button>
                    )}
                </div>
            </div>
            <CardFooter>
                <div className="w-full flex gap-4 justify-between">
                    <Button
                        className="w-24 h-10"
                        onClick={() =>
                            setState((state) => {
                                return state - 1;
                            })
                        }
                    >
                        <MdChevronLeft className="scale-[2]"/>
                        Späť
                    </Button>
                    <Button className="w-24 h-10" onClick={handleUpload}>
                        Ďalej
                        <MdChevronRight className="scale-[2]"/>
                    </Button>
                </div>
            </CardFooter>
            <>
                {/* Hidden Inputs for Mobile */}
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    capture="environment"
                    onChange={uploadImage}
                    className="hidden"
                    id="cameraInput"
                />
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={uploadImage}
                    className="hidden"
                    id="galleryInput"
                />

                {/* File Input for PC */}
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={uploadImage}
                    className="hidden"
                    id="imageUpload"
                />
            </>
        </Card>
    );
}
