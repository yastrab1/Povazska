"use client";

import React, { useState } from "react";
import SignInForm from "@/app/components/signin/signin";
import SignUpForm from "@/app/components/signin/signup";

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false); // Default is Sign In

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        {/* Header with toggle */}
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`px-4 py-2 font-bold ${
              !isSignUp ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"
            }`}
            onClick={() => setIsSignUp(false)}
          >
            Sign In
          </button>
          <button
            className={`px-4 py-2 font-bold ${
              isSignUp ? "text-green-500 border-b-2 border-green-500" : "text-gray-500"
            }`}
            onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </button>
        </div>

        {/* Content */}
        {isSignUp ? <SignUpForm onClose={onClose}/> : <SignInForm onClose={onClose} />}
      </div>
    </div>
  );
}
