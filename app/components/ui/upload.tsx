"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

const ImageUploadCard: React.FC = () => {
  const [image, setImage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if the device is mobile
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsMobile(/android|iphone|ipad|ipod|mobile/i.test(userAgent));
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8 shadow-lg">
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {image ? (
            <div className="relative w-48 h-48 mb-4">
              <Image
                src={image}
                alt="Uploaded Preview"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          ) : (
            <div
              className="w-48 h-48 bg-gray-100 flex items-center justify-center rounded-md mb-4 cursor-pointer"
              onClick={() =>
                isMobile
                  ? document.getElementById("galleryInput")?.click()
                  : document.getElementById("imageUpload")?.click()
              }
            >
              <span className="text-gray-500">No Image</span>
            </div>
          )}

          {/* File Input for PC */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="imageUpload"
          />

          {/* Hidden Inputs for Mobile */}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
            id="cameraInput"
          />
          <input
            type="file"
            accept="image/*"
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
        </div>
      </CardContent>
      <CardFooter>
        {image && (
          <Button variant="destructive" onClick={() => setImage("")}>
            Remove Image
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ImageUploadCard;
