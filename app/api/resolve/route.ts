'use server'
import {doc, updateDoc,} from "firebase/firestore";

import {db} from "@/app/config/firebase";
import {FilePart, generateObject, ImagePart, TextPart} from "ai";
import {z} from "zod";
import {model} from "@/lib/globals";


async function updateIssueDoc(issueID: string, resolve: string) {
    const issueRef = doc(db, "/podnety/" + issueID);
    await updateDoc(issueRef, {resolve: resolve});
}


export async function POST(
    req: Request,
) {
    const body = await req.json()

    const issueID = body["issueID"];
    const issue = body["issueJSON"] as Issue;
    console.log(issue);
    console.log("called server action with id " + issueID);
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
    await updateIssueDoc(issueID, object["Suggested Resolve"]);
    return Response.json({status: "success"});
}