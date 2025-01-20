"use client";
//adding missing incompe file

import { useState /*, useEffect*/ } from "react";
import ImageUploadCard from "@/app/components/ui/uploadImagesCard";
import MapPickerCard from "@/app/components/maps/mapPickerCard";
import PersonalInfoCard from "@/app/components/personalinfo/personalinfocard";
import ImageUploadSection from "@/app/components/ui/imageUploadSection";
import MapSelectionSection from "@/app/components/ui/mapSelectionSection";
import DescriptionCard from "@/app/components/ui/uploadIssueCard";
import useIsLoggedIn from "@/app/hooks/useIsLoggedIn";
import TagSelectionCard from "@/app/components/ui/tagSelectionCard";

type Tags =
  | "Neporiadok a odpadky"
  | "Cyklostojany"
  | "Doprava a parkovanie"
  | "Cesty a chodniky"
  | "Údržba majetku"
  | "Dreviny a zeleň"
  | "Detské ihriská"
  | "Lavičky a koše"
  | "Stavebný úrad"
  | "Nájomné bývanle"
  | "Dane a poplatky"
  | "Ľudia bez domova"
  | "Sociálna pomoc"
  | "Matrika a pobyty"
  | "Kultúra a šport"
  | "Iné podnety";

type RankingsMap = Map<Tags, number>;

export interface Data {
  rankings: string[];
  tags: string[];
  images: string[];
  lat: number;
  lng: number;
  userSelectedTags: string[];
}

export type State =
  | "logged in"
  | "guest upload"
  | "image upload"
  | "map selection"
  | "tag selection"
  | "finalization"
  | undefined
  | number;

export default function MainPage() {
  const [state, setState] = useState<number>(0);
  const [data, setData] = useState<Data>({
    rankings: [],
    tags: [],
    images: [],
    lat: 0,
    lng: 0,
    userSelectedTags: [],
  });

  const { name, email, setEmail, setName } = useIsLoggedIn();

  const activeCard = (activeState: State) => {
    if (activeState === 0) {
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

    if (activeState === 1) {
      return <ImageUploadSection setState={setState} setData={setData} />;
    }

    if (activeState === 2) {
      return <MapSelectionSection setState={setState}/>
    }

    if (activeState === 3) {
      return (
        <TagSelectionCard
          tags={data.rankings.slice(0, 5)}
          setState={setState}
          setData={setData}
        />
      );
    }

    if (activeState === 4) {
      return <DescriptionCard data={data}></DescriptionCard>;
    }

    return <p>Bad active state!</p>; // Ensure tsconfig.json is correctly configured
  };

  return <div className="p-4 relative">{activeCard(state)}</div>;
}
