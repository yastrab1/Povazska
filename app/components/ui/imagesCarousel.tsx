import React from "react";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel"

export default function ImageCarousel({images, onClick}: { images: string[] | undefined, onClick?: () => void }) {

    return (
        <div className="flex flex-col items-center">
            {images?.length !== 0 ? (
                <div className="relative w-48 flex h-48 mb-4 items-center justify-center">

                    <Carousel>
                        <CarouselContent>

                            {images?.map((image, imageIndex) => (
                                <CarouselItem key={imageIndex}
                                              className={"w-[100%] h-[100%] flex flex-col items-center justify-center overflow-hidden"}>
                                    <a href={images[imageIndex]} target="_blank" rel="noopener noreferrer"
                                       className={"w-full h-full"}>
                                        <img
                                            src={images[imageIndex]}
                                            alt="Uploaded Preview"
                                            className="rounded-md w-full h-full object-contain"
                                            width={100}
                                            height={100}
                                        />

                                    </a>
                                </CarouselItem>
                            ))}

                        </CarouselContent>
                        <CarouselPrevious/>
                        <CarouselNext/>
                    </Carousel>
                </div>
            ) : (
                <div
                    className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-md mb-4 cursor-pointer"
                    onClick={onClick}>

                    <span className="text-gray-500">No Image</span>
                </div>)}
        </div>
    )
}
