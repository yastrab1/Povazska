import {db} from "@/app/config/firebase";
import {collection, doc, getDocs} from "firebase/firestore";
import {getDoc} from "@firebase/firestore";

import {Issue} from "@/lib/globals";


export default async function getIssue(id: string): Promise<Issue> {
    const issueRef = doc(db, "/podnety/" + id)
    const issue = await getDoc(issueRef);
    if (!issue.exists()) {
        throw new Error(`${issueRef} not found`)
    }
    return issue.data() as Issue;
}

export async function getAllIssues() {
    const querySnapshot = await getDocs(collection(db, 'podnety'));

    return querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

}