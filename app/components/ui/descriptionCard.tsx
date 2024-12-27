"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/app/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


interface Props {
    loading: boolean;
}

export default function PersonalInfoCard({ loading }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Fetch user data from Firebase Auth if logged in
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName || "");
        setEmail(user.email || "");
      }
    })
  });

  return (
    <Card className="max-w-md mx-auto mt-8 shadow-lg">
      <CardHeader>
        <CardTitle>{loading ? "Načítavam nadpis...": "Vyplň popis"}</CardTitle>
        <CardDescription>{name + " --- " + email}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form action={(data: FormData) => {}}>
            <Input></Input>
        </Form>
      </CardContent>
      <CardFooter>
        <Button onClick={() => {}}>
          Upload Images!
        </Button>
      </CardFooter>
    </Card>
  );
}
