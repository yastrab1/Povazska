"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/app/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { addIssue } from "@/lib/firebase/issueUpload";
import { Data } from "@/app/page";

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
    });
  });

  const form = useForm({
    defaultValues: {
      popis: data.description || "", // Default popis to data.description
    },
  });
  useEffect(() => {
    form.reset({ popis: data.description || "" }); // Reset form values when data.description updates
  }, [data.description, form]);

  return (
    <Card className="max-w-md mx-auto mt-8 shadow-lg">
      <CardHeader>
        <CardTitle>{data.title ? data.title : "Načítavam nadpis..."}</CardTitle>
        <CardDescription>{name + " --- " + email}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <FormField
            control={form.control}
            name="popis"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Popis</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>Zadaj popis k podnetu.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      </CardContent>
      <CardFooter>
        <Button onClick={() => addIssue(data)}>Upload Images!</Button>
      </CardFooter>
    </Card>
  );
}
