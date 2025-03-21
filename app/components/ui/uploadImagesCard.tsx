"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  MdChevronLeft,
  MdChevronRight,
  MdOutlinePhotoCamera,
  MdDelete,
  MdFileUpload,
  //MdPhotoLibrary,
  //MdCamera,
} from "react-icons/md";
import WarningModal from "@/app/components/ui/warningModal";
import getIssue, { getAllChildren } from "@/lib/firebase/issueGet";
import { Data, formProgress, Issue } from "@/lib/globals";
import imageCompression, { Options } from "browser-image-compression";
import uploadImages from "@/lib/firebase/imageUpload";
import "@/app/components/design/form.css";
import PhotoInputChoiceModal from "@/app/components/ui/photoInputChoiceModal";
import styles from "@/app/components/design/styles";

// type State =
//     | "guest upload"
//     | "image upload"
//     | "map selection"
//     | "finalization"
//     | undefined;

interface Props {
  setState: Dispatch<SetStateAction<formProgress>>;
  dataSet: Dispatch<SetStateAction<Data>>;
  data: Data;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

async function compressImage(image: File) {
  const options: Options = {
    maxSizeMB: 0.1, // Maximum size in MB
    maxWidthOrHeight: 1024,
    useWebWorker: true,
    fileType: "image/webp",
  };
  return await imageCompression(image, options);
}

function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function haversineDistance(
  point1: Coordinates,
  point2: Coordinates,
  isMiles = false
): number {
  const EARTH_RADIUS_KM = 6371;
  const EARTH_RADIUS_MI = 3958.8;

  const lat1 = degreesToRadians(point1.latitude);
  const lon1 = degreesToRadians(point1.longitude);
  const lat2 = degreesToRadians(point2.latitude);
  const lon2 = degreesToRadians(point2.longitude);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const radius = isMiles ? EARTH_RADIUS_MI : EARTH_RADIUS_KM;
  return radius * c;
}

export default function ImageUploadCard({ setState, dataSet, data }: Props) {
  const [images, setImages] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  

  useEffect(() => {
    // Detect if the device is mobile
    const userAgent = navigator.userAgent;
    setIsMobile(/android|iphone|ipad|ipod|mobile/i.test(userAgent));
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArray = event.target.files;
      const imagesCopy = images.slice();
      for (let fileIndex = 0; fileIndex < fileArray.length; fileIndex++) {
        const file = fileArray[fileIndex];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          imagesCopy.push(imageUrl);
        }
      }
      setImages(imagesCopy);
    }
  };

  const detectDuplicates = async (data: Data) => {
    const distance = 0.1;
    const minMatchTags = 0;

    const duplicates: Issue[] = [];

    const issues = await getAllChildren();
    for (const iss of issues) {
      const issue = await getIssue<Issue>(iss.id);
      const distKM = haversineDistance(
        { longitude: issue.lng, latitude: issue.lat },
        { longitude: data.lng, latitude: data.lat },
        false
      );
      if (distKM > distance) {
        continue;
      }
      let matchingTags = 0;
      for (const tag1 in issue.tags) {
        for (const tag2 in data.userSelectedTags) {
          //TODO not really thought, what if user does not select tags until the GPT api call finishes - problem
          if (tag1 == tag2) {
            matchingTags++;
          }
        }
      }
      if (matchingTags < minMatchTags) continue;
      duplicates.push(issue);
    }
    return duplicates;
  };

