// pages/api/create-razorpay-order.js
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { amount, courseType, cohort, customerName, customerEmail, customerPhone } = req.body;

  if (!customerName) {
    return res.status(400).json({ message: 'Customer name is required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    return res.status(400).json({ message: 'A valid email is required.' });
  }
  if (!/^[6-9]\d{9}$/.test(customerPhone)) {
    return res.status(400).json({ message: 'A valid 10-digit phone number is required.' });
  }

  try {
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        courseType,
        cohort: JSON.stringify(cohort),
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
      },
      payment_capture: 1,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
}
