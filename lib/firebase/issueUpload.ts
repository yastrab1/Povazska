import {Issue} from "@/lib/globals";
import {addDoc, collection} from "firebase/firestore";
import {db} from "@/app/config/firebase";

export async function addIssue(issueJSON: string) {
    const issue = JSON.parse(issueJSON) as Issue;
    // if (!issue.title) {
    //     throw new Error("No issue title provided.");
    // }
    //
    // if (!issue.description) {
    //     throw new Error("No issue description provided.");
    // }
    // if (!issue.tags) {
    //     throw new Error("No issue tags provided.");
    // }
    const docRef = await addDoc(collection(db, "/podnety"), issue);
    return docRef.id;
}
