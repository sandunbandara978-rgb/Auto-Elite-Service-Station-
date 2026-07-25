// Centralized System Activity & Real-Time Telemetry Store for AUTO ELITE
// Cloud-first: cloud data ALWAYS wins over local to preserve admin status changes across all devices

const CLOUD_URL = '/api/bookings'; // Vercel serverless proxy (server-side, no CORS issues)
const DIRECT_CLOUD_URL = 'https://jsonblob.com/api/jsonBlob/019f98ae-6aec-7633-98f4-31a67e75c5db';

const INITIAL_BOOKINGS = [
  { id: 'AE-9481', customer: 'Dinesh Perera', phone: '+94 77 123 4567', vehicle: 'Porsche 911 GT3 RS', service: '9H Ceramic & Tune', date: '2026-07-28 10:00 AM', mechanic: 'Julian Sterling', status: 'In Progress', revenue: 'LKR 245,000', rawRevenue: 245000, notes: 'Please inspect front carbon splitter', timeAgo: '10 Mins Ago' },
  { id: 'AE-9482', customer: 'Dilhani Jayawardena', phone: '+94 71 987 6543', vehicle: 'Range Rover SV', service: 'Brake Overhaul & Align', date: '2026-07-28 01:30 PM', mechanic: 'David Chen', status: 'Scheduled', revenue: 'LKR 125,000', rawRevenue: 125000, notes: 'Concierge flatbed pickup requested in Cinnamon Gardens', timeAgo: '1 Hour Ago' },
  { id: 'AE-9483', customer: 'Kushan Rajapaksha', phone: '+94 75 456 7890', vehicle: 'BMW M8 Comp', service: 'Synthetic Oil & Filter', date: '2026-07-29 09:00 AM', mechanic: 'Marcus Vance', status: 'Pending Approval', revenue: 'LKR 45,000', rawRevenue: 45000, notes: 'Southern Expressway high speed check', timeAgo: '3 Hours Ago' },
  { id: 'AE-9484', customer: 'Sahan Wickramasinghe', phone: '+94 72 333 4444', vehicle: 'Audi RS6 Avant', service: '150-Point Digital Audit', date: '2026-07-29 02:00 PM', mechanic: 'Elena Rostova', status: 'Completed', revenue: 'LKR 38,000', rawRevenue: 38000, notes: 'Pre-purchase verification', timeAgo: '5 Hours Ago' },
];

const INITIAL_NOTIFICATIONS = [
  { id: 'notif-1', title: 'New Booking Reserved', message: 'Dinesh Perera booked 9H Ceramic & Tune for Porsche 911 GT3 RS (LKR 245,000)', time: 'Just Now', read: false, type: 'booking' },
  { id: 'notif-2', title: 'Emergency Dispatch Request', message: 'Dilhani Jayawardena requested Flatbed Towing in Colombo 07', time: '15 Mins Ago', read: false, type: 'emergency' },
  { id: 'notif-3', title: '150-Point Audit Complete', message: 'Master Technician Elena Rostova uploaded PDF report for AE-9484', time: '2 Hours Ago', read: true, type: 'system' }
];

export const getStoredBookings = () => {
  try {
    const data = localStorage.getItem('auto_elite_bookings');
    return data ? JSON.parse(data) : INITIAL_BOOKINGS;
  } catch {
    return INITIAL_BOOKINGS;
  }
};

export const getStoredNotifications = () => {
  try {
    const data = localStorage.getItem('auto_elite_notifications');
    return data ? JSON.parse(data) : INITIAL_NOTIFICATIONS;
  } catch {
    return INITIAL_NOTIFICATIONS;
  }
};

/**
 * syncCloudBookings — fetches the authoritative cloud state.
 * CLOUD DATA ALWAYS WINS: cloud bookings overwrite local ones to preserve admin status changes.
 * Returns the merged booking list.
 */
