'use client'

import {Issue} from "@/lib/globals";
import getIssue from "@/lib/firebase/issueGet";
import {useState} from "react";
import {FcCheckmark, FcNoIdea} from "react-icons/fc";
import {Cross} from "lucide-react";
import {Cancel} from "@radix-ui/react-alert-dialog";
import {CardTitle} from "@/components/ui/card";
import {ImCheckmark, ImCross} from "react-icons/im";
import Link from "next/link";


interface Props {
    id: string;
}

export default function CompactIssueDisplayCard({id}: Props) {

    const [data, setData] = useState<Issue>();

    getIssue(id).then((data) => setData(data as Issue))


    return (

        <div className="rounded px-5 w-full max-h-10 mx-auto mt-8 shadow-lg flex flex-row border-black border">
            <div className={"text-black py-1 flex flex-row items-center"}>
                <Link href={"/issues/" + id} className={"flex flex-row items-center"}>
                    <CardTitle>{"#" + data?.tags.join(" #")}</CardTitle>
                    <p className={"ml-10"}>Milana rastislava štefánika 10</p>
                </Link>
                <Link href={"/submitChallange/" + id}>
                <ImCheckmark/>
                </Link>
                <ImCross/>
            </div>
        </div>


    );
}
