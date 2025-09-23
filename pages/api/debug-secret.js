// pages/api/debug-secret.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // --- START OF THE CHANGE ---
    // Get the secret from the request body instead of the header
    const { secret: clientSecret } = req.body;
    const serverSecret = process.env.CRON_SECRET;
    // --- END OF THE CHANGE ---

    console.log('Incoming Body:', req.body); // Log the body for debugging

    if (!clientSecret) {
      return res.status(400).json({ message: 'Error: No secret was sent in the request body.' });
    }

    if (clientSecret === serverSecret) {
      return res.status(200).json({ message: 'SUCCESS: The secret is correct!' });
    } else {
      return res.status(401).json({ message: 'FAIL: The secret sent does not match the server secret.' });
    }
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return res.status(500).json({ message: 'Server error while parsing request body.' });
  }
}
