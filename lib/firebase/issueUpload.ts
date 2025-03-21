
import {addDoc, collection, DocumentData, WithFieldValue} from "firebase/firestore";
import {db} from "@/app/config/firebase";


export async function addIssue<Type extends WithFieldValue<DocumentData>>(issueJSON: string,destination:string="/podnety") {
    const issue = JSON.parse(issueJSON) as Type;

    const docRef = await addDoc(collection(db, destination), issue);
    return docRef.id;
}
