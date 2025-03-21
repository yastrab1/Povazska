'use client'
import {getAllChildren} from "@/lib/firebase/issueGet";
import {useEffect, useState} from "react";

import CompactChallangeCard from "@/app/components/ui/UserDashboaradChallangeCard";

export default function Page(){

    const [data,setData] = useState<{ id:string }[]>();

    useEffect(()=>{
        getAllChildren("/challanges/").then((data)=>{
            setData(data)
            console.log(data)
        });

    },[])

    return <>{data?.map((challange,key)=>
        <CompactChallangeCard key = {key} id={challange.id}/>
    )}</>
}