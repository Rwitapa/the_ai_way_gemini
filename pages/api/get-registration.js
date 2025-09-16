// pages/api/get-registration.js
import { db } from '../../lib/firebaseAdmin'; // <-- UPDATED IMPORT
import { collection, query, where, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { orderId } = req.query;

  if (!orderId) {
    return res.status(400).json({ message: 'Order ID is required' });
  }

  try {
    const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'default-app-id';
    const registrationPath = `/artifacts/${appId}/private/registrations`;
    const q = query(collection(db, registrationPath), where('orderId', '==', orderId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    const registration = querySnapshot.docs[0].data();
    
    // Convert Firestore Timestamp to a serializable format (ISO string) for the API response
    if (registration.timestamp && registration.timestamp.toDate) {
      registration.timestamp = registration.timestamp.toDate().toISOString();
    }
    if (registration.cohortDate && registration.cohortDate.toDate) {
      registration.cohortDate = registration.cohortDate.toDate().toISOString();
    } else if (registration.cohortDate && registration.cohortDate.start && registration.cohortDate.start.toDate) {
      registration.cohortDate.start = registration.cohortDate.start.toDate().toISOString();
      registration.cohortDate.end = registration.cohortDate.end.toDate().toISOString();
    }

    res.status(200).json(registration);
  } catch (error) {
    console.error('Error fetching registration:', error);
    res.status(500).json({ message: 'Failed to fetch registration data' });
  }
}
