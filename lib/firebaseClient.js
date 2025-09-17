// lib/firebaseClient.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

console.log("firebaseClient.js: Module is loading.");

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Log the projectId to make sure it's being read correctly
console.log("firebaseClient.js: Attempting to connect to Firebase Project ID:", firebaseConfig.projectId);

function getFirebaseApp(config) {
    if (!config || !config.projectId) {
        console.error("CRITICAL: Firebase configuration is missing or invalid. Please check your Vercel environment variables.");
        return null;
    }
    console.log("firebaseClient.js: Firebase config appears valid.");
    return getApps().length ? getApp() : initializeApp(config);
}

const app = getFirebaseApp(firebaseConfig);
let db = null;
let auth = null;

if (app) {
    console.log("firebaseClient.js: Firebase app object created.");
    db = getFirestore(app);
    auth = getAuth(app);
    
    // This block ensures every new user (including incognito) gets signed in anonymously.
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            console.log("firebaseClient.js: No user found, attempting anonymous sign-in.");
            signInAnonymously(auth).catch((error) => {
                console.error("firebaseClient.js: Anonymous sign-in failed", error);
            });
        } else {
            console.log("firebaseClient.js: User is present. UID:", user.uid, "Is Anonymous:", user.isAnonymous);
        }
    });

} else {
    console.error("firebaseClient.js: Firebase app could NOT be initialized. Database and Auth services are unavailable.");
}

export { app, db, auth };
