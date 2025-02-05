'use server'
import {addDoc, collection, doc, updateDoc,} from "firebase/firestore";

import {db} from "@/app/config/firebase";
import {FilePart, generateObject, ImagePart, TextPart} from "ai";
import {z} from "zod";
import {Issue, model} from "@/lib/globals";

interface APISchema {
    "Suggested Resolve": string
}

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

async function updateIssueDoc(issueID: string, object: APISchema) {
    const issueRef = doc(db, "/podnety/" + issueID);
    await updateDoc(issueRef, {resolve: object["Suggested Resolve"]});
}


export async function addSuggestedResolve(issueID: string, issueJSON: string) {
    'use server'
    console.log("called server action with id " + issueID);
    const issue = JSON.parse(issueJSON) as Issue;
    const prompt: (TextPart | ImagePart | FilePart)[] = [{
        type: 'text',
        text: `This is a description of a problem in town. Here are its pictures and its tags selected by the user. Suggest a way to resolve this issue for the Bratislava-Petržalka.
        tags:${issue.tags.join(",")}`
    }];
    const imagePrompt: ImagePart[] = issue.images.map((value) => {
        return {type: 'image', image: new URL(value)}
    });

    const schema = z.object(
        {
            "Suggested Resolve": z.string()
        }
    );

    prompt.push(...imagePrompt);

    const {object} = await generateObject({
        model: model,
        schema: schema,
        messages: [
            {
                role: 'user',
                content: prompt
            },
        ],

    });
    console.log("Prompted gpt, got back:" + JSON.stringify(object));
    await updateIssueDoc(issueID, object);
}