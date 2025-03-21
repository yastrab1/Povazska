
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/app/components/header/header";
import { Analytics } from "@vercel/analytics/react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Podnety",
  description: "Ai powered podnety",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <SpeedInsights/>
      <Analytics/>
      <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Header></Header>
      {children}
      <div className={"fixed bottom-0 w-full overflow-hidden bg-secondary flex justify-center"}>
          <Button><Link href={"/"}>+</Link></Button>
          <Button><Link href={"/dashboard"}>Dashboard</Link></Button>
      </div>
      </body>
      </html>
  );
}
