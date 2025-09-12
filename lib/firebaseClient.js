import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Securely access environment variables for Firebase configuration.
// This is the recommended approach for production as it prevents hardcoding 
// sensitive API keys and credentials directly in your source code.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase App
// This function ensures that Firebase is initialized only once.
// In a development environment with hot-reloading (like Next.js), attempting to 
// initialize the app on every reload would cause an error. This singleton pattern prevents that.
function getFirebaseApp(config) {
    // First, validate that the configuration object is present and has a projectId.
    if (!config || !config.projectId) {
        console.error("Firebase configuration is missing or invalid. Please check your environment variables.");
        return null;
    }
    // If there are already initialized apps, return the existing one. Otherwise, initialize a new app.
    return getApps().length ? getApp() : initializeApp(config);
}

const app = getFirebaseApp(firebaseConfig);

// Initialize Firestore and Auth services.
// We conditionally initialize these only if the app was successfully created.
// This prevents errors if the Firebase config is missing.
let db = null;
let auth = null;

if (app) {
    db = getFirestore(app);
    auth = getAuth(app);
}

// Export the initialized instances for use throughout the application.
// This allows other components and pages to access the same instance of Firestore and Auth.
export { app, db, auth };
