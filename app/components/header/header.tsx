"use client";
import React, { useState } from "react";
import { auth } from "@/app/config/firebase";
import { signOut } from "firebase/auth";
import useIsLoggedIn from "@/app/hooks/useIsLoggedIn";
import AuthModal from "@/app/components/signin/authmodal";
import { Button } from "@/components/ui/button";

export default function Header() {
  const { loggedIn, name } = useIsLoggedIn(); // Custom hook to get auth state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully!");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <header className="bg-gray-800  p-4 flex justify-between items-center">
      {/* App Logo */}
      <h1 className="text-lg font-bold text-white">My App</h1>

      {/* Sign In/Out Section */}
      <div className="flex items-center space-x-4">
        {loggedIn ? (
          <>
            <span className="text-sm text-white">
              Welcome, {name || "User"} 
            </span>
            <Button variant="outline" onClick={handleSignOut} className="text-black"> 
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(true)}
              className="text-sm text-black"
            >
              Sign In
            </Button>
          </>
        )}
      </div>

      {/* Sign In/Sign Up Modal */}
      {isModalOpen && (
        <AuthModal onClose={() => setIsModalOpen(false)} />
      )}
    </header>
  );
}
