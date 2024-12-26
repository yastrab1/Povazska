"use client";

import React, { useEffect, useState } from "react";
import ImageUploadCard from "@/app/components/ui/upload";
import MapPickerCard from "@/app/components/maps/mapPickerCard";
import AuthModal from "@/app/components/signin/authmodal";
import PersonalInfoCard from "@/app/components/personalinfo/personalinfocard";
import { auth } from "./config/firebase";

export default function MainPage() {
  const [isModalVisible, setModalVisible] = useState(false);
  

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <div className="p-4 relative">
      <h1 className="text-center text-2xl font-bold mb-6">Submit Your Details</h1>

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
      <ImageUploadCard />
      <MapPickerCard />

      {/* Auth Modal */}
      {isModalVisible && <AuthModal onClose={closeModal} />}
    </div>
  );
}
