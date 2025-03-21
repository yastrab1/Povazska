'use client'
import IssueDisplayCard from "@/app/components/ui/issueDisplayCard";
import {Textarea} from "@/components/ui/textarea";
import {CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {addIssue} from "@/lib/firebase/issueUpload";
import {Challange} from "@/lib/globals";
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

        const originalIssue = await getIssue(id);


        const final: Challange = {
            ...originalIssue,
            ...formJSON
        }
        console.log(final)
        await addIssue<Challange>(JSON.stringify(final), "/challanges")

        router.push("/challange/" + id)
    }

    return <form method="post" onSubmit={handleSubmit} className={"mb-10"}>
        {id ? <IssueDisplayCard id={id}>
            <CardTitle>Zadajte nadpis</CardTitle>
            <Input></Input>
            <h1>Zadajte popis</h1>
            <Textarea></Textarea>
            ...
            <Button type={"submit"} className={styles.buttonPrimary}>Submit</Button>
        </IssueDisplayCard> : null}
    </form>
}