// pages/api/razorpay-webhook.js
import { db } from '../../lib/firebaseAdmin';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import crypto from 'crypto';

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

export default async function handler(req, res) {
  if (!db) {
    console.error('FATAL: Firestore Admin DB is not initialized. Check firebaseAdmin.js and environment variables.');
    return res.status(500).json({ message: 'Server configuration error: Database connection failed.' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const razorpaySignature = req.headers['x-razorpay-signature'];
  const hmac = crypto.createHmac('sha256', RAZORPAY_WEBHOOK_SECRET);
  hmac.update(JSON.stringify(req.body));
  const digest = hmac.digest('hex');

  if (digest !== razorpaySignature) {
    return res.status(400).json({ message: 'Invalid signature' });
  }

  if (req.body.event === 'payment.captured') {
    const payment = req.body.payload.payment.entity;
    const { id, order_id, notes, amount } = payment;
    const { courseType, cohort, name, email, phone } = notes;
    
    let parsedCohort;
    try {
        if (courseType === 'sprint' || courseType === '3-Hour Champion Sprint') {
            parsedCohort = new Date(JSON.parse(cohort));
        } else if (courseType === 'accelerator' || courseType === '16-Hour Superstar Accelerator') {
            const cohortObj = JSON.parse(cohort);
            parsedCohort = {
                start: new Date(cohortObj.start),
                end: new Date(cohortObj.end)
            };
        }
    } catch (e) {
        console.error("Error parsing cohort date from notes.", e);
        parsedCohort = null;
    }
    
    const registrationData = {
      paymentId: id,
      orderId: order_id,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      courseType: courseType,
      cohortDate: parsedCohort,
      amount: amount / 100,
      timestamp: Timestamp.now(),
      paymentStatus: 'captured',
    };
    
    try {
      // *** FIX APPLIED: Using a server-side environment variable ***
      // This now uses FIREBASE_APP_ID, which is safe for server-side execution on Vercel.
      const appId = process.env.FIREBASE_APP_ID;
      
      if (!appId) {
          // This error will now correctly trigger if the new variable is missing.
          throw new Error("FIREBASE_APP_ID environment variable is not defined.");
      }
      
      const registrationPath = `/artifacts/${appId}/private/registrations`;
      await addDoc(collection(db, registrationPath), registrationData);
      
      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.error(`Firestore write error for Order ID ${order_id}:`, error);
      return res.status(500).json({ message: 'Failed to save data' });
    }
  }

  res.status(200).json({ message: 'Event received, but not the "payment.captured" event.' });
}
