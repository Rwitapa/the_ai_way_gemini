// pages/api/razorpay-webhook.js
import { db } from '../../lib/firebaseAdmin';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import crypto from 'crypto';

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

export default async function handler(req, res) {
  console.log("WEBHOOK: Received a request.");

  if (!db) {
    console.error('FATAL: Firestore Admin DB is not initialized. Check firebaseAdmin.js and environment variables.');
    return res.status(500).json({ message: 'Server configuration error: Database connection failed.' });
  }

  if (req.method !== 'POST') {
    console.log(`WEBHOOK: Denied non-POST request. Method: ${req.method}`);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // --- 1. Signature Verification ---
  const razorpaySignature = req.headers['x-razorpay-signature'];
  const hmac = crypto.createHmac('sha256', RAZORPAY_WEBHOOK_SECRET);
  hmac.update(JSON.stringify(req.body));
  const digest = hmac.digest('hex');

  if (digest !== razorpaySignature) {
    console.error("WEBHOOK: Invalid signature. Request denied.");
    return res.status(400).json({ message: 'Invalid signature' });
  }
  console.log("WEBHOOK: Signature verified successfully.");

  // --- 2. Event Check ---
  console.log(`WEBHOOK: Event received: ${req.body.event}`);
  if (req.body.event === 'payment.captured') {
    const payment = req.body.payload.payment.entity;
    const { id, order_id, notes, amount, created_at } = payment;
    console.log(`WEBHOOK: Processing payment.captured for Order ID: ${order_id}`);

    // --- 3. Data Parsing ---
    const { courseType, cohort, name, email, phone } = notes;
    console.log("WEBHOOK: Parsed notes:", { courseType, cohort, name, email, phone });

    let parsedCohort;
    try {
        if (courseType === 'sprint') {
            parsedCohort = new Date(JSON.parse(cohort));
        } else if (courseType === 'accelerator') {
            const cohortObj = JSON.parse(cohort);
            parsedCohort = {
                start: new Date(cohortObj.start),
                end: new Date(cohortObj.end)
            };
        }
    } catch (e) {
        console.error("WEBHOOK: Error parsing cohort date from notes.", e);
        parsedCohort = null; // Set to null if parsing fails
    }
    
    // --- 4. Prepare Data for Firestore ---
    const registrationData = {
      paymentId: id,
      orderId: order_id,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      courseType: courseType,
      cohortDate: parsedCohort,
      amount: amount / 100, // Convert from paise to rupees
      timestamp: Timestamp.now(),
      paymentStatus: 'captured',
    };
    console.log("WEBHOOK: Prepared data for Firestore:", registrationData);
    
    // --- 5. Write to Firestore ---
    try {
      const appId = process.env.NEXT_PUBLIC_FIRE_APP_ID || 'default-app-id';
      const registrationPath = `/artifacts/${appId}/private/registrations`;
      console.log(`WEBHOOK: Attempting to write to Firestore path: ${registrationPath}`);
      
      const docRef = await addDoc(collection(db, registrationPath), registrationData);
      
      console.log(`WEBHOOK: Successfully saved registration with Document ID: ${docRef.id}`);
      return res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.error(`WEBHOOK: Firestore write error for Order ID ${order_id}:`, error);
      return res.status(500).json({ message: 'Failed to save data' });
    }
  }

  res.status(200).json({ message: 'Event received, but not the "payment.captured" event.' });
}
