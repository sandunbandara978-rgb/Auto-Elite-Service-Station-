// Vercel Cloud Serverless Function for AUTO ELITE Real-Time Booking Sync
// Enables customer bookings placed anywhere on Vercel to sync live to the Admin Dashboard

let cloudBookings = [
  { id: 'AE-9481', customer: 'Dinesh Perera', phone: '+94 77 123 4567', vehicle: 'Porsche 911 GT3 RS', service: '9H Ceramic & Tune', date: '2026-07-28 10:00 AM', mechanic: 'Julian Sterling', status: 'In Progress', revenue: 'LKR 245,000', rawRevenue: 245000, notes: 'Please inspect front carbon splitter', timeAgo: '10 Mins Ago' },
  { id: 'AE-9482', customer: 'Dilhani Jayawardena', phone: '+94 71 987 6543', vehicle: 'Range Rover SV', service: 'Brake Overhaul & Align', date: '2026-07-28 01:30 PM', mechanic: 'David Chen', status: 'Scheduled', revenue: 'LKR 125,000', rawRevenue: 125000, notes: 'Concierge flatbed pickup requested in Cinnamon Gardens', timeAgo: '1 Hour Ago' },
  { id: 'AE-9483', customer: 'Kushan Rajapaksha', phone: '+94 75 456 7890', vehicle: 'BMW M8 Comp', service: 'Synthetic Oil & Filter', date: '2026-07-29 09:00 AM', mechanic: 'Marcus Vance', status: 'Pending Approval', revenue: 'LKR 45,000', rawRevenue: 45000, notes: 'Southern Expressway high speed check', timeAgo: '3 Hours Ago' },
  { id: 'AE-9484', customer: 'Sahan Wickramasinghe', phone: '+94 72 333 4444', vehicle: 'Audi RS6 Avant', service: '150-Point Digital Audit', date: '2026-07-29 02:00 PM', mechanic: 'Elena Rostova', status: 'Completed', revenue: 'LKR 38,000', rawRevenue: 38000, notes: 'Pre-purchase verification', timeAgo: '5 Hours Ago' },
];

let cloudNotifications = [
  { id: 'notif-1', title: 'New Booking Reserved', message: 'Dinesh Perera booked 9H Ceramic & Tune for Porsche 911 GT3 RS (LKR 245,000)', time: 'Just Now', read: false, type: 'booking' },
  { id: 'notif-2', title: 'Emergency Dispatch Request', message: 'Dilhani Jayawardena requested Flatbed Towing in Colombo 07', time: '15 Mins Ago', read: false, type: 'emergency' },
  { id: 'notif-3', title: '150-Point Audit Complete', message: 'Master Technician Elena Rostova uploaded PDF report for AE-9484', time: '2 Hours Ago', read: true, type: 'system' }
];

export default function handler(req, res) {
  // CORS Headers for cross-origin access
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      
      if (body?.updatedBookings && Array.isArray(body.updatedBookings)) {
        cloudBookings = body.updatedBookings;
      } else if (body?.booking) {
        // Prevent duplicates
        const exists = cloudBookings.some(b => b.id === body.booking.id);
        if (!exists) {
          cloudBookings = [body.booking, ...cloudBookings];
        }
        if (body.notification) {
          const notifExists = cloudNotifications.some(n => n.id === body.notification.id);
          if (!notifExists) {
            cloudNotifications = [body.notification, ...cloudNotifications];
          }
        }
      }
    } catch (e) {
      console.error('API Error:', e);
    }

    return res.status(200).json({
      success: true,
      bookings: cloudBookings,
      notifications: cloudNotifications
    });
  }

  // GET: Return current live bookings and notifications
  return res.status(200).json({
    bookings: cloudBookings,
    notifications: cloudNotifications
  });
}
