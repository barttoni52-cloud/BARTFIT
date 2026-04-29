// api/subscribe.js — Sauvegarde la subscription push de l'utilisateur
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { subscription } = req.body;
    if (!subscription) return res.status(400).json({ error: 'No subscription' });

    // On stocke la subscription dans un cookie de réponse (simple, single-user)
    res.setHeader('Set-Cookie', `push_sub=${encodeURIComponent(JSON.stringify(subscription))}; Path=/; Max-Age=31536000; SameSite=Lax`);
    res.status(200).json({ success: true, message: 'Subscription saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
