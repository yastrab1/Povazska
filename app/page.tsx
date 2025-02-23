"use client";
//adding missing incompe file

import {useState} from "react";
import PersonalInfoCard from "@/app/components/personalinfo/personalinfocard";
import DescriptionCard from "@/app/components/ui/uploadIssueCard";
import useIsLoggedIn from "@/app/hooks/useIsLoggedIn";
import TagSelectionCard from "@/app/components/ui/tagSelectionCard";
import ImageUploadCard from "@/app/components/ui/uploadImagesCard";
import {Data, formProgress} from "@/lib/globals";
import CustomTagsChooseCard from "@/app/components/ui/CustomTagsChooseCard";
import MapPickerModal from "@/app/components/maps/map";

export default function MainPage() {
    const [state, setState] = useState<formProgress>("personal info");
    const [data, setData] = useState<Data>({
        title: "",
        description: "",
        rankings: [],
        images: [],
        lat: 0,
        lng: 0,
        userSelectedTags: [],
        duplicates: [],
        readyToUpload: false,
    });

    const {name, email, setEmail, setName} = useIsLoggedIn();

    const activeCard = (activeState: formProgress) => {
        if (activeState === "personal info") {
            return (
                <PersonalInfoCard
                    nameSet={setName}
                    emailSet={setEmail}
                    setState={setState}
                    logname={name}
                    logemail={email}
                />
            );
        }

        if (activeState === "image upload") {
            return <ImageUploadCard setState={setState} dataSet={setData} data={data}/>;
        }

        if (activeState === "map selection") {
            return <MapPickerModal setData={setData} setState={setState}/>
        }

        if (activeState === "ai tag selection") {
            return (
                <TagSelectionCard
                    tags={data.rankings.filter(ranking => (ranking[1] > 0)).map(ranking => ranking[0]).slice(0, 5)}
                    setState={setState}
                    setData={setData}
                />
            );
        }
        if (activeState === "custom tag selection") {
            return <CustomTagsChooseCard setState={setState} setData={setData}/>
        }

        if (activeState === "finalization") {
            return <DescriptionCard data={data}></DescriptionCard>;
        }

        return <p>Bad active state!</p>; // Ensure tsconfig.json is correctly configured ---
    };

    return <div className="p-4 relative">{activeCard(state)}</div>;
}
