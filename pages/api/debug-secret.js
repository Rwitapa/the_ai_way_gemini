// pages/api/debug-secret.js
export default function handler(req, res) {
  // --- START OF THE CHANGE ---
  // Log all incoming headers for debugging
  console.log('Incoming Headers:', req.headers);
  // --- END OF THE CHANGE ---

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const serverSecret = process.env.CRON_SECRET;
  const clientSecret = req.headers.authorization?.split(' ')[1];

  if (!clientSecret) {
    return res.status(400).json({ 
        message: 'Error: No secret was sent in the request.',
        // Add a hint for debugging
        hasAuthHeader: !!req.headers.authorization,
    });
  }

  if (clientSecret === serverSecret) {
    return res.status(200).json({ message: 'SUCCESS: The secret is correct!' });
  } else {
    // Do not expose the secrets in the response for security
    return res.status(401).json({ message: 'FAIL: The secret sent does not match the server secret.' });
  }
}
