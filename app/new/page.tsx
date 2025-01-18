"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { LuImagePlus } from "react-icons/lu";

export default function Page() {
  const [images, setImages] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if the device is mobile
    const userAgent = navigator.userAgent;
    setIsMobile(/android|iphone|ipad|ipod|mobile/i.test(userAgent));
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArray = event.target.files;
      const imagesCopy = images.slice();
      //let validImagesCount = 0;
      for (let fileIndex = 0; fileIndex < fileArray.length; fileIndex++) {
        const file = fileArray[fileIndex];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          imagesCopy.push(imageUrl);
          //validImagesCount++;
        }
      }
      /*setIndex(
        images.length === 0 ? validImagesCount - 1 : index + validImagesCount
      );*/
      setImages(imagesCopy);
    }
  };

  return (
    <div className="flex justify-center px-16">
      <Carousel className="w-full max-w-xs h-full flex align-center">
        <CarouselContent className="w-[calc(100%+1rem)]">
          {images.map((value, index) => (
            <CarouselItem key={value + index}>
              <Card className="aspect-square max-w-80 overflow-hidden">
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
                <LuImagePlus className="text-6xl text-gray-400" />
                <p className="text-2xl font-semibold">Add images</p>
              </div>
            </button>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

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
    </div>
  );
}
