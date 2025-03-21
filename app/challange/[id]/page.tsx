import ChallangeDisplayCard from "@/app/components/ui/ChallangeDisplayCard";

export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ id: string }>
}) {
    const slug = (await params).id
    return <ChallangeDisplayCard id={slug}/>
}