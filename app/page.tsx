"use client";
//adding missing incompe file

import { useState /*, useEffect*/ } from "react";
import ImageUploadCard from "@/app/components/ui/uploadImagesCard";
import MapPickerCard from "@/app/components/maps/mapPickerCard";
import PersonalInfoCard from "@/app/components/personalinfo/personalinfocard";
import DescriptionCard from "@/app/components/ui/uploadIssueCard";
import useIsLoggedIn from "@/app/hooks/useIsLoggedIn";

export interface Data {
  title: string;
  description: string;
  tags: string[];
  images: string[];
  lat: number;
  lng: number;
}

type State =
  | "logged in"
  | "guest upload"
  | "image upload"
  | "map selection"
  | "finalization"
  | undefined;

export default function MainPage() {
  const [state, setState] = useState<State>("guest upload");
  const [data, setData] = useState<Data>({
    title: "",
    description: "",
    tags: [],
    images: [],
    lat: 0,
    lng: 0,
  });

  const { name, email, setEmail, setName } = useIsLoggedIn();

  const activeCard = (activeState: State) => {
    if (activeState === "guest upload") {
      return (
        <PersonalInfoCard
          nameSet={setName}
          emailSet={setEmail}
          stateSet={setState}
          logname={name}
          logemail={email}
        />
      );
    }

    if (activeState === "image upload") {
      return <ImageUploadCard stateSet={setState} dataSet={setData} />;
    }

    if (activeState === "map selection") {
      return <MapPickerCard stateSet={setState} dataSet={setData} />;
    }

    if (activeState === "finalization") {
      return <DescriptionCard data={data}></DescriptionCard>;
    }

    return <p>Bad active state!</p>; // Ensure tsconfig.json is correctly configured
  };

  return <div className="p-4 relative">{activeCard(state)}</div>;
}
