'use client'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import imageCompression, {Options} from 'browser-image-compression';
import { storage } from "@/app/config/firebase";

export default async function uploadImages(images:File[]){
    for (const image of images) {
        if (!image || !image.name){
            throw new Error("Image is missing");
        }

    }
    return Promise.all(images.map(uploadImage));
}

async function uploadImage( image:File) {

    const options:Options = {
        maxSizeMB: 1, // Maximum size in MB
        useWebWorker: true,
        fileType:"webp"
    };

    try {
        const compressedFile = await imageCompression(image, options);
        const filePath = `images//${image.name}`;
        const newImageRef = ref(storage, filePath);
        await uploadBytesResumable(newImageRef, compressedFile);

        return await getDownloadURL(newImageRef);
    } catch (error) {
        console.error('Error compressing the image:', error);
        throw error;
    }


}