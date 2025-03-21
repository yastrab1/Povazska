'use client'
import {getAllChildren} from "@/lib/firebase/issueGet";
import {useEffect, useState} from "react";
import DashboardIssueCard from "@/app/components/ui/CompactIssueDisplayCard";


export default function Page(){
    const [issues,setIssues] = useState<{id:string}[]>();
    useEffect(() => {
        getAllChildren().then(issues => setIssues(issues));
    }, []);

    return <>
        {issues?.map((issue,key) => <DashboardIssueCard id={issue.id} key={key}/>)}
    </>
}