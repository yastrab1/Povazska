"use client";

import React, { useState } from "react";
import ImageUploadCard from "@/app/components/ui/uploadCard";
import MapPickerCard from "@/app/components/maps/mapPickerCard";
import AuthModal from "@/app/components/signin/authmodal";
import PersonalInfoCard from "@/app/components/personalinfo/personalinfocard";
import DescriptionCard from "@/app/components/ui/descriptionCard";

interface Data {
  title: string;
  description: string;
  tags: string[];
}

type State =
  | "logged out"
  | "guest upload"
  | "image upload"
  | "map selection"
  | "finalization"
  | undefined;

export default function MainPage() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState<State>("image upload");
  const [data, setData] = useState<Data>({
    title: "",
    description: "",
    tags: [],
  });

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const activeCard = (activeState: State) => {
    if (activeState === "logged out") {
      return <PersonalInfoCard />;
    }

    if (activeState === "guest upload") {
      return <PersonalInfoCard />;
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

    return <p>Bad active state!</p>;
  };

  return <div className="p-4 relative">{activeCard(state)}</div>;

  return (
    <div className="p-4 relative">
      <h1 className="text-center text-2xl font-bold mb-6">
        Submit Your Details
      </h1>

      {/* Top-right button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 md:px-6 md:py-3 text-sm md:text-base rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Sign In / Sign Up
        </button>
      </div>

      {/* Existing components */}
      {/*<PersonalInfoCard />
      <ImageUploadCard stateSet={setState} />
      <MapPickerCard />*/}

      {/* Auth Modal */}
      {isModalVisible && <AuthModal onClose={closeModal} />}
    </div>
  );
}
