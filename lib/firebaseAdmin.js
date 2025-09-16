// lib/firebaseAdmin.js
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

let db;

try {
  // Check if the app is already initialized
  if (!admin.apps.length) {
    // Construct the credential object from individual environment variables
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      // Replace newline characters in the private key
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    };

    if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
        throw new Error('Firebase Admin SDK environment variables are not set.');
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firebase Admin SDK initialized successfully.");
  }
  db = getFirestore();
} catch (error) {
  console.error('CRITICAL: Firebase Admin Initialization Failed.', error.message);
}

export { db };
