'use client'
import getIssue, {getAllChildren} from "@/lib/firebase/issueGet";
import {useEffect, useState} from "react";
import DashboardIssueCard from "@/app/components/ui/CompactIssueDisplayCard";
import {ChartAreaInteractive} from "@/components/chart-area-interactive"
import {SectionCards} from "@/components/section-cards"
import DashboardMap from "@/app/components/maps/dashboardMap";
import {Challange, Issue, LocationMarker} from "@/lib/globals";


export default function Page() {
    const [issues, setIssues] = useState<{ id: string }[]>();
    const [locations, setLocations] = useState<LocationMarker[]>([])
    useEffect(() => {
        getAllChildren().then(async issues => {
            setIssues(issues)

            setLocations(await Promise.all(issues.map(async (id) => {

                const challange = await getIssue<Issue>(id.id);
                return {
                    id: id.id,
                    title: challange.title || "",
                    content: challange.description || "",
                    position: {lng: challange.lng, lat: challange.lat},

                } as LocationMarker


            })));
        });
    }, [locations]);

    return <>
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <div className="px-4 lg:px-6">
                        {
                            issues?.map((issue, key) => <DashboardIssueCard id={issue.id} key={key}/>)
                        }
                    </div>
                    <DashboardMap locations={locations}></DashboardMap>
                    <div className="px-4 lg:px-6">
                        <ChartAreaInteractive/>
                    </div>
                    <SectionCards/>

                </div>
            </div>
        </div>


    </>
}