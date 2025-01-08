"use client";
import React, {useState, useEffect, Dispatch, SetStateAction} from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import uploadImages from "@/lib/firebase/imageUpload";
import {Data} from "@/app/page";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {Warning} from "postcss";
import WarningModal from "@/app/components/ui/warningModal";
import ImageCarousel from "@/app/components/ui/imagesCarousel";




type State =
  | "guest upload"
  | "image upload"
  | "map selection"
  | "finalization"
  | undefined;

interface Props {
  stateSet: (state: State) => void;
  dataSet: Dispatch<SetStateAction<Data>>
}

export default function ImageUploadCard({ stateSet, dataSet }: Props) {
  const [images, setImages] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [index, setIndex] = useState(0);
  const [warningModalOpen, setWarningModalOpen] = useState(false);

  useEffect(() => {
    // Detect if the device is mobile
    const userAgent = navigator.userAgent;
    setIsMobile(/android|iphone|ipad|ipod|mobile/i.test(userAgent));
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      setIndex(
        images.length === 0 ? validImagesCount - 1 : index + validImagesCount
      );
      setImages(imagesCopy);
    }
  };

  const handleUpload = async () => {
    if (images.length == 0) {
      setWarningModalOpen(true)
      return
    }
    dataSet(data=>({...data,images: images}));

    stateSet("map selection");
    console.time("upload timer");
    const imageDownloadPromises: Promise<File>[] = [];
    let links: string[] = [""];

    images.forEach((image) => {
      const imageName = image.slice(image.lastIndexOf("/"));
      const promise = fetch(image)
        .then((res) => res.blob())
        .then((blob) => new File([blob], imageName, { type: "image/jpg" }));
      imageDownloadPromises.push(promise);
    });
    await Promise.all(imageDownloadPromises).then((res) =>
      uploadImages(res).then((res) => (links = res))
    );

    const response: Response = await fetch("/api/podnety", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images: links }),
    });
    const resJson = await response.json();
    const responseData = resJson.message;
    responseData.images = links;
    dataSet((data) => ({
      ...data,
      images: responseData.images,
      title: responseData.title,
      description: responseData.description,
      tags: responseData.tags
    }));
    console.timeEnd("upload timer");
  };

  const handleImageRemove = () => {
    const imageCopy = images.slice();
    imageCopy.splice(index, 1);
    setIndex(index === 0 ? index : index - 1);
    setImages(imageCopy);
  };

  const handlePrevImage = () => {
    setIndex(index === 0 ? images.length - 1 : index - 1);
  };

  const handleNextImage = () => {
    setIndex(index + 1 === images.length ? 0 : index + 1);
  };

  return (
      <>
    <Card className="max-w-md mx-auto mt-8 shadow-lg">
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
      </CardHeader>
      <CardContent>
        <ImageCarousel images={images} onClick={() =>
            isMobile
                ? document.getElementById("galleryInput")?.click()
                : document.getElementById("imageUpload")?.click()
        }/>

          {/* File Input for PC */}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="imageUpload"
          />

          {/* Hidden Inputs for Mobile */}
          <input
            type="file"
            accept="image/*"
            multiple
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
            id="cameraInput"
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="galleryInput"
          />

          {!isMobile ? (
            <Button
              variant="outline"
              onClick={() => document.getElementById("imageUpload")?.click()}
            >
              Choose Image
            </Button>
          ) : (
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => document.getElementById("cameraInput")?.click()}
              >
                Use Camera
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById("galleryInput")?.click()}
              >
                Choose from Gallery
              </Button>
            </div>
          )}

      </CardContent>
      <CardFooter>
        {images.length ? (
          <Button variant="destructive" onClick={handleImageRemove}>
            Remove Image
          </Button>
        ) : null}
        <Button onClick={handleUpload}>Upload Issue!</Button>
      </CardFooter>
    </Card>
      <WarningModal open={warningModalOpen} onClose={pass => {
        if (pass) {
          stateSet("map selection");
        }else{
          setWarningModalOpen(false);
        }
      }}></WarningModal></>
  );
}
