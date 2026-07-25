import { useState } from 'react';
import { PhoneCall, Truck, MapPin, AlertTriangle, ShieldCheck, CheckCircle2, Sparkles, ChevronRight, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { addSystemBooking } from '../data/bookingStore';

export default function EmergencyPage() {
  const [locating, setLocating] = useState(false);
  const [gpsCoordinates, setGpsCoordinates] = useState('6.9061° N, 79.8708° E (Cinnamon Gardens, Colombo 07)');
  const [emergencyType, setEmergencyType] = useState('Low-Angle Flatbed Towing (Low Supercar)');
  const [contactPhone, setContactPhone] = useState('0703735156');
  const [dispatched, setDispatched] = useState(false);
  const [hotlineAlerted, setHotlineAlerted] = useState(false);

  // Fires a red emergency notification to the Admin Dashboard (cloud + local)
  const triggerEmergencyNotification = (type, details) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    addSystemBooking({
      customer: `🚨 EMERGENCY — ${contactPhone}`,
      phone: contactPhone,
      vehicle: 'Emergency Breakdown',
      service: type,
      date: new Date().toISOString().slice(0, 10),
      time: timeStr,
      mechanic: 'On-Call Dispatch Team',
      price: 'Emergency Rate',
      rawPrice: 0,
      notes: details,
      type: 'emergency',
      status: 'Preparing'
    });
  };

  const handleHotlineClick = () => {
    if (!hotlineAlerted) {
      triggerEmergencyNotification(
        '🚨 HOTLINE CALL — 24/7 Emergency',
        `Customer dialed the emergency hotline at ${new Date().toLocaleTimeString()}. GPS: ${gpsCoordinates}`
      );
      setHotlineAlerted(true);
    }
  };

  const handleSimulateGPS = () => {
    setLocating(true);
    setTimeout(() => {
      setLocating(false);
      setGpsCoordinates('6.9271° N, 79.8612° E (Fort, Colombo) [High Accuracy Live GPS]');
    }, 1500);
  };

  const handleDispatch = (e) => {
    e.preventDefault();
    triggerEmergencyNotification(
      `🚨 ${emergencyType}`,
      `GPS Dispatch Request: ${gpsCoordinates} | Phone: ${contactPhone} | Service: ${emergencyType}`
    );
    setDispatched(true);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* AUDI R8 SUPERCAR HERO SECTION (MATCHING HOME PAGE HERO FORMAT) */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 overflow-hidden">
        {/* Audi R8 Supercar Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1543051932-6ef9fecfbc80?auto=format&fit=crop&w=2000&q=85"
            alt="High-Definition Red Emergency Fire Truck Engine with flashing rescue lights AUTO ELITE"
            className="w-full h-full object-cover object-center filter brightness-[0.5] scale-105 transition-all duration-700 hover:scale-110"
          />
          {/* Animated Flashing Emergency Strobe Light Overlay */}
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-red-600/40 rounded-full blur-3xl animate-ping pointer-events-none" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl animate-pulse pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/60 to-transparent" />
          <div className="absolute inset-0 bg-radial-glow opacity-80" />
        </div>

        {/* Hero Content Grid (Matching Home Page) */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center sm:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-widest shadow-red-500/20 shadow-lg">
              <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
              <span>24/7 Islandwide Emergency Breakdown Dispatch</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-white tracking-tight uppercase leading-[1.08]">
              24/7 ROADSIDE <br />
              <span className="text-red-500">EMERGENCY ASSISTANCE</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-body leading-relaxed">
              Immediate low-angle flatbed towing, mobile jumpstarts, flat tire mounts, and supercar breakdown dispatch across Sri Lanka.
            </p>

            {/* Hotline alert banner — appears after clicking the hotline */}
            {hotlineAlerted && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-600/20 border border-red-500/50 text-red-400 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block shrink-0" />
                Admin dispatched! Our team has been notified of your emergency call. Stay on the line.
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              {/* HOTLINE BUTTON — clicking fires red notification to Admin Dashboard */}
              <a
                href="tel:0703735156"
                onClick={handleHotlineClick}
                className="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm tracking-wider uppercase shadow-red-500/30 shadow-xl hover:scale-105 transition-all flex items-center gap-3 cursor-pointer"
              >
                <PhoneCall className="w-5 h-5 animate-bounce" />
                <span>HOTLINE: 0703735156</span>
              </a>

              <a
                href="#dispatch-wizard"
                className="px-8 py-4 rounded-xl glass-panel border border-white/20 text-white hover:border-gold font-bold text-sm tracking-wider uppercase hover:bg-white/5 transition flex items-center gap-2"
              >
                <span>GPS DISPATCH WIZARD</span>
              </a>
            </div>
          </div>

          {/* Quick Floating Stat Widget */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-6 rounded-3xl border border-red-500/30 shadow-2xl space-y-6 bg-gradient-to-b from-navy-dark/90 to-charcoal/90">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-lg font-bold font-display text-white">Live Dispatch Tower</h4>
                  <p className="text-xs text-red-400">Islandwide Emergency</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Response Time:</span>
                  <span className="font-bold text-red-400 font-mono">15-20 Mins Arrival</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full w-[100%]" />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Flatbed Tow Truck:</span>
                  <span className="font-bold text-emerald-400 font-mono">Low-Angle Supercar Safe</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Duty Technicians:</span>
                  <span className="font-bold text-white font-mono">24/7 Mobile Active</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Dispatch Section */}
      <div id="dispatch-wizard" className="mx-auto max-w-5xl px-6 lg:px-8 space-y-12">
        {/* Live GPS Dispatch Form */}
        <div className="glass-panel rounded-3xl border border-gold/30 p-6 sm:p-10 bg-navy-dark/90 shadow-2xl space-y-8">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-2xl font-bold font-display text-white">Digital Dispatch Wizard</h3>
            <p className="text-xs text-gold">Submit live coordinates for instant mobile technician dispatch.</p>
          </div>

          {dispatched ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Emergency Unit Dispatched!</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Flatbed unit #04 is en route to <strong className="text-gold font-mono">{gpsCoordinates}</strong>. Estimated arrival in 14 minutes.
              </p>
              <div className="text-xs text-red-400 font-semibold flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                Admin Dashboard has been notified — our team is responding.
              </div>
              <button
                onClick={() => { setDispatched(false); setHotlineAlerted(false); }}
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase cursor-pointer"
              >
                Submit New Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleDispatch} className="space-y-6 text-xs">
              <div className="space-y-2">
                <label className="text-slate-300 font-semibold uppercase">Emergency Service Type</label>
                <select
                  value={emergencyType}
                  onChange={(e) => setEmergencyType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/10 text-white focus:border-gold outline-none"
                >
                  <option value="Low-Angle Flatbed Towing (Low Supercar)">Low-Angle Flatbed Towing (Low Supercar)</option>
                  <option value="Mobile Battery Jumpstart & Tester">Mobile Battery Jumpstart &amp; Tester</option>
                  <option value="Flat Tire Mount & Spare Assembly">Flat Tire Mount &amp; Spare Assembly</option>
                  <option value="Emergency Fuel Delivery (10 Litres)">Emergency Fuel Delivery (10 Litres)</option>
                  <option value="Vehicle Lockout Assistance">Vehicle Lockout Assistance</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-slate-300 font-semibold uppercase">Current GPS Coordinates</label>
                  <button
                    type="button"
                    onClick={handleSimulateGPS}
                    className="text-gold hover:underline font-semibold cursor-pointer"
                  >
                    {locating ? 'Locating via Satellite...' : '⚡ Auto-Detect GPS Location'}
                  </button>
                </div>
                <input
                  type="text"
                  value={gpsCoordinates}
                  onChange={(e) => setGpsCoordinates(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/10 text-white font-mono focus:border-gold outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-slate-300 font-semibold uppercase">Driver Contact Phone</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/10 text-white font-mono focus:border-gold outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-wider shadow-red-500/30 shadow-lg cursor-pointer transition-all hover:scale-[1.01]"
              >
                🚨 REQUEST EMERGENCY DISPATCH NOW — NOTIFY ADMIN
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  );
}
