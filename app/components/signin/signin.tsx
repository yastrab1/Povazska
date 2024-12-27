"use client";

import React, { useState } from "react";
import { auth } from "@/app/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

interface AuthModalProps {
    onClose: () => void;
  }

export default function SignInForm( { onClose }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Signed in successfully!");
      onClose()
      
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
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
        Sign In
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
}
