'use client'
import IssueDisplayCard from "@/app/components/ui/issueDisplayCard";
import {Textarea} from "@/components/ui/textarea";
import {CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {addIssue} from "@/lib/firebase/issueUpload";
import {Challange, Issue} from "@/lib/globals";
import {FormEvent, useEffect, useState} from "react";
import styles from "@/app/components/design/styles";
import getIssue from "@/lib/firebase/issueGet";
import {useRouter} from 'next/navigation';

export default function SubmitChallange({
                                            params,
                                        }: {
    params: Promise<{ id: string }>
}) {

    const [id, setId] = useState<string>();

    const router = useRouter()

    useEffect(() => {
        params.then(id => setId(id.id));
    }, []);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!id) {
            return;
        }
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formJSON = Object.fromEntries(formData.entries());

        console.log(formJSON);

        const originalIssue = await getIssue<Issue>(id);

        const final: Challange = {
            ...originalIssue,
            ...formJSON
        }
        console.log(final)
        const newId = await addIssue<Challange>(JSON.stringify(final), "/challanges/")

        router.push("/challange/" + newId)
    }

    return <form method="post" onSubmit={handleSubmit} className={"mb-10"}>
        {id ? <IssueDisplayCard id={id}>
            <CardTitle>Zadajte nadpis</CardTitle>
            <input name={"title"}></input>
            <h1>Zadajte popis</h1>
            <textarea name={"description"}></textarea>
            ...
            <Button type={"submit"} className={styles.buttonPrimary}>Submit</Button>
        </IssueDisplayCard> : null}
    </form>
}