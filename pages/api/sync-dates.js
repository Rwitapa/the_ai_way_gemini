// pages/api/sync-dates.js
import { adminDb } from '../../lib/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';
import { getNextSprintDates, getNextAcceleratorDates } from '../../lib/constants';

export default async function handler(req, res) {
  // 1. Secure the endpoint with a secret key
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // 2. The same logic from your "Force Sync" button
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const newSprints = getNextSprintDates(tomorrow, 60); // Get dates for the next 60 days
    const newAccelerators = getNextAcceleratorDates(tomorrow, 5); // Get dates for the next 5 years

    const newDatesForDb = {
        sprint: newSprints.map(d => Timestamp.fromDate(d)),
        accelerator: newAccelerators.map(c => ({
            start: Timestamp.fromDate(c.start),
            end: Timestamp.fromDate(c.end)
        }))
    };

    const appId = process.env.FIREBASE_APP_ID;
    if (!appId) {
        throw new Error("FIREBASE_APP_ID is not set in environment variables.");
    }
    const datesDocRef = adminDb.doc(`/artifacts/${appId}/public/data/cohorts/dates`);
    
    await datesDocRef.set(newDatesForDb);
    
    console.log('Successfully synced cohort dates.');
    return res.status(200).json({ message: 'Cohort dates synced successfully.' });
  } catch (error) {
    console.error("Error in /api/sync-dates:", error);
    return res.status(500).json({ message: `Error syncing dates: ${error.message}` });
  }
}
