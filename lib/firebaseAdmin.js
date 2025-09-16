// lib/firebaseAdmin.js
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// IMPORTANT: Ensure your service account key is stored in this environment variable as a JSON string.
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccount))
    });
  } catch (error) {
    console.error('Firebase Admin Initialization Error', error.stack);
  }
}

const db = getFirestore();

export { db };