  const handleUpload = async () => {
    if (images.length == 0) {
      setWarningModalOpen(true);
      return;
    }
    dataSet((data) => ({ ...data, images: images }));

    setState("map selection");
    console.time("compressing & processing");
    console.time("overall latency");
    const imageDownloadPromises: Promise<File>[] = [];
    let imageFiles: File[] = [];
    const binaryImagePromises: Promise<ArrayBuffer>[] = [];
    images.forEach((image) => {
      const imageName = image.slice(image.lastIndexOf("/"));
      const promise = fetch(image)
        .then((res) => res.blob())
        .then((blob) =>
          compressImage(new File([blob], imageName, { type: "image/jpg" }))
        );
      imageDownloadPromises.push(promise);
    });
    await Promise.all(imageDownloadPromises).then(async (res) => {
      imageFiles = res;
      console.log(res.map((r) => r.size));
      res.map((file) => binaryImagePromises.push(file.arrayBuffer()));
    });

    const binaryImages = (await Promise.all(binaryImagePromises)).map((img) =>
      Buffer.from(img).toString("base64")
    );

    console.timeEnd("compressing & processing");
    console.time("gpt");
    const response: Response = await fetch("/api/podnety", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ images: binaryImages }),
    });
    const resJson = await response.json();
    const responseData = resJson.message;
    dataSet((data) => ({
      ...data,
      rankings: responseData.rankings,
    }));
    console.timeEnd("gpt");
    console.timeEnd("overall latency");
    console.time("detecting duplicates");
    const duplicates = await detectDuplicates(data);
    dataSet((data) => ({ ...data, duplicates: duplicates }));
    console.timeEnd("detecting duplicates");
    console.time("upload to firebase");
    const links = await uploadImages(imageFiles);
    dataSet((data) => ({
      ...data,
      images: links,
      readyToUpload: true,
    }));
    console.timeEnd("upload to firebase");
  };

  const handleImageRemove = (index: number) => {
    const imageCopy = images.slice();
    imageCopy.splice(index, 1);
    setImages(imageCopy);
  };
  return (
    <div className={styles.container}>
    <div className={styles.backgroundOverlay}></div>
    <div className="relative z-10">
      {isModalOpen && (
        <PhotoInputChoiceModal
          onClose={() => setIsModalOpen(false)}
          onCameraChoose={() => {
            document.getElementById("cameraInput")?.click();
            setIsModalOpen(false);
          }}
          onGalleryChoose={() => {
            document.getElementById("galleryInput")?.click();
            setIsModalOpen(false);
          }}
        />
      )}

      {/* Title Section */}
      <div className={styles.titleSection}>
        <h2 className={styles.title}>Nahraj obrázok</h2>
        <p className={styles.subtitle}>Pridaj alebo odfoť fotku problému.</p>
      </div>

      {/* Upload Field */}
      <div
        className={styles.uploadField}
        onClick={
          isMobile
            ? () => setIsModalOpen(true)
            : () => document.getElementById("imageUpload")?.click()
        }
      >
        {/* Hidden Inputs */}
        <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" id="imageUpload" />
        <input type="file" accept="image/*" multiple capture="environment" onChange={handleFileChange} className="hidden" id="cameraInput" />
        <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" id="galleryInput" />
        
        <MdFileUpload className={styles.uploadIcon} />
        <p className={styles.uploadText}>Nahraj fotku</p>
        <p className={styles.uploadSubtext}>Nahraj fotku z galérie alebo urob fotku.</p>
      </div>

      {/* Uploaded Images Preview */}
      {images.length > 0 && (
        <div className={styles.imageGrid}>
          {images.map((item, index) => (
            <div key={item} className={styles.imageWrapper}>
              <img src={item} className={styles.image} alt="Uploaded" />
              <button
                className={styles.deleteButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageRemove(index);
                }}
              >
                <MdDelete className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Photo Tips */}
      <div className={styles.photoTip}>
        <MdOutlinePhotoCamera className={styles.tipIcon} />
        <div>
          <p className={styles.tipText}>Viac fotiek nám pomáha riešiť</p>
          <p className={styles.tipDetail}>1. fotka: z blízka ukazujúca detaily</p>
          <p className={styles.tipDetail}>2. fotka: z dialky pre ľahšiu lokalizáciu</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className={styles.buttonContainer}>
        <button className={styles.backButton} onClick={() => setState("personal info")}>
          <MdChevronLeft className="text-2xl" /> Späť
        </button>
        <button className={styles.nextButton} onClick={handleUpload}>
          Ďalej <MdChevronRight className="text-2xl" />
        </button>
      </div>

      {/* Progress Indicator */}
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar} style={{ width: "40%" }}></div>
      </div>

      {/* Warning Modal */}
      <WarningModal
        open={warningModalOpen}
        onClose={(pass) => {
          if (pass) {
            setState("map selection");
          } else {
            setWarningModalOpen(false);
          }
        }}
      />
    </div>
  </div>
);
  

}
