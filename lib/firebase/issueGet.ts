import {db} from "@/app/config/firebase";
import {collection, doc} from "firebase/firestore";
import {getDoc} from "@firebase/firestore";


export default async function getIssue(id:string){
    const issueRef = doc(db, "/podnety/"+id)
    const issue = await getDoc(issueRef)
    if (!issue.exists()){
        throw new Error(`${issueRef} not found`)
    }
    return issue
}