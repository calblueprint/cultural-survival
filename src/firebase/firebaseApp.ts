// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import {Firestore, getFirestore} from "firebase/firestore"; 

import {
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
  } from "@env";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDB0ZyQaONWL5UMELG5mV2noeASRw2fClE",
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
let analytics:Analytics, db:Firestore;
if (firebaseConfig?.projectId) {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  if (app.name && typeof window !== 'undefined') {
    analytics = getAnalytics(app);
  }

  // Access Firebase services using shorthand notation
  db = getFirestore(firebaseApp);
}

export { db, analytics }