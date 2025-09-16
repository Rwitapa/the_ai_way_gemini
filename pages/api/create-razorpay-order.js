import Razorpay from 'razorpay';

// IMPORTANT: Use environment variables for keys in production
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { amount, courseType, cohort, customerName, customerEmail, customerPhone } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        courseType,
        cohort: JSON.stringify(cohort),
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
      },
      payment_capture: 1, // Auto-capture payment
    });

    res.status(200).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
}
