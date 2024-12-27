"use client";

import React, { useState } from "react";
import { auth } from "@/app/config/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

interface AuthModalProps {
  onClose: () => void;
}


export default function SignUpForm({ onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent, ) => {
    e.preventDefault();
    setError(null);

    try {
      // Create the user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update the user's display name in Firebase Authentication
      await updateProfile(userCredential.user, {
        displayName: `${name} ${surname}`,
      });

      alert("Account created successfully!");
    } catch (err) {
      const e = err as Error;
      setError(e.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignUp} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Surname"
          className="w-full p-2 border rounded-md"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Sign Up
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
