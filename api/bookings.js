// Vercel Serverless Function Proxy (/api/bookings)
// Connects Vercel serverlessly to persistent cloud storage with zero CORS / adblocker interference

const CLOUD_URL = 'https://jsonblob.com/api/jsonBlob/019f98ae-6aec-7633-98f4-31a67e75c5db';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle PUT or POST requests (New booking or Status change)
  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

      // 1. Fetch current cloud state
      let currentCloudData = { bookings: [], notifications: [] };
      try {
        const getRes = await fetch(CLOUD_URL, { headers: { 'Accept': 'application/json' } });
        if (getRes.ok) {
          currentCloudData = await getRes.json();
        }
      } catch (e) {}

      let updatedBookings = currentCloudData.bookings || [];
      let updatedNotifications = currentCloudData.notifications || [];

      if (body?.updatedBookings && Array.isArray(body.updatedBookings)) {
        updatedBookings = body.updatedBookings;
      } else if (body?.booking) {
        const index = updatedBookings.findIndex(b => b.id === body.booking.id);
        if (index >= 0) {
          updatedBookings[index] = { ...updatedBookings[index], ...body.booking };
        } else {
          updatedBookings = [body.booking, ...updatedBookings];
        }
        if (body.notification) {
          const notifExists = updatedNotifications.some(n => n.id === body.notification.id);
          if (!notifExists) {
            updatedNotifications = [body.notification, ...updatedNotifications];
          }
        }
      }

      // 2. Save updated data back to cloud storage
      await fetch(CLOUD_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          bookings: updatedBookings,
          notifications: updatedNotifications
        })
      });

      return res.status(200).json({
        success: true,
        bookings: updatedBookings,
        notifications: updatedNotifications
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // GET Request: Return current persistent cloud data
  try {
    const cloudRes = await fetch(CLOUD_URL, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });

    if (cloudRes.ok) {
      const data = await cloudRes.json();
      return res.status(200).json(data);
    }
  } catch (err) {}

  return res.status(200).json({ bookings: [], notifications: [] });
}