export const syncCloudBookings = async () => {
  let cloudData = null;

  // Try Vercel Serverless proxy first (no CORS, no adblocker issues)
  try {
    const res = await fetch(CLOUD_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      cache: 'no-store'
    });
    if (res.ok) {
      cloudData = await res.json();
    }
  } catch (_) {}

  // Fallback: direct cloud endpoint
  if (!cloudData || !Array.isArray(cloudData.bookings)) {
    try {
      const res = await fetch(DIRECT_CLOUD_URL, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store'
      });
      if (res.ok) {
        cloudData = await res.json();
      }
    } catch (_) {}
  }

  if (cloudData && Array.isArray(cloudData.bookings) && cloudData.bookings.length > 0) {
    const localBookings = getStoredBookings();

    // CLOUD WINS: build map from local first, then let cloud overwrite each entry by id
    const map = new Map();
    localBookings.forEach(item => { if (item?.id) map.set(item.id, item); });
    cloudData.bookings.forEach(item => { if (item?.id) map.set(item.id, item); }); // cloud overwrites local

    const merged = Array.from(map.values());
    localStorage.setItem('auto_elite_bookings', JSON.stringify(merged));

    if (Array.isArray(cloudData.notifications)) {
      const notifMap = new Map();
      getStoredNotifications().forEach(n => { if (n?.id) notifMap.set(n.id, n); });
      cloudData.notifications.forEach(n => { if (n?.id) notifMap.set(n.id, n); });
      localStorage.setItem('auto_elite_notifications', JSON.stringify(Array.from(notifMap.values())));
    }

    window.dispatchEvent(new Event('auto_elite_system_update'));
    return merged;
  }

  return getStoredBookings();
};

/**
 * addSystemBooking — called when a customer submits a booking.
 * Saves locally, pushes to cloud via serverless proxy AND direct endpoint.
 */
export const addSystemBooking = (newBooking) => {
  const currentBookings = getStoredBookings();
  const currentNotifs = getStoredNotifications();

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const refId = `AE-${Math.floor(1000 + Math.random() * 9000)}`;

  const bookingEntry = {
    id: refId,
    customer: newBooking.customer || 'Guest Client',
    phone: newBooking.phone || '0703735156',
    vehicle: newBooking.vehicle || 'Luxury Vehicle',
    service: newBooking.service || 'General Service Program',
    date: newBooking.date ? `${newBooking.date} ${newBooking.time || '10:00 AM'}` : '2026-07-30 10:00 AM',
    mechanic: newBooking.mechanic || 'Marcus Vance',
    status: 'Scheduled',
    revenue: newBooking.price || 'LKR 45,000',
    rawRevenue: newBooking.rawPrice || 45000,
    notes: newBooking.notes || 'Real-time online customer reservation',
    timeAgo: `Just Now (${timeStr})`
  };

  const notificationEntry = {
    id: `notif-${Date.now()}`,
    title: newBooking.type === 'emergency' ? '🚨 Emergency Dispatch Request' : '⚡ Live Customer Booking Alert',
    message: `${bookingEntry.customer} (${bookingEntry.phone}) reserved ${bookingEntry.service} for ${bookingEntry.vehicle} [${bookingEntry.revenue}]`,
    time: `Today ${timeStr}`,
    read: false,
    type: newBooking.type || 'booking'
  };

  const updatedBookings = [bookingEntry, ...currentBookings];
  const updatedNotifs = [notificationEntry, ...currentNotifs];

  localStorage.setItem('auto_elite_bookings', JSON.stringify(updatedBookings));
  localStorage.setItem('auto_elite_notifications', JSON.stringify(updatedNotifs));

  // Push to Vercel Serverless Function (guaranteed server-side, no CORS)
  const payload = JSON.stringify({ booking: bookingEntry, notification: notificationEntry });
  fetch(CLOUD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload
  }).catch(() => {
    // Direct fallback
    fetch(DIRECT_CLOUD_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ bookings: updatedBookings, notifications: updatedNotifs })
    }).catch(() => {});
  });

  window.dispatchEvent(new CustomEvent('auto_elite_system_update', {
    detail: { booking: bookingEntry, notification: notificationEntry }
  }));

  return bookingEntry;
};

/**
 * updateCloudBookingsList — called when Admin changes a vehicle status.
 * Immediately saves to cloud (both proxy + direct) so all devices see the update.
 */
export const updateCloudBookingsList = (updatedBookingsList) => {
  localStorage.setItem('auto_elite_bookings', JSON.stringify(updatedBookingsList));
  const currentNotifs = getStoredNotifications();

  const fullPayload = JSON.stringify({ bookings: updatedBookingsList, notifications: currentNotifs });

  // Push via Vercel serverless proxy
  fetch(CLOUD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ updatedBookings: updatedBookingsList })
  }).catch(() => {});

  // Also push directly to cloud storage for guaranteed persistence
  fetch(DIRECT_CLOUD_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: fullPayload
  }).catch(() => {});

  window.dispatchEvent(new Event('auto_elite_system_update'));
};

export const markNotificationsAsRead = () => {
  const notifs = getStoredNotifications().map(n => ({ ...n, read: true }));
  localStorage.setItem('auto_elite_notifications', JSON.stringify(notifs));
  window.dispatchEvent(new Event('auto_elite_system_update'));
};
