// rwitapa/the_ai_way_gemini/the_ai_way_gemini-staging/lib/firebaseClient.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getFirebaseApp(config) {
    if (!config || !config.projectId) {
        console.error("CRITICAL: Firebase configuration is missing or invalid. Please check your Vercel environment variables. All variables starting with NEXT_PUBLIC_FIREBASE_ must be set.");
        return null;
    }
    return getApps().length ? getApp() : initializeApp(config);
}

const app = getFirebaseApp(firebaseConfig);

let db = null;
let auth = null;

if (app) {
    db = getFirestore(app);
    auth = getAuth(app);
} else {
    console.error("Firebase app could not be initialized. Database and Auth services are unavailable.");
}

export { app, db, auth };
