// lib/firebaseAdmin.js
import { getApps, initializeApp, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app =
  getApps().length > 0
    ? getApp()
    : initializeApp({
        credential: {
          getCertificate() {
            // Lazy shape compatible with firebase-admin
            return {
              projectId: process.env.FIREBASE_PROJECT_ID,
              clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
              privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            };
          },
        },
      });

export const adminDb = getFirestore(app);
