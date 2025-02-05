import getIssue from "@/lib/firebase/issueGet";
import IssueDisplayCard from "@/app/components/ui/issueDisplayCard";
import {Issue} from "@/lib/globals";

export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ id: string }>
}) {
    const slug = (await params).id
    const doc = await getIssue(slug)
    const data = doc as Issue
    return <IssueDisplayCard data={data}/>
}