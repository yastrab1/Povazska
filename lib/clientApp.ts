'use client';

import { initializeApp, getApps } from "firebase/app";
import { firebaseConfig } from "@/app/config/firebase";
import { getStorage } from "firebase/storage";
export const firebaseApp =
    getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const storage = getStorage(firebaseApp);