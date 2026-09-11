import { Router } from 'express';

const router = Router();
const CLOUD_URL = 'https://jsonblob.com/api/jsonBlob/019f98ae-6aec-7633-98f4-31a67e75c5db';

// GET /api/bookings - Return current bookings and notifications
router.get('/', async (req, res) => {
  try {
    const cloudRes = await fetch(CLOUD_URL, {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });

    if (cloudRes.ok) {
      const data = await cloudRes.json();
      return res.status(200).json(data);
    }
  } catch (err) {
    console.error('Error fetching cloud bookings:', err);
  }

  return res.status(200).json({ bookings: [], notifications: [] });
});

// POST or PUT /api/bookings - Create or update booking / notifications
const handleUpsert = async (req, res) => {
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // 1. Fetch current cloud state
    let currentCloudData = { bookings: [], notifications: [] };
    try {
      const getRes = await fetch(CLOUD_URL, { headers: { 'Accept': 'application/json' } });
      if (getRes.ok) {
        currentCloudData = await getRes.json();
      }
    } catch (e) {
      console.warn('Could not fetch existing cloud data:', e);
    }

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
    console.error('Error updating bookings:', err);
    return res.status(500).json({ error: err.message });
  }
};

router.post('/', handleUpsert);
router.put('/', handleUpsert);

export default router;
