"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/app/config/firebase";

export default function PersonalInfoCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch user data from Firebase Auth if logged in
    console.log(auth.currentUser?.displayName)
    const user = auth.currentUser;
    console.log(user)
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, []);



  return (
    <div className="max-w-md mx-auto mt-8 p-4 shadow-lg rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
       
      </form>
    </div>
  );
}
