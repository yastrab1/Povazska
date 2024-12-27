"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/app/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

interface Data {
    title: string;
    description: string;
    tags: string[];
  }

interface Props {
    data: Data;
}

export default function PersonalInfoCard({ data }: Props) {
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
        <CardTitle>{data.title ? data.title : "Načítavam nadpis..." }</CardTitle>
        <CardDescription>{name + " --- " + email}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form>
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
