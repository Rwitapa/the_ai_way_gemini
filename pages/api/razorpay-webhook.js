// pages/api/razorpay-webhook.js
import { adminDb } from '../../lib/firebaseAdmin';
import getRawBody from 'raw-body';
import crypto from 'crypto';
import { Timestamp } from 'firebase-admin/firestore';

export const config = {
  api: { bodyParser: false },
};

function verifyRazorpaySignature(rawBody, receivedSig, secret) {
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  if (!receivedSig || typeof receivedSig !== 'string') return false;
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(receivedSig, 'utf8');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return res.status(500).json({ error: 'RAZORPAY_WEBHOOK_SECRET missing' });

  try {
    const raw = await getRawBody(req);
    const sig = req.headers['x-razorpay-signature'];

    if (!verifyRazorpaySignature(raw, sig, secret)) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const event = JSON.parse(raw.toString('utf8'));
    const type = event?.event || 'unknown';
    const pay = event?.payload?.payment?.entity || {};
    const ord = event?.payload?.order?.entity || {};
    const orderId = pay.order_id || ord.id;
    const paymentId = pay.id || null;
    if (!orderId) return res.status(400).json({ error: 'orderId missing' });

    const shouldPersist = ['payment.captured', 'order.paid'].includes(type);
    if (!shouldPersist) return res.status(200).json({ ok: true, ignored: type });

    const notes = pay.notes || {};

    let finalCohortData = null;
    if (notes.cohort) {
      try {
        const parsedCohort = JSON.parse(notes.cohort);
        
        if (parsedCohort && typeof parsedCohort === 'object' && parsedCohort.start) {
          finalCohortData = {
            start: Timestamp.fromDate(new Date(parsedCohort.start)),
            end: Timestamp.fromDate(new Date(parsedCohort.end))
          };
        } 
        else if (typeof parsedCohort === 'string') {
          finalCohortData = Timestamp.fromDate(new Date(parsedCohort));
        }
      } catch (e) {
        console.error('Error parsing cohort data:', e);
        finalCohortData = notes.cohort; // Fallback
      }
    }

    const registration = {
      orderId,
      paymentId,
      courseType: notes.courseType ?? null,
      cohort: finalCohortData,
      customerName: notes.name ?? null,
      customerEmail: notes.email ?? null,
      customerPhone: notes.phone ?? null,
      amount: typeof pay.amount === 'number' ? pay.amount / 100 : null,
      currency: pay.currency || 'INR',
      paymentStatus: pay.status || 'captured',
      lastEventType: type,
      lastEventAt: new Date(),
      _trace: { receivedAt: new Date().toISOString() },
    };

    const appId = process.env.FIREBASE_APP_ID;
    const colPath = appId ? `artifacts/${appId}/registrations` : 'registrations';

    await adminDb.collection(colPath).doc(orderId).set(registration, { merge: true });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ error: err?.message || 'Unknown error' });
  }
}
