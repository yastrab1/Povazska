import {
    collection,
    onSnapshot,
    query,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    orderBy,
    Timestamp,
    runTransaction,
    where,
    addDoc,
    getFirestore,
} from "firebase/firestore";

import { db } from "@/app/config/firebase";
import {Data} from "@/app/page";

type Issue = {
    title:string,
    description:string,
    tags:string[],
    images:string[]
    timestamp:Timestamp,
    lat:number,
    lng:number,
    status:string,
}

export async function addIssue(issueData:Data) {
    if (!issueData.title) {
        throw new Error("No issue title provided.");
    }

    if (!issueData.description) {
        throw new Error("No issue description provided.");
    }
    if (!issueData.tags) {
        throw new Error("No issue tags provided.");
    }
    const issue:Issue = {
        title: issueData.title,
        description: issueData.description,
        tags: issueData.tags,
        timestamp: Timestamp.now(),
        images: issueData.images,
        lat:issueData.lat,
        lng:issueData.lng,
        status: "open",
    }
    console.log(issue);
    console.log(collection(db, "/podnety"))
    const docRef = await addDoc(collection(db, "/podnety"), issue);
    return docRef.id;
}

