// pages/api/razorpay/webhook.js
import { adminDb } from '@/lib/firebaseAdmin';
import crypto from 'crypto';
import getRawBody from 'raw-body';

export const config = {
  api: {
    bodyParser: false, // we need raw body for signature verification
  },
};

function verifySignature(rawBodyBuffer, receivedSignature, secret) {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBodyBuffer)
    .digest('hex');
  // Razorpay sends lowercase hex; do a timing-safe compare
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(receivedSignature || '', 'utf8');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) return res.status(500).json({ error: 'Webhook secret not set' });

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['x-razorpay-signature'];

    if (!verifySignature(rawBody, signature, secret)) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const event = JSON.parse(rawBody.toString('utf8'));
    // event.event could be "payment.captured", "order.paid", etc.
    const evtType = event?.event || 'unknown';

    // Try to pull useful identifiers defensively
    const paymentEntity = event?.payload?.payment?.entity || {};
    const orderEntity = event?.payload?.order?.entity || {};

    const orderId =
      paymentEntity.order_id ||
      orderEntity.id ||
      event?.payload?.payment?.entity?.order_id ||
      event?.payload?.order?.entity?.id;

    const paymentId = paymentEntity.id;
    const email = paymentEntity.email || paymentEntity.notes?.email;
    const contact = paymentEntity.contact || paymentEntity.notes?.contact;
    const amount = paymentEntity.amount;
    const currency = paymentEntity.currency;
    const status = paymentEntity.status || orderEntity.status;

    if (!orderId) {
      // We at least need orderId to write idempotently
      return res.status(400).json({ error: 'orderId not found in payload' });
    }

    // Idempotent write: 1 doc per order; keep last-known state + a payments map
    const docRef = adminDb.collection('registrations').doc(orderId);

    await docRef.set(
      {
        orderId,
        lastEventType: evtType,
        lastEventAt: new Date(),
        // Store denormalized fields you care about for quick reads
        email: email ?? null,
        contact: contact ?? null,
        amount: typeof amount === 'number' ? amount : null,
        currency: currency ?? null,
        status: status ?? null,
        // Indexable snapshot for audits/debugging
        payments: paymentId
          ? {
              [paymentId]: {
                paymentId,
                status: status ?? null,
                amount: typeof amount === 'number' ? amount : null,
                currency: currency ?? null,
                email: email ?? null,
                contact: contact ?? null,
                captured:
                  paymentEntity.captured === true || paymentEntity.status === 'captured',
                created_at: paymentEntity.created_at
                  ? new Date(paymentEntity.created_at * 1000)
                  : new Date(),
                updatedAt: new Date(),
              },
            }
          : {},
        // Keep the raw event minimally for traceability (optional; can be large)
        _rawLastEvent: {
          type: evtType,
          receivedAt: new Date().toISOString(),
        },
      },
      { merge: true }
    );

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(500).json({ error: err?.message || 'Unknown error' });
  }
}
