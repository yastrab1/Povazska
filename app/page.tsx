'use client'
//adding missing incompe file

import { useState/*, useEffect*/ } from "react";
import ImageUploadCard from "@/app/components/ui/uploadCard";
import MapPickerCard from "@/app/components/maps/mapPickerCard";
import PersonalInfoCard from "@/app/components/personalinfo/personalinfocard";
import DescriptionCard from "@/app/components/ui/descriptionCard";
import useIsLoggedIn from "@/app/hooks/useIsLoggedIn";

interface Data {
  title: string;
  description: string;
  tags: string[];
}

type State =
  "logged in"
  | "guest upload"
  | "image upload"
  | "map selection"
  | "finalization"
  | undefined;

export default function MainPage() {
  const [state, setState] = useState<State>('guest upload');
  const [data, setData] = useState<Data>({
    title: "",
    description: "",
    tags: [],
  });

  const {name, email, setEmail, setName} = useIsLoggedIn();

  const activeCard = (activeState: State) => {
    if (activeState === "guest upload") {
      return <PersonalInfoCard nameSet={setName} emailSet={setEmail} stateSet={setState} logname={name} logemail={email}/>;
    }

    if (activeState === "image upload") {
      return <ImageUploadCard stateSet={setState} dataSet={setData}/>;
    }

    if (activeState === "map selection") {
      return <MapPickerCard stateSet={setState} />;
    }

    if (activeState === "finalization") {
      return <DescriptionCard data={data}></DescriptionCard>;
    }

    return <p>Bad active state!</p>; // Ensure tsconfig.json is correctly configured
  };

  return <div className="p-4 relative">{activeCard(state)}</div>;
}
