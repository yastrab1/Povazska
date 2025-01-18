"use client";

import ImageUploadSection from "@/app/components/ui/imageUploadSection";
import { Separator } from "@/components/ui/separator";
import MapSelectionSection from "@/app/components/ui/mapSelectionSection";

export default function Page() {
  return (
    <div className="flex flex-col">
      <ImageUploadSection />
      <Separator />
      <MapSelectionSection onCoordinatesSelect={() => {}}/>
    </div>
      </>
  );
}
