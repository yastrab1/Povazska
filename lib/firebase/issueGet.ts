import {db} from "@/app/config/firebase";
import {collection, doc, getDocs} from "firebase/firestore";
import {getDoc} from "@firebase/firestore";




export default async function getIssue<Type>(id:string,source:string="/podnety/"):Promise<Type> {
    const issueRef = doc(db, source + id)
    const issue = await getDoc(issueRef);
    if (!issue.exists()) {
        throw new Error(`${issueRef} not found`)
    }
    return issue.data() as Type;
}

export async function getAllChildren(source:string="/podnety/") {
    const querySnapshot = await getDocs(collection(db, source));

    return querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

}