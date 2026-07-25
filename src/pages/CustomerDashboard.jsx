import { useState } from 'react';
import { 
  Car, Calendar, FileText, Bell, ShieldCheck, Download, CheckCircle2, User, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const mockCustomerData = {
  name: 'Dinesh Perera',
  membership: 'Platinum VIP Concierge',
  vehicles: [
    { make: 'Porsche', model: '911 GT3 RS', year: '2024', plate: 'WP CAD-911', status: 'Optimal' },
    { make: 'Range Rover', model: 'SV Autobiography', year: '2025', plate: 'WP LKR-001', status: 'Service Due in 12 Days' }
  ],
  upcoming: [
    { id: 'APP-901', service: '9H Ceramic Coating Refresh', date: 'July 28, 2026', time: '10:00 AM', mechanic: 'Julian Sterling', status: 'Confirmed' }
  ],
  history: [
    { id: 'APP-812', service: 'Stage 2 ECU Remap & Dyno', date: 'June 10, 2026', cost: 'LKR 680,000', status: 'Completed', mechanic: 'Marcus Vance' },
    { id: 'APP-744', service: 'Synthetic Oil & Filter Service', date: 'April 02, 2026', cost: 'LKR 45,000', status: 'Completed', mechanic: 'David Chen' }
  ],
  invoices: [
    { id: 'INV-2026-08', date: 'June 10, 2026', amount: 'LKR 680,000', title: 'Stage 2 ECU Tuning' },
    { id: 'INV-2026-04', date: 'April 02, 2026', amount: 'LKR 45,000', title: 'Synthetic Oil Change' }
  ]
};

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 space-y-10">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-gold/30 bg-gradient-to-r from-navy-dark via-charcoal to-navy-dark shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gold/20 border border-gold/40 flex items-center justify-center text-gold font-bold text-xl font-display">
            HT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold font-display text-white">{mockCustomerData.name}</h1>
              <span className="px-3 py-0.5 rounded-full bg-gold/10 text-gold text-[10px] uppercase font-bold tracking-widest border border-gold/30">
                {mockCustomerData.membership}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Manage your luxury fleet garage records, upcoming bookings, and digital invoices.</p>
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
          { id: 'overview', label: 'Garage Overview', icon: Car },
          { id: 'upcoming', label: 'Upcoming Services', icon: Calendar },
          { id: 'history', label: 'Service History', icon: Clock },
          { id: 'invoices', label: 'Invoices & Receipts', icon: FileText },
          { id: 'profile', label: 'Profile Manager', icon: User },
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

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCustomerData.vehicles.map((v, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 glass-panel-hover">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-gold uppercase font-bold tracking-widest">{v.make}</span>
                    <h3 className="text-xl font-bold font-display text-white">{v.model} ({v.year})</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">Plate: {v.plate}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold border border-emerald-500/30">
                    {v.status}
                  </span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between text-xs text-slate-300">
                  <span>150-Point Audit Status: <strong className="text-gold">Passed</strong></span>
                  <Link to="/inspection" className="text-gold font-bold hover:underline">View Telemetry &rarr;</Link>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-panel p-6 rounded-3xl border border-gold/20 space-y-4">
            <h3 className="text-lg font-bold font-display text-white">Next Reserved Garage Slot</h3>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-sm font-bold text-white">{mockCustomerData.upcoming[0].service}</p>
                <p className="text-xs text-slate-400 mt-0.5">{mockCustomerData.upcoming[0].date} at {mockCustomerData.upcoming[0].time} • Engineer: {mockCustomerData.upcoming[0].mechanic}</p>
              </div>
              <span className="px-4 py-2 rounded-xl bg-gold/20 text-gold text-xs font-bold uppercase tracking-wider border border-gold/30">
                {mockCustomerData.upcoming[0].status}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: UPCOMING */}
      {activeTab === 'upcoming' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-lg font-bold font-display text-white">Upcoming Scheduled Appointments</h3>
          {mockCustomerData.upcoming.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs text-slate-200">
              <div>
                <p className="font-bold text-white text-sm">{item.service}</p>
                <p className="text-slate-400 mt-1">Ref: {item.id} | Date: {item.date} ({item.time}) | Assigned: {item.mechanic}</p>
              </div>
              <button onClick={() => alert("Reschedule requested...")} className="px-4 py-2 rounded-xl border border-white/10 hover:border-gold text-slate-300 hover:text-white transition">
                Reschedule
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: HISTORY */}
      {activeTab === 'history' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-lg font-bold font-display text-white">Completed Service History Log</h3>
          <div className="space-y-3">
            {mockCustomerData.history.map((h) => (
              <div key={h.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs text-slate-200">
                <div>
                  <p className="font-bold text-white text-sm">{h.service}</p>
                  <p className="text-slate-400 mt-1">Date: {h.date} | Lead Engineer: {h.mechanic}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-gold font-bold text-sm">{h.cost}</p>
                  <span className="text-[10px] text-emerald-400 uppercase font-bold">{h.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INVOICES */}
      {activeTab === 'invoices' && (
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-lg font-bold font-display text-white">Digital Receipts & Invoices</h3>
          <div className="space-y-3">
            {mockCustomerData.invoices.map((inv) => (
              <div key={inv.id} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs text-slate-200">
                <div>
                  <p className="font-bold text-white text-sm">{inv.title}</p>
                  <p className="text-slate-400 mt-1">Invoice ID: {inv.id} | Date: {inv.date}</p>
                </div>
                <button
                  onClick={() => alert(`Downloading Digital Invoice ${inv.id}...`)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold/10 text-gold border border-gold/30 font-bold hover:bg-gold hover:text-navy-dark transition"
                >
                  <Download className="w-3.5 h-3.5" /> PDF Receipt
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PROFILE */}
      {activeTab === 'profile' && (
        <div className="glass-panel p-8 rounded-3xl border border-white/10 max-w-xl space-y-6">
          <h3 className="text-lg font-bold font-display text-white">Member Profile Manager</h3>
          <div className="space-y-4 text-xs text-slate-300">
            <div>
              <label className="block text-slate-400 uppercase font-bold mb-1">Full Name</label>
              <input type="text" defaultValue={mockCustomerData.name} className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/10 text-white outline-none" />
            </div>
            <div>
              <label className="block text-slate-400 uppercase font-bold mb-1">Email Address</label>
              <input type="email" defaultValue="harrison@luxuryfleet.com" className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/10 text-white outline-none" />
            </div>
            <button onClick={() => alert("Profile updated successfully!")} className="px-6 py-3 rounded-xl bg-gold-gradient text-navy-dark font-extrabold uppercase tracking-wider">
              Save Profile Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
