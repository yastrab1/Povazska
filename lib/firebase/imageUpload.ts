'use client'
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "@/app/config/firebase";

export default async function uploadImages(images: File[]) {
    for (const image of images) {
        if (!image || !image.name) {
            throw new Error("Image is missing");
        }

    }
    return Promise.all(images.map(uploadImage));
}


async function uploadImage(image: File) {
    try {

        const filePath = `images//${image.name}`;
        const newImageRef = ref(storage, filePath);
        await uploadBytesResumable(newImageRef, image);

        return await getDownloadURL(newImageRef);
    } catch (error) {
        console.error('Error compressing the image:', error);
        throw error;
    }


}