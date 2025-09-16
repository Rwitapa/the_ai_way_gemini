// lib/firebaseAdmin.js
import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

let db;

try {
  // --- FINAL DIAGNOSTIC LOGS ---
  console.log("--- Firebase Admin Auth Diagnosis ---");
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  console.log("FIREBASE_PROJECT_ID:", projectId ? `Exists (Length: ${projectId.length})` : "MISSING or EMPTY");
  console.log("FIREBASE_CLIENT_EMAIL:", clientEmail ? `Exists (Length: ${clientEmail.length})` : "MISSING or EMPTY");
  console.log("FIREBASE_PRIVATE_KEY:", privateKey ? `Exists (Length: ${privateKey.length})` : "MISSING or EMPTY");
  // --- END DIAGNOSTIC LOGS ---

  if (!admin.apps.length) {
    const serviceAccount = {
      projectId: projectId,
      clientEmail: clientEmail,
      privateKey: privateKey.replace(/\\n/g, '\n'),
    };

    if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
        throw new Error('One or more Firebase Admin SDK environment variables are not set.');
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
