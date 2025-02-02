import {openai} from "@ai-sdk/openai";
import {Timestamp} from "firebase/firestore";

export const model = openai('gpt-4o-2024-08-06');
export type State =
    | "logged in"
    | "guest upload"
    | "image upload"
    | "map selection"
    | "tag selection"
    | "finalization"
    | undefined
    | number;
type Tags =
    | "Neporiadok a odpadky"
    | "Cyklostojany"
    | "Doprava a parkovanie"
    | "Cesty a chodniky"
    | "Údržba majetku"
    | "Dreviny a zeleň"
    | "Detské ihriská"
    | "Lavičky a koše"
    | "Stavebný úrad"
    | "Nájomné bývanle"
    | "Dane a poplatky"
    | "Ľudia bez domova"
    | "Sociálna pomoc"
    | "Matrika a pobyty"
    | "Kultúra a šport"
    | "Iné podnety";

export interface Data {
    title: string | null;
    description: string | null;
    rankings: [Tags, number][];
    images: string[];
    lat: number;
    lng: number;
    userSelectedTags: string[];
    duplicates: Issue[];
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