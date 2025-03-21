'use client'
import {getAllIssues} from "@/lib/firebase/issueGet";
import {useState} from "react";
import DashboardIssueCard from "@/app/components/ui/CompactIssueDisplayCard";


export default function Page(){
    const [issues,setIssues] = useState<{id:string}[]>();
    getAllIssues().then(issues => setIssues(issues));
    return <>
        {issues?.map((issue,key) => <DashboardIssueCard id={issue.id} key={key}/>)}
    </>
}