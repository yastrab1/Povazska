import getIssue from "@/lib/firebase/issueGet";
import {Data} from "@/app/page";
import IssueDisplayCard from "@/app/components/ui/issueDisplayCard";

export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ id: string }>
}) {
    const slug = (await params).id
    const doc = await getIssue(slug)
    const data = doc.data() as Data

    return <IssueDisplayCard data={data} />
}