
import {addDoc, collection, doc, DocumentData, updateDoc, WithFieldValue} from "firebase/firestore";
import {db} from "@/app/config/firebase";


export async function addIssue<Type extends WithFieldValue<DocumentData>>(issueJSON: string,destination:string="/podnety") {
    const issue = JSON.parse(issueJSON) as Type;

    const docRef = await addDoc(collection(db, destination), issue);
    return docRef.id;
}

export async function updateIssue(updateObject:never, destination: string, id: string){
    await updateDoc(doc(collection(db,destination),id),updateObject)
}