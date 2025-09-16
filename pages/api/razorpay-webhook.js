// pages/api/razorpay-webhook.js
import { adminDb } from '../../lib/firebaseAdmin';
import getRawBody from 'raw-body';
import crypto from 'crypto';

export const config = {
  api: { bodyParser: false }, // raw body needed for signature verification
};

function verifyRazorpaySignature(rawBody, receivedSig, secret) {
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  if (!receivedSig || typeof receivedSig !== 'string') return false;
  // timing-safe compare
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

    // Pull payment/order safely
    const pay = event?.payload?.payment?.entity || {};
    const ord = event?.payload?.order?.entity || {};

    const orderId = pay.order_id || ord.id;
    const paymentId = pay.id || null;
    if (!orderId) return res.status(400).json({ error: 'orderId missing' });

    // Only persist on useful events
    const shouldPersist = ['payment.captured', 'order.paid'].includes(type);
    if (!shouldPersist) return res.status(200).json({ ok: true, ignored: type });

    // Notes you set while creating the Razorpay order
    const notes = pay.notes || {};
    const registration = {
      orderId,
      paymentId,
      courseType: notes.courseType ?? null,
      cohort: notes.cohort ?? null, // keep raw; parse later if you want
      customerName: notes.name ?? null,
      customerEmail: notes.email ?? null,
      customerPhone: notes.phone ?? null,
      amount: typeof pay.amount === 'number' ? pay.amount / 100 : null,
      currency: pay.currency || 'INR',
      paymentStatus: pay.status || 'captured',
      lastEventType: type,
      lastEventAt: new Date(),
      // keep a lightweight trace
      _trace: { receivedAt: new Date().toISOString() },
    };

    // IMPORTANT: No leading slash in path; Admin SDK uses strings
    // You have FIREBASE_APP_ID set in Vercel; we’ll nest under artifacts/{appId}/private/registrations
    const appId = process.env.FIREBASE_APP_ID;
    const colPath = appId
      ? `artifacts/${appId}/registrations`
      : 'registrations';

    await adminDb.collection(colPath).doc(orderId).set(registration, { merge: true });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ error: err?.message || 'Unknown error' });
  }
}
