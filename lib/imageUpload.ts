import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage } from "@/lib/clientApp";

export default async function uploadImages(images:File[]){
    for (const image of images) {
        if (!image || !image.name){
            throw new Error("Image is missing");
        }

    }
    return Promise.all(images.map(uploadImage));
}

async function uploadImage( image:File) {
    const filePath = `images//${image.name}`;
    const newImageRef = ref(storage, filePath);
    await uploadBytesResumable(newImageRef, image);

    return await getDownloadURL(newImageRef);
}