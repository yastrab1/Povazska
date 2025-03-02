import {google} from '@ai-sdk/google';


import {Timestamp} from "firebase/firestore";
import {LanguageModel} from "ai";

export const model = google('gemini-2.0-flash', {}) as LanguageModel;
export type formProgress =
    | "personal info"
    | "image upload"
    | "map selection"
    | "ai tag selection"
    | "custom tag selection"
    | "finalization"
    | undefined
    | number;
export const allTags: string[] = ["Neporiadok a odpadky"
    , "Cyklostojany"
    , "Doprava a parkovanie"
    , "Cesty a chodniky"
    , "Údržba majetku"
    , "Dreviny a zeleň"
    , "Detské ihriská"
    , "Lavičky a koše"
    , "Stavebný úrad"
    , "Nájomné bývanle"
    , "Dane a poplatky"
    , "Ľudia bez domova"
    , "Sociálna pomoc"
    , "Matrika a pobyty"
    , "Kultúra a šport"
    , "Iné podnety"] as const;
export type Tags = typeof allTags[number]; //Typescript hack


export interface Data {
    title: string | null;
    description: string | null;
    rankings: [Tags, number][];
    images: string[];
    lat: number;
    lng: number;
    userSelectedTags: string[];
    duplicates: Issue[];
    readyToUpload: boolean;
}

export interface Issue {
    title: string | null;
    description: string | null;
    tags: string[];
    images: string[];
    lat: number;
    lng: number;
    status: string,
    timestamp: Timestamp;
    resolve: string;
}