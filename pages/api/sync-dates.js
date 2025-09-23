// pages/api/sync-dates.js
import { adminDb } from '../../lib/firebaseAdmin';
import { Timestamp } from 'firebase-admin/firestore';
import { getNextSprintDates, getNextAcceleratorDates } from '../../lib/constants';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // Get the secret from the request body for more reliability
  const { secret } = req.body;
  if (secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const newSprints = getNextSprintDates(tomorrow, 2);
    const newAccelerators = getNextAcceleratorDates(tomorrow, 5);

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
    
    console.log('Successfully synced cohort dates via request body.');
    return res.status(200).json({ message: 'Cohort dates synced successfully.' });
  } catch (error) {
    console.error("Error in /api/sync-dates:", error);
    return res.status(500).json({ message: `Error syncing dates: ${error.message}` });
  }
}
