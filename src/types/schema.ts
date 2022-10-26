import { Timestamp } from "firebase/firestore";

export type User = {
    user_id: string;
    admin: boolean;
    audio: string[];
    email: string;
    grants: string[];
    language: string;
}

export type Audio = {
    audio_id: string;
    audio_file: string;
    authors: string[];
    description: string;
    title: string;
}

export type Grant = {
    grant_id: string;
    amount: number; //string for now, waiting on Jamie to determine type
    category: string;
    countries: string[];
    deadline: Timestamp | Date;
    description: string;
    duration: string; //string for now, waiting on Jamie to determine type
    subject: string;
    title: string;
}