import { useState, useEffect } from 'react';
import { 
  Car, Calendar, FileText, ShieldCheck, Download, CheckCircle2, User, Clock, Wrench, RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStoredBookings, syncCloudBookings } from '../data/bookingStore';
import { getLoggedInCustomer } from '../data/customerAuth';

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [customer, setCustomer] = useState(getLoggedInCustomer);
  const [allCloudBookings, setAllCloudBookings] = useState(getStoredBookings);

  useEffect(() => {
    const syncLiveCloudData = async () => {
      const list = await syncCloudBookings();
      if (list && Array.isArray(list)) {
        setAllCloudBookings(list);
      }
      setCustomer(getLoggedInCustomer());
    };

    syncLiveCloudData();

    // Poll global persistent cloud database every 2.5 seconds for instant status sync
    const interval = setInterval(syncLiveCloudData, 2500);

    const handleAuthChange = () => {
      setCustomer(getLoggedInCustomer());
    };

    window.addEventListener('auto_elite_auth_change', handleAuthChange);
    window.addEventListener('auto_elite_system_update', syncLiveCloudData);

    return () => {
      clearInterval(interval);
      window.removeEventListener('auto_elite_auth_change', handleAuthChange);
      window.removeEventListener('auto_elite_system_update', syncLiveCloudData);
    };
  }, []);

  const customerName = customer?.name || 'Valued Customer';
  const customerPhone = customer?.phone || '+94 77 999 8888';

  // Filter bookings belonging to this customer or active cloud queue
  const myBookings = allCloudBookings.filter(b => 
    b.customer.toLowerCase().includes(customerName.toLowerCase()) || 
    (customerPhone && b.phone.includes(customerPhone.slice(-6)))
  );

  const displayBookings = myBookings.length > 0 ? myBookings : allCloudBookings;

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 space-y-10">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-gold/30 bg-gradient-to-r from-navy-dark via-charcoal to-navy-dark shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-bold text-xl font-display">
            {customerName.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-display text-white">{customerName}</h1>
              <span className="px-3 py-0.5 rounded-full bg-gold/10 text-gold text-[10px] uppercase font-bold tracking-widest border border-gold/30">
                Platinum VIP Member
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Live Cloud Synchronization Enabled • Real-Time Telemetry & Garage Status Connected
            </p>
          </div>
        </div>

        <Link
          to="/book"
          className="px-6 py-3.5 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider shadow-gold hover:shadow-gold-lg transition whitespace-nowrap"
        >
          + NEW APPOINTMENT
        </Link>
      </div>

      {/* Tabs Header */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4 overflow-x-auto">
        {[
          { id: 'overview', label: 'Garage & Live Situation', icon: Car },
          { id: 'upcoming', label: 'Active Reservations', icon: Calendar },
          { id: 'history', label: 'Service History', icon: Clock },
          { id: 'invoices', label: 'Invoices & Receipts', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gold-gradient text-navy-dark shadow-gold'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: GARAGE OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="glass-panel p-6 rounded-3xl border border-gold/30 space-y-6 bg-navy-dark/90 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold font-display text-white">Live Vehicle Situation & Cloud Telemetry</h3>
                <p className="text-xs text-slate-400">Synchronized in real-time with Colombo 07 Grand Station Admin Console</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono border border-emerald-500/30 animate-pulse">
                ● CLOUD SYNC LIVE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayBookings.slice(0, 4).map((b) => (
                <div key={b.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-gold/40 transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-gold uppercase font-bold tracking-widest font-mono">REF ID: {b.id}</span>
                      <h4 className="text-lg font-bold text-white">{b.vehicle}</h4>
                      <p className="text-xs text-slate-300 font-semibold mt-0.5">{b.service}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold border ${
                      b.status === 'Completed & Paid' || b.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                        : b.status === 'In Progress'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-gold/20 text-gold border-gold/40'
                    }`}>
                      {b.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-400">
                    <p>Scheduled Date: <strong className="text-white font-mono">{b.date}</strong></p>
                    <p>Master Engineer: <strong className="text-gold font-mono">{b.mechanic}</strong></p>
                    <p>Service Price: <strong className="text-white font-mono">{b.revenue}</strong></p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Notes: {b.notes}</span>
                    <Link to="/#tracker" className="text-gold font-bold hover:underline flex items-center gap-1">
                      <span>View Live Stage</span> &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ACTIVE RESERVATIONS */}
      {activeTab === 'upcoming' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold font-display text-white">Active Service Reservations</h3>
            <span className="text-xs text-gold font-mono font-bold">{displayBookings.length} Active Records</span>
          </div>

          <div className="space-y-4">
            {displayBookings.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-gold">{item.id}</span>
                    <span className="text-white font-bold text-sm">{item.service}</span>
                  </div>
                  <p className="text-slate-300">Vehicle: <strong className="text-white font-mono">{item.vehicle}</strong> | Date: <strong className="text-white font-mono">{item.date}</strong></p>
                  <p className="text-slate-400">Lead Mechanic: {item.mechanic} | Customer: {item.customer} ({item.phone})</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1.5 rounded-xl bg-gold/20 text-gold border border-gold/30 font-bold font-mono uppercase">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SERVICE HISTORY */}
      {activeTab === 'history' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
          <h3 className="text-lg font-bold font-display text-white">Completed Service History Log</h3>
          <div className="space-y-3">
            {displayBookings.filter(b => b.status === 'Completed' || b.status === 'Completed & Paid').map((h) => (
              <div key={h.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-slate-200">
                <div>
                  <p className="font-bold text-white text-sm">{h.service}</p>
                  <p className="text-slate-400 mt-1">Ref ID: {h.id} | Date: {h.date} | Lead Engineer: {h.mechanic}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-gold font-bold text-sm">{h.revenue}</p>
                  <span className="text-[10px] text-emerald-400 uppercase font-bold">COMPLETED & PASSED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INVOICES */}
      {activeTab === 'invoices' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
          <h3 className="text-lg font-bold font-display text-white">Digital Receipts & Invoices</h3>
          <div className="space-y-3">
            {displayBookings.map((inv) => (
              <div key={inv.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-slate-200">
                <div>
                  <p className="font-bold text-white text-sm">{inv.service}</p>
                  <p className="text-slate-400 mt-1">Invoice ID: INV-{inv.id} | Date: {inv.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-gold font-bold">{inv.revenue}</span>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold/10 text-gold border border-gold/30 font-bold hover:bg-gold hover:text-navy-dark transition"
                  >
                    <Download className="w-3.5 h-3.5" /> Print / PDF Receipt
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
