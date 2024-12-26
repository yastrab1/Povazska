import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import UploadCardButtons from "./uploadCardButtons";

export default function uploadCard() {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      //setImage(imageUrl);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8 shadow-lg">
      <CardHeader>
        <CardTitle>Pridaj podnet</CardTitle>
      </CardHeader>
      <CardContent>
        <UploadCardButtons/>

        {/* File Input and Gallery Input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="imageUpload"
        />

        {/* Camera Input for Mobile */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
          id="cameraInput"
        />
      </CardContent>
      <CardFooter>
        <p>Powered by OpenAi</p>
      </CardFooter>
    </Card>
  );
}
