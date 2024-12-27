"use client";

import React, { useState } from "react";

type State =
  | "logged out"
  | "guest upload"
  | "image upload"
  | "map selection"
  | "finalization"
  | undefined;


interface Props {
    stateSet: (state: State) => void;
    logname: string
    logemail: string
  }

export default function PersonalInfoCard({stateSet, logname, logemail}: Props) {
  const [name, setName] = useState(logname);
  const [email, setEmail] = useState(logemail);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 shadow-lg rounded-lg bg-white relative">
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
    <button
      type="button"
      className="absolute bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      onClick={() => stateSet('image upload')}
    >
      Next
    </button>
  </form>
</div>

  );
}
