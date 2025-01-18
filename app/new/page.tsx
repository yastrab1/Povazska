"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { LuImagePlus } from "react-icons/lu";

export default function Page() {
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

      api?.scrollTo(validImagesCount ? fileArray.length + 1 : current);
      setImages(imagesCopy);
    }
  };

  return (
    <div className="flex justify-center px-16">
      <Carousel setApi={setApi} className="w-full max-w-xs h-full flex align-center">
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
