// pages/api/razorpay-webhook.js
import { db } from '../../lib/firebaseAdmin'; // <-- UPDATED IMPORT
import { collection, addDoc, Timestamp } from 'firebase/firestore'; // Use Timestamp from 'firebase/firestore' for compatibility
import crypto from 'crypto';

// IMPORTANT: Use environment variables for the webhook secret
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // ... (Signature verification code remains the same)

  const razorpaySignature = req.headers['x-razorpay-signature'];
  const hmac = crypto.createHmac('sha256', RAZORPAY_WEBHOOK_SECRET);
  hmac.update(JSON.stringify(req.body));
  const digest = hmac.digest('hex');

  if (digest !== razorpaySignature) {
    return res.status(400).json({ message: 'Invalid signature' });
  }

  if (req.body.event === 'payment.captured') {
    const payment = req.body.payload.payment.entity;
    const { id, order_id, notes, created_at } = payment;

    const { courseType, cohort, name, email, phone } = notes;
    
    let parsedCohort;
    if (courseType === 'sprint') {
        parsedCohort = new Date(JSON.parse(cohort));
    } else if (courseType === 'accelerator') {
        parsedCohort = JSON.parse(cohort);
        parsedCohort.start = new Date(parsedCohort.start);
        parsedCohort.end = new Date(parsedCohort.end);
    }
    
    const registrationData = {
      paymentId: id,
      orderId: order_id,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      courseType: courseType,
      cohortDate: parsedCohort,
      timestamp: Timestamp.now(), // Use Admin SDK's Timestamp
      paymentStatus: 'captured',
    };
    
    try {
      const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID || 'default-app-id';
      const registrationPath = `/artifacts/${appId}/private/registrations`;
      await addDoc(collection(db, registrationPath), registrationData);
      console.log(`Successfully saved registration for payment ID: ${id}`);
      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.error(`Error saving registration for payment ID ${id}:`, error);
      return res.status(500).json({ message: 'Failed to save data' });
    }
  }

  res.status(200).json({ message: 'Event received, but not handled.' });
}
