// Centralized System Activity & Real-Time Telemetry Store for AUTO ELITE
// Includes Persistent Global Cloud DB Sync for Vercel Cross-Device Real-Time Persistence

const CLOUD_DB_URL = 'https://api.restful-api.dev/objects/ff8081819f7e10ae019f98944169258b';

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
  const data = localStorage.getItem('auto_elite_bookings');
  return data ? JSON.parse(data) : INITIAL_BOOKINGS;
};

export const getStoredNotifications = () => {
  const data = localStorage.getItem('auto_elite_notifications');
  return data ? JSON.parse(data) : INITIAL_NOTIFICATIONS;
};

// Async Persistent Cloud Sync function for Vercel deployment across all devices worldwide
export const syncCloudBookings = async () => {
  try {
    const res = await fetch(CLOUD_DB_URL, { cache: 'no-store' });
    if (res.ok) {
      const result = await res.json();
      const cloudData = result?.data || {};

      if (cloudData.bookings && Array.isArray(cloudData.bookings) && cloudData.bookings.length > 0) {
        const localBookings = getStoredBookings();
        
        // Merge cloud & local bookings, preserving unique IDs
        const map = new Map();
        [...cloudData.bookings, ...localBookings].forEach(item => {
          if (item && item.id && !map.has(item.id)) {
            map.set(item.id, item);
          }
        });

        const mergedBookings = Array.from(map.values());
        localStorage.setItem('auto_elite_bookings', JSON.stringify(mergedBookings));

        if (cloudData.notifications && Array.isArray(cloudData.notifications)) {
          const notifMap = new Map();
          [...cloudData.notifications, ...getStoredNotifications()].forEach(n => {
            if (n && n.id && !notifMap.has(n.id)) {
              notifMap.set(n.id, n);
            }
          });
          localStorage.setItem('auto_elite_notifications', JSON.stringify(Array.from(notifMap.values())));
        }

        window.dispatchEvent(new Event('auto_elite_system_update'));
        return mergedBookings;
      }
    }
  } catch (e) {
    // Fallback to local storage
  }
  return getStoredBookings();
};

export const addSystemBooking = (newBooking) => {
  const currentBookings = getStoredBookings();
  const currentNotifs = getStoredNotifications();

  const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const refId = `AE-${Math.floor(1000 + Math.random() * 9000)}`;

  const bookingEntry = {
    id: refId,
    customer: newBooking.customer || 'Guest Client',
    phone: newBooking.phone || '+94 77 000 0000',
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

  // Push to persistent global cloud storage
  try {
    fetch(CLOUD_DB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'AutoEliteGlobalStore',
        data: { bookings: updatedBookings, notifications: updatedNotifs }
      })
    }).catch(() => {});
  } catch (e) {}

  // Dispatch custom window event for real-time reactive sync across local components
  window.dispatchEvent(new CustomEvent('auto_elite_system_update', {
    detail: { booking: bookingEntry, notification: notificationEntry }
  }));

  return bookingEntry;
};

export const updateCloudBookingsList = (updatedBookingsList) => {
  localStorage.setItem('auto_elite_bookings', JSON.stringify(updatedBookingsList));
  try {
    const currentNotifs = getStoredNotifications();
    fetch(CLOUD_DB_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'AutoEliteGlobalStore',
        data: { bookings: updatedBookingsList, notifications: currentNotifs }
      })
    }).catch(() => {});
  } catch (e) {}
  window.dispatchEvent(new Event('auto_elite_system_update'));
};

export const markNotificationsAsRead = () => {
  const notifs = getStoredNotifications().map(n => ({ ...n, read: true }));
  localStorage.setItem('auto_elite_notifications', JSON.stringify(notifs));
  window.dispatchEvent(new Event('auto_elite_system_update'));
};

// Simulated Real-Time Activity Feed for Live Demonstration
export const triggerSimulatedActivity = () => {
  const liveSamples = [
    { customer: 'Nimal Jayasuriya', phone: '+94 77 555 1212', vehicle: 'Mercedes-AMG G63', service: 'Italian Bake Oven Custom Paint', price: 'LKR 450,000', rawPrice: 450000, location: 'Rajagiriya Hub' },
    { customer: 'Chathura Bandara', phone: '+94 71 444 8888', vehicle: 'Lamborghini Huracan', service: 'Performance Brake Overhaul', price: 'LKR 85,000', rawPrice: 85000, location: 'Galle Station' },
    { customer: 'Ruwan Fernando', phone: '+94 76 222 3333', vehicle: 'BMW M5 Competition', service: 'Bespoke Performance & Tuning', price: 'LKR 680,000', rawPrice: 680000, location: 'Kandy Hub' },
  ];

  const randomSample = liveSamples[Math.floor(Math.random() * liveSamples.length)];
  return addSystemBooking({
    customer: randomSample.customer,
    phone: randomSample.phone,
    vehicle: randomSample.vehicle,
    service: randomSample.service,
    price: randomSample.price,
    rawPrice: randomSample.rawPrice,
    mechanic: 'Elena Rostova',
    notes: `Real-time dispatch from ${randomSample.location}`,
    type: 'booking'
  });
};
