// lib/firebaseClient.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

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
        console.error("CRITICAL: Firebase configuration is missing or invalid. Check your environment variables.");
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
    
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            signInAnonymously(auth).catch((error) => {
                console.error("Firebase Anonymous sign-in failed:", error);
            });
        }
    });

} else {
    console.error("Firebase app could NOT be initialized. Database and Auth services are unavailable.");
}

export { app, db, auth };
