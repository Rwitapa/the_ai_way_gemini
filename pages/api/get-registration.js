// pages/api/get-registration.js
import { adminDb } from '@/lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end('Method Not Allowed');

  const { orderId } = req.query;
  if (!orderId) return res.status(400).json({ error: 'orderId is required' });

  try {
    const appId = process.env.FIREBASE_APP_ID;
    const colPath = appId ? `artifacts/${appId}/private/registrations` : 'registrations';

    const snap = await adminDb.collection(colPath).doc(orderId).get();
    if (!snap.exists) return res.status(404).json({ error: 'Not found' });

    const data = snap.data();
    return res.status(200).json({ data });
  } catch (e) {
    console.error('get-registration error:', e);
    return res.status(500).json({ error: e?.message || 'Unknown error' });
  }
}
