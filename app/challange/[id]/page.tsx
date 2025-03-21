import IssueDisplayCard from "@/app/components/ui/issueDisplayCard";

export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ id: string }>
}) {
    const slug = (await params).id
    return <IssueDisplayCard id={slug}/>
}