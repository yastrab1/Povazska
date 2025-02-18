'use client'
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import imageCompression, {Options} from 'browser-image-compression';
import {storage} from "@/app/config/firebase";

export default async function uploadImages(images: File[]) {
    for (const image of images) {
        if (!image || !image.name) {
            throw new Error("Image is missing");
        }

    }
    return Promise.all(images.map(uploadImage));
}

async function compressImage(image: File) {
    const options: Options = {
        maxSizeMB: 0.1, // Maximum size in MB
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        fileType: "image/webp"
    };
    return await imageCompression(image, options);
}

async function uploadImage(image: File) {
    const compressedFile = await compressImage(image);
    try {

        const filePath = `images//${image.name}`;
        const newImageRef = ref(storage, filePath);
        await uploadBytesResumable(newImageRef, compressedFile);

        return await getDownloadURL(newImageRef);
    } catch (error) {
        console.error('Error compressing the image:', error);
        throw error;
    }


}