'use client'
import { Progress } from "@/components/ui/progress";
import { Bell, Search } from "lucide-react";
import React, {JSX, useState} from "react";
import CompactIssueDisplayCard from "@/app/components/ui/CompactIssueDisplayCard";
import {getAllChildren} from "@/lib/firebase/issueGet";

export default function Domov(): JSX.Element {
    // Challenge data for mapping
    const [challenges,setChallenges] = useState<{id:string}[]>()
    getAllChildren().then(data => setChallenges(data))

    return (
        <div className="bg-[#a13129] flex flex-row justify-center w-full">
            <div className="bg-[#a13129] overflow-hidden w-[390px] h-[999px]">
                <div className="relative w-[391px] h-[998px] top-px">
                    {/* Main content area with rounded top corners */}
                    <div className="absolute w-[390px] h-[613px] top-[230px] left-0 bg-neutrlna-paletan90 rounded-[50px_50px_0px_0px]" />

                    {/* Header greeting */}
                    <div className="absolute top-[62px] left-[25px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-2xl tracking-[0] leading-[25.2px] whitespace-nowrap">
                        Vitaj, Adam
                    </div>

                    {/* Challenges heading */}
                    <div className="absolute top-[261px] left-[25px] [font-family:'Inter-Bold',Helvetica] font-bold text-black text-2xl tracking-[0] leading-[25.2px] whitespace-nowrap">
                        Aktuálne výzvy
                    </div>

                    {/* Search button */}
                    <div className="flex w-[27px] h-[27px] items-center justify-center absolute top-[261px] left-[337px] bg-[#0000001a] rounded-[100px]">
                        <Search className="w-[13px] h-[13px]" />
                    </div>

                    {/* Notification button */}
                    <div className="flex w-8 h-8 items-center justify-center absolute top-[60px] left-[333px] bg-[#ffffff33] rounded-[100px]">
                        <Bell className="w-[13px] h-[13px] text-white" />
                    </div>

                    {/* Status bar */}
                    <div className="absolute w-[70%] h-[998px] top-0 left-0">

                        {/* Home indicator */}
                        <div className="absolute w-[390px] h-[30px] top-[968px] left-0">
                            <div className="absolute w-[138px] h-1 top-[19px] left-[126px] bg-black rounded-full" />
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="absolute w-[261px] h-[21px] top-[99px] left-[26px]">
                        <Progress
                            value={48}
                            className="w-48 h-[21px] rounded-[66px] bg-[rgba(255,255,255,0.2)]"
                        />
                    </div>

                    {/* Level indicator */}
                    <div className="absolute top-[101px] left-[293px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-white text-xs tracking-[0] leading-[normal]">
                        15B → Level 2
                    </div>

                    {/* Challenge cards container */}
                    <div className="flex w-[339px] h-[460px] gap-2 absolute top-[314px] left-[26px] flex-col items-start">
                        {challenges?.map((challenge) => (
                            <CompactIssueDisplayCard id={challenge.id} key={challenge.id}/>
                        ))}
                    </div>

                    
                </div>
            </div>
        </div>
    );
}
