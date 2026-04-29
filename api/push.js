// api/push.js — Envoie une notification push
import webpush from 'web-push';

const VAPID_PUBLIC  = process.env.VAPID_PUBLIC_KEY;
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY;
const VAPID_EMAIL   = process.env.VAPID_EMAIL || 'mailto:bartfit@app.com';

webpush.setVapidDetails(VAPID_EMAIL, VAPID_PUBLIC, VAPID_PRIVATE);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { subscription, title, body, icon } = req.body;
    if (!subscription) return res.status(400).json({ error: 'No subscription' });

    const payload = JSON.stringify({
      title: title || 'BartFit 💪',
      body:  body  || 'Nouveau message BartFit !',
      icon:  icon  || '/logo.png',
      badge: '/logo.png',
      tag:   'bartfit-push',
    });

    await webpush.sendNotification(subscription, payload);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Push error:', err);
    res.status(500).json({ error: err.message });
  }
}
