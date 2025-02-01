import {addDoc, collection, Timestamp,} from "firebase/firestore";

import {db} from "@/app/config/firebase";
import {Data, Issue} from "@/app/page";


export async function addIssue(issueData: Data) {
    if (!issueData.title) {
        throw new Error("No issue title provided.");
    }

    if (!issueData.description) {
        throw new Error("No issue description provided.");
    }
    if (!issueData.tags) {
        throw new Error("No issue tags provided.");
    }
    const issue: Issue = {
        title: issueData.title,
        description: issueData.description,
        tags: issueData.tags,
        timestamp: Timestamp.now(),
        images: issueData.images,
        lat: issueData.lat,
        lng: issueData.lng,
        status: "open",
    }
    console.log(issue);
    console.log(collection(db, "/podnety"))
    const docRef = await addDoc(collection(db, "/podnety"), issue);
    return docRef.id;
}

