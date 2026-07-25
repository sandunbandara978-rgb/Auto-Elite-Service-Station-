import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, Users, Calendar, Wrench, Shield, DollarSign, Package, CheckCircle2, LogOut, Bell, X, AlertTriangle, Sparkles, CreditCard, Receipt, Printer, FileText
} from 'lucide-react';
import AdminLoginPage from './AdminLoginPage';
import { getStoredBookings, getStoredNotifications, markNotificationsAsRead } from '../data/bookingStore';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('auto_elite_admin_auth') === 'true';
  });

  const [appointmentsList, setAppointmentsList] = useState(getStoredBookings);
  const [notificationsList, setNotificationsList] = useState(getStoredNotifications);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [highlightedBookingId, setHighlightedBookingId] = useState(null);
  const [selectedNotifModal, setSelectedNotifModal] = useState(null);

  // Payment & Settlement Modal State
  const [paymentModalBooking, setPaymentModalBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Commercial Bank / VISA / Mastercard');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Print Invoice Modal State
  const [printBillBooking, setPrintBillBooking] = useState(null);

  const navigate = useNavigate();

  // Listen for real-time customer booking events
  useEffect(() => {
    const handleSystemUpdate = (e) => {
      setAppointmentsList(getStoredBookings());
      setNotificationsList(getStoredNotifications());

      if (e?.detail?.booking) {
        setToastMessage(`🚨 NEW BOOKING ALERT: ${e.detail.booking.customer} - ${e.detail.booking.service} (${e.detail.booking.revenue})`);
        setTimeout(() => setToastMessage(null), 5000);
      }
    };

    window.addEventListener('auto_elite_system_update', handleSystemUpdate);
    return () => window.removeEventListener('auto_elite_system_update', handleSystemUpdate);
  }, []);

  const [archivedRevenue, setArchivedRevenue] = useState(() => {
    return parseInt(localStorage.getItem('auto_elite_archived_revenue') || '0', 10);
  });

  const handleLogout = () => {
    sessionStorage.removeItem('auto_elite_admin_auth');
    setIsAuthenticated(false);
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = appointmentsList.map(a => a.id === id ? { ...a, status: newStatus } : a);
    setAppointmentsList(updated);
    localStorage.setItem('auto_elite_bookings', JSON.stringify(updated));
  };

  const handleNotificationClick = (notif) => {
    const updatedNotifs = notificationsList.map(n => n.id === notif.id ? { ...n, read: true } : n);
    setNotificationsList(updatedNotifs);
    localStorage.setItem('auto_elite_notifications', JSON.stringify(updatedNotifs));

    setNotifDropdownOpen(false);

    const matchingBooking = appointmentsList.find(b => 
      notif.message.includes(b.customer) || notif.message.includes(b.service) || notif.message.includes(b.id)
    ) || appointmentsList[0];

    setSelectedNotifModal({
      notif,
      booking: matchingBooking
    });

    if (matchingBooking) {
      setHighlightedBookingId(matchingBooking.id);
      const element = document.getElementById(`booking-row-${matchingBooking.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleCompletePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentModalBooking) return;

    // Update status to Completed & Paid and mark paid: true
    const updated = appointmentsList.map(a => 
      a.id === paymentModalBooking.id ? { ...a, status: 'Completed & Paid', paid: true, paymentMethod } : a
    );

    setAppointmentsList(updated);
    localStorage.setItem('auto_elite_bookings', JSON.stringify(updated));

    setToastMessage(`💰 DEAL FINISHED & SETTLED! ${paymentModalBooking.revenue} added to Gross Paid Revenue!`);
    setTimeout(() => setToastMessage(null), 6000);

    setPaymentSuccess(true);
  };

  const handleDeleteDealLine = (app) => {
    const itemRev = app.rawRevenue || (typeof app.revenue === 'number' ? app.revenue : parseInt(String(app.revenue).replace(/[^0-9]/g, '')) || 0);

    // If deal was completed & paid, add its revenue to permanent archived revenue tally before removing from table
    if (app.status === 'Completed & Paid' || app.paid) {
      const newArchived = archivedRevenue + itemRev;
      setArchivedRevenue(newArchived);
      localStorage.setItem('auto_elite_archived_revenue', newArchived.toString());
    }

    const updated = appointmentsList.filter(a => a.id !== app.id);
    setAppointmentsList(updated);
    localStorage.setItem('auto_elite_bookings', JSON.stringify(updated));

    setToastMessage(`🗑️ Deal line ${app.id} deleted from queue. Revenue remains in Gross Revenue!`);
    setTimeout(() => setToastMessage(null), 5000);
  };

  const handleTriggerPrint = () => {
    window.print();
  };

  const unreadCount = notificationsList.filter(n => !n.read).length;

  // Real Gross Revenue (Active Paid Deals + Permanent Archived Paid Revenue)
  const activePaidRevenueLKR = appointmentsList.reduce((sum, item) => {
    if (item.status === 'Completed & Paid' || item.paid) {
      const amount = item.rawRevenue || (typeof item.revenue === 'number' ? item.revenue : parseInt(String(item.revenue).replace(/[^0-9]/g, '')) || 0);
      return sum + amount;
    }
    return sum;
  }, 0);

  const grossPaidRevenueLKR = activePaidRevenueLKR + archivedRevenue;

  // Total Pipeline Revenue
  const totalPipelineRevenueLKR = appointmentsList.reduce((sum, item) => {
    const amount = item.rawRevenue || (typeof item.revenue === 'number' ? item.revenue : parseInt(String(item.revenue).replace(/[^0-9]/g, '')) || 0);
    return sum + amount;
  }, 0);

  if (!isAuthenticated) {
    return <AdminLoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="mx-auto max-w-[98%] xl:max-w-[1650px] px-3 sm:px-6 py-8 space-y-8">
      
      {/* Real-time Toast Alert Popup */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl bg-gold text-navy-dark font-bold text-xs shadow-gold-lg border border-white/40 flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* PRINT OFFICIAL BILL / TAX INVOICE MODAL */}
      {(printBillBooking || (paymentSuccess && paymentModalBooking)) && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static">
          <div className="relative max-w-2xl w-full bg-white text-slate-900 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 print:shadow-none print:w-full print:max-w-none print:rounded-none">
            
            {/* Modal Controls (Hidden when printing) */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 flex items-center gap-1.5">
                <Receipt className="w-4 h-4" /> AUTO ELITE Official Tax Invoice & Receipt
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTriggerPrint}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>PRINT BILL NOW</span>
                </button>
                <button
                  onClick={() => {
                    setPrintBillBooking(null);
                    setPaymentSuccess(false);
                    setPaymentModalBooking(null);
                  }}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PRINTABLE BILL DOCUMENT BODY */}
            {(() => {
              const activeBill = printBillBooking || paymentModalBooking;
              const subtotal = activeBill?.rawRevenue || 125000;
              const vatAmount = Math.round(subtotal * 0.18);
              const totalAmount = subtotal + vatAmount;

              return (
                <div id="printable-bill-area" className="space-y-6 text-slate-800">
                  {/* Header */}
                  <div className="flex justify-between items-start border-b-2 border-amber-500 pb-4">
                    <div>
                      <h2 className="text-2xl font-black tracking-widest font-display text-slate-950 uppercase">
                        AUTO <span className="text-amber-600">ELITE</span>
                      </h2>
                      <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                        Luxury Vehicle Service Station & Garage
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        100 Apex Boulevard, Cinnamon Gardens, Colombo 07, Sri Lanka<br />
                        Hotline: +94 11 255 3548 | VAT Reg: LK-992384-00
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 text-[10px] font-black uppercase rounded tracking-wider border border-amber-300">
                        OFFICIAL PAID RECEIPT
                      </span>
                      <p className="text-xs font-mono font-bold text-slate-900 mt-2">
                        INVOICE #: INV-AE-{activeBill?.id || '9481'}
                      </p>
                      <p className="text-xs font-mono text-slate-500">
                        Date: {new Date().toISOString().split('T')[0]}
                      </p>
                    </div>
                  </div>

                  {/* Customer & Vehicle Info */}
                  <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">BILLED TO CUSTOMER:</p>
                      <p className="font-bold text-slate-900 text-sm">{activeBill?.customer || 'Dinesh Perera'}</p>
                      <p className="font-mono text-slate-600">{activeBill?.phone || '+94 77 123 4567'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">VEHICLE DETAILS:</p>
                      <p className="font-bold text-slate-900 text-sm">{activeBill?.vehicle || 'Porsche 911 GT3 RS'}</p>
                      <p className="font-mono text-slate-600">Assigned Engineer: {activeBill?.mechanic || 'Julian Sterling'}</p>
                    </div>
                  </div>

                  {/* Line Item Table */}
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-amber-400 font-bold uppercase text-[10px]">
                        <th className="p-3">Service Program Description</th>
                        <th className="p-3">Category</th>
                        <th className="p-3 text-right">Amount (LKR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-3 font-bold text-slate-900">{activeBill?.service}</td>
                        <td className="p-3 text-slate-600">OEM Precision Maintenance</td>
                        <td className="p-3 text-right font-mono font-bold text-slate-900">
                          LKR {subtotal.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 text-slate-600">OEM Diagnostics & Multi-point Inspection</td>
                        <td className="p-3 text-slate-500">Included</td>
                        <td className="p-3 text-right font-mono text-slate-600">LKR 0.00</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-slate-600">Climate-Controlled Garage Bay & Labor</td>
                        <td className="p-3 text-slate-500">Included</td>
                        <td className="p-3 text-right font-mono text-slate-600">LKR 0.00</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Calculations & Summary */}
                  <div className="flex justify-between items-end border-t border-slate-200 pt-4 text-xs">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Payment Channel:</p>
                      <p className="font-bold text-slate-800">{activeBill?.paymentMethod || paymentMethod}</p>
                      <p className="text-[10px] text-emerald-600 font-bold uppercase mt-1">✓ Status: PAID IN FULL</p>
                    </div>

                    <div className="w-60 space-y-1.5 text-right font-mono">
                      <div className="flex justify-between text-slate-600">
                        <span>Subtotal:</span>
                        <span>LKR {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Sri Lanka VAT (18%):</span>
                        <span>LKR {vatAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-slate-950 font-extrabold text-base pt-2 border-t border-slate-300">
                        <span>TOTAL PAID:</span>
                        <span className="text-amber-600">LKR {totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Seal */}
                  <div className="border-t border-dashed border-slate-300 pt-4 flex justify-between items-center text-[10px] text-slate-500">
                    <div>
                      <p>AUTO ELITE Grand Station Official Seal</p>
                      <p className="font-mono text-slate-400">Computer Generated Tax Receipt. Valid without physical signature.</p>
                    </div>
                    <div className="border border-slate-400 px-3 py-1 font-mono uppercase text-slate-700 font-bold">
                      STATION STAMPED
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Print Action Buttons (Bottom Bar) */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between print:hidden">
              <button
                onClick={() => {
                  setPrintBillBooking(null);
                  setPaymentSuccess(false);
                  setPaymentModalBooking(null);
                }}
                className="px-6 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700 uppercase"
              >
                Close Window
              </button>

              <button
                onClick={handleTriggerPrint}
                className="px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-lg"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT THIS TAX BILL</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Payment & Finish Deal Modal */}
      {paymentModalBooking && !paymentSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-lg w-full glass-panel rounded-3xl border border-gold/40 p-6 sm:p-8 text-white space-y-6 shadow-2xl bg-navy-dark/95">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5" />
                  Station Checkout & Deal Settlement
                </span>
                <h3 className="text-xl font-bold font-display text-white mt-0.5">
                  Finish Deal: {paymentModalBooking.id}
                </h3>
              </div>
              <button
                onClick={() => setPaymentModalBooking(null)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCompletePaymentSubmit} className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-slate-400 uppercase">Customer Name</span>
                  <span className="font-bold text-white">{paymentModalBooking.customer} ({paymentModalBooking.phone})</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-slate-400 uppercase">Vehicle</span>
                  <span className="font-bold text-white">{paymentModalBooking.vehicle}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-slate-400 uppercase">Completed Service</span>
                  <span className="font-bold text-gold">{paymentModalBooking.service}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 uppercase">Total Bill Amount</span>
                  <span className="text-xl font-mono font-black text-gold">{paymentModalBooking.revenue}</span>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-400 font-semibold mb-2">
                  Payment Channel / Method
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-charcoal border border-gold/40 text-xs text-gold font-bold outline-none"
                >
                  <option value="Commercial Bank / VISA / Mastercard">Commercial Bank / VISA / Mastercard Credit Card</option>
                  <option value="Sampath Bank / HNB Online Direct Transfer">Sampath Bank / HNB Online Direct Transfer</option>
                  <option value="Cash Payment at Station Counter">Cash Payment at Station Counter</option>
                </select>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentModalBooking(null)}
                  className="w-1/3 py-4 rounded-xl border border-white/10 hover:bg-white/5 text-slate-300 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-4 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider shadow-gold hover:shadow-gold-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Receipt className="w-4 h-4" />
                  <span>COLLECT & FINISH DEAL</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification Click Detail Modal */}
      {selectedNotifModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-lg w-full glass-panel rounded-3xl border border-gold/40 p-6 sm:p-8 text-white space-y-6 shadow-2xl bg-navy-dark/95">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest">
                  Notification Telemetry Detail
                </span>
                <h3 className="text-xl font-bold font-display text-white mt-0.5">
                  {selectedNotifModal.notif.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedNotifModal(null)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-gold/10 border border-gold/30 space-y-2">
              <p className="text-xs text-gold font-semibold uppercase tracking-wider">Alert Summary:</p>
              <p className="text-xs text-slate-200 leading-relaxed">{selectedNotifModal.notif.message}</p>
              <p className="text-[10px] text-slate-400 font-mono">Logged: {selectedNotifModal.notif.time}</p>
            </div>

            {selectedNotifModal.booking && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-gold uppercase tracking-wider">Associated Reservation Record:</h4>
                
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-slate-400">Ref ID:</span>
                    <span className="font-mono font-bold text-gold">{selectedNotifModal.booking.id}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-slate-400">Customer Name:</span>
                    <span className="font-bold text-white">{selectedNotifModal.booking.customer}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-slate-400">Vehicle:</span>
                    <span className="font-bold text-white">{selectedNotifModal.booking.vehicle}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-slate-400">Service Program:</span>
                    <span className="font-bold text-gold">{selectedNotifModal.booking.service}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Service Fee:</span>
                    <span className="font-mono font-bold text-white">{selectedNotifModal.booking.revenue}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      const b = selectedNotifModal.booking;
                      setSelectedNotifModal(null);
                      setPaymentModalBooking(b);
                    }}
                    className="w-full py-3 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider shadow-gold"
                  >
                    💳 Collect Payment & Finish Deal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-[10px] uppercase font-bold tracking-widest border border-gold/30">
              Executive Level 5 Access (Authenticated)
            </span>
          </div>
          <h1 className="text-3xl font-black font-display text-white uppercase tracking-tight mt-1">
            AUTO ELITE <span className="text-gold-shine">ADMIN CONSOLE</span>
          </h1>
          <p className="text-xs text-slate-400">Station Operations, Real-time Customer Notifications & Reservation Queue.</p>
        </div>

        <div className="flex items-center gap-3 relative">
          
          {/* Notifications Bell Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2.5 rounded-xl glass-panel border border-white/20 text-slate-300 hover:text-gold hover:border-gold/50 transition cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-600 text-white font-mono text-[10px] font-bold flex items-center justify-center animate-pulse shadow-md">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {notifDropdownOpen && (
              <div className="absolute right-0 top-full mt-3 w-80 sm:w-96 glass-panel rounded-2xl border border-gold/40 p-4 shadow-2xl z-50 bg-navy-dark/95 space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h4 className="text-xs font-bold font-display uppercase tracking-wider text-gold">
                    System Alerts (Click to Inspect)
                  </h4>
                  <button onClick={() => setNotifDropdownOpen(false)} className="text-slate-400 hover:text-white text-xs">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {notificationsList.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => handleNotificationClick(n)}
                      className={`p-3 rounded-xl border text-xs space-y-1 cursor-pointer transition hover:scale-[1.02] ${
                        n.read ? 'bg-white/5 border-white/5 hover:border-white/20' : 'bg-gold/15 border-gold/40 shadow-gold hover:border-gold'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-white">
                        <span className="flex items-center gap-1.5 text-gold">
                          {!n.read && <span className="w-2 h-2 rounded-full bg-gold animate-ping" />}
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 line-clamp-2">{n.message}</p>
                      <span className="text-[9px] text-gold font-semibold uppercase tracking-wider inline-block pt-1">
                        Click to view in dashboard &rarr;
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => alert("Monthly Station Report Generated!")}
            className="px-4 py-2.5 rounded-xl glass-panel border border-white/20 text-xs font-bold uppercase tracking-wider text-white hover:border-gold transition"
          >
            Export Report
          </button>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>LOG OUT</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-gold/30 bg-navy-dark/90 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Collected Revenue</span>
            <DollarSign className="w-5 h-5 text-gold" />
          </div>
          <p className="text-2xl sm:text-3xl font-black font-mono text-gold">
            LKR {grossPaidRevenueLKR.toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
            <TrendingUp className="w-3.5 h-3.5" /> Pipeline: LKR {totalPipelineRevenueLKR.toLocaleString()}
          </p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-navy-dark/90 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Bookings Queue</span>
            <Calendar className="w-5 h-5 text-gold" />
          </div>
          <p className="text-3xl font-black font-mono text-white">{appointmentsList.length}</p>
          <p className="text-[11px] text-slate-400">16 Bays Operational</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-navy-dark/90 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Master Mechanics</span>
            <Users className="w-5 h-5 text-gold" />
          </div>
          <p className="text-3xl font-black font-mono text-white">12 On Duty</p>
          <p className="text-[11px] text-emerald-400">100% Shift Attendance</p>
        </div>

        <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-navy-dark/90 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">System Unread Alerts</span>
            <Bell className="w-5 h-5 text-gold" />
          </div>
          <p className="text-3xl font-black font-mono text-gold">{unreadCount}</p>
          <p className="text-[11px] text-slate-400">Click Bell to Inspect</p>
        </div>
      </div>

      {/* Appointment Manager Table */}
      <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-navy-dark/90 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold font-display text-white">Live Customer Reservation Queue</h3>
            <p className="text-xs text-slate-400">Collect payments, generate digital receipts, print bills, and finish deals.</p>
          </div>
        </div>

        <div className="w-full">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="text-[10px] uppercase font-bold text-gold border-b border-white/10 bg-white/5">
              <tr>
                <th className="px-3 py-3">Ref ID</th>
                <th className="px-3 py-3">Client</th>
                <th className="px-3 py-3">Vehicle</th>
                <th className="px-3 py-3">Program</th>
                <th className="px-3 py-3">Schedule</th>
                <th className="px-3 py-3">Engineer</th>
                <th className="px-3 py-3">Fee</th>
                <th className="px-3 py-3">Status</th>
                <th className="px-3 py-3 text-right">Action / Finish Deal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {appointmentsList.map((app) => {
                const isHighlighted = highlightedBookingId === app.id;
                const isCompletedPaid = app.status === 'Completed & Paid';

                return (
                  <tr
                    key={app.id}
                    id={`booking-row-${app.id}`}
                    className={`transition-all duration-500 ${
                      isHighlighted
                        ? 'bg-gold/20 border-2 border-gold shadow-gold text-white font-semibold'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <td className="px-3 py-3 font-mono font-bold text-gold flex items-center gap-1">
                      {isHighlighted && <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" />}
                      {app.id}
                    </td>
                    <td className="px-2.5 py-3 font-bold text-white max-w-[130px] truncate" title={app.customer}>
                      {app.customer}
                      <span className="block text-[10px] font-mono text-slate-400 font-normal">{app.phone}</span>
                    </td>
                    <td className="px-2 py-3 max-w-[140px] truncate text-[11px] text-slate-200" title={app.vehicle}>
                      {app.vehicle}
                    </td>
                    <td className="px-2.5 py-3 max-w-[150px] truncate text-[11px]" title={app.service}>
                      {app.service}
                    </td>
                    <td className="px-2 py-3 font-mono text-[11px] whitespace-nowrap text-slate-300">
                      {String(app.date).replace('2026-', '')}
                    </td>
                    <td className="px-2 py-3 text-[11px] max-w-[120px] truncate" title={app.mechanic}>
                      {app.mechanic}
                    </td>
                    <td className="px-3 py-3 font-mono font-bold text-white whitespace-nowrap">{app.revenue}</td>
                    <td className="px-3 py-3">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border outline-none cursor-pointer transition ${
                          isCompletedPaid
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-mono'
                            : app.status === 'In Progress'
                            ? 'bg-gold/20 text-gold border-gold/40'
                            : app.status === 'Completed'
                            ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                            : 'bg-charcoal text-slate-300 border-white/20'
                        }`}
                      >
                        <option value="Scheduled" className="bg-navy-dark text-white">Scheduled</option>
                        <option value="In Progress" className="bg-navy-dark text-gold font-bold">In Progress</option>
                        <option value="Completed" className="bg-navy-dark text-blue-400">Completed</option>
                        <option value="Completed & Paid" className="bg-navy-dark text-emerald-400 font-mono font-bold">Completed & Paid</option>
                      </select>
                    </td>
                    <td className="px-3 py-3 text-right">
                      {isCompletedPaid ? (
                        <div className="flex items-center justify-end gap-2">
                          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold text-[11px] uppercase border border-emerald-500/30 inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Deal Finished
                          </span>
                          <button
                            onClick={() => setPrintBillBooking(app)}
                            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] uppercase tracking-wider border border-white/20 inline-flex items-center gap-1 transition cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5 text-gold" />
                            <span>Print Bill</span>
                          </button>
                          <button
                            onClick={() => handleDeleteDealLine(app)}
                            title="Delete this deal line from table queue (Gross Revenue remains intact)"
                            className="px-2.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold text-[10px] uppercase border border-red-500/30 transition cursor-pointer"
                          >
                            Delete Line
                          </button>
                        </div>
                      ) : app.status === 'Completed' ? (
                        <button
                          onClick={() => setPaymentModalBooking(app)}
                          className="px-3 py-1.5 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-[11px] uppercase tracking-wider shadow-gold hover:shadow-gold-lg transition inline-flex items-center gap-1.5 cursor-pointer animate-pulse"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Payment & Finish Deal</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-500 font-medium italic">
                          Awaiting Completion
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
