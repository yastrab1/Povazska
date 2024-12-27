"use client";

import React, { useState } from "react";
import ImageUploadCard from "@/app/components/ui/uploadCard";
import MapPickerCard from "@/app/components/maps/mapPickerCard";
import AuthModal from "@/app/components/signin/authmodal";
import PersonalInfoCard from "@/app/components/personalinfo/personalinfocard";
import DescriptionCard from "@/app/components/ui/descriptionCard"
import isLoggedIn from "@/lib/isLoggedIn";
import { useEffect } from "react";
import useIsLoggedIn from "@/lib/isLoggedIn";


type State =
  | "logged in"
  | "logged out"
  | "guest upload"
  | "image upload"
  | "map selection"
  | "finalization"
  | undefined;

export default function MainPage() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState<State>('logged out');
  const { loggedIn, name, email } = useIsLoggedIn();

  if (loggedIn){
    setState('logged in')
  }
  
  

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const activeCard = (activeState: State) => {
    if (activeState === "logged out") {
      return <AuthModal onClose={closeModal}/>;
    }

    if (activeState === "guest upload") {
      return <PersonalInfoCard logname={name} logemail={email} stateSet={setState}/>;
    }

    if (activeState === "image upload") {
      return <ImageUploadCard stateSet={setState}/>;
    }

    if (activeState === "map selection") {
      return <MapPickerCard stateSet={setState}/>;
    }

    if (activeState === "finalization") {
      return <DescriptionCard loading={true}></DescriptionCard>
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
      <PersonalInfoCard />
      <ImageUploadCard stateSet={setState}/>
      <MapPickerCard />

      {/* Auth Modal */}
      {isModalVisible && <AuthModal onClose={closeModal} />}
    </div>
  );
}
