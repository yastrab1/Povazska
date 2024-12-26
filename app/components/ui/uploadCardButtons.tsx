import React from "react";
import { Button } from "@/app/components/ui/button";

export default function uploadCardButtons() {
  const userAgent = navigator.userAgent;
  const isMobile = /android|iphone|ipad|ipod|mobile/i.test(userAgent);

  return (
    <>
      {/* Buttons */}
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
    </>
  );
}
