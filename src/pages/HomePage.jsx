import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Wrench, ChevronRight, Star, Clock, 
  Award, ArrowUpRight, Cpu, CheckCircle2, PhoneCall, Sparkles, Search, Car, User, Check, AlertCircle, RefreshCw
} from 'lucide-react';
import { autoEliteServices, autoEliteTestimonials, autoEliteMechanics } from '../data/autoEliteData';
import { getStoredBookings } from '../data/bookingStore';

export default function HomePage() {
  const [selectedCalcService, setSelectedCalcService] = useState(autoEliteServices[0].id);

  // Live Vehicle Situation Tracker State
  const [searchRefId, setSearchRefId] = useState('AE-9481');
  const [activeBookings, setActiveBookings] = useState(getStoredBookings);
  const [trackedBooking, setTrackedBooking] = useState(() => {
    const list = getStoredBookings();
    return list.find(b => b.id === 'AE-9481') || list[0];
  });

  // Listen for real-time admin status updates
  useEffect(() => {
    const handleSystemUpdate = () => {
      const list = getStoredBookings();
      setActiveBookings(list);
      
      // Update currently tracked booking if its status was updated by admin
      if (searchRefId) {
        const found = list.find(b => b.id.toLowerCase() === searchRefId.trim().toLowerCase());
        if (found) {
          setTrackedBooking(found);
        }
      }
    };

    window.addEventListener('auto_elite_system_update', handleSystemUpdate);
    return () => window.removeEventListener('auto_elite_system_update', handleSystemUpdate);
  }, [searchRefId]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const list = getStoredBookings();
    const found = list.find(b => b.id.toLowerCase() === searchRefId.trim().toLowerCase() || b.phone.includes(searchRefId));
    if (found) {
      setTrackedBooking(found);
    } else {
      setTrackedBooking(null);
    }
  };

  const handleSelectSampleRef = (refId) => {
    setSearchRefId(refId);
    const list = getStoredBookings();
    const found = list.find(b => b.id === refId);
    if (found) {
      setTrackedBooking(found);
    }
  };

  const calcService = autoEliteServices.find(s => s.id === selectedCalcService) || autoEliteServices[0];

  // Calculate progress bar stage (1-4)
  const getStageIndex = (status) => {
    if (status === 'Completed & Paid' || status === 'Completed') return 4;
    if (status === 'In Progress') return 3;
    if (status === 'Pending Approval') return 2;
    return 1; // Scheduled
  };

  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="space-y-24 pb-20">
      
      {/* CINEMATIC FULL-SCREEN WORKSHOP VIDEO TOUR MODAL */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
          <div className="relative max-w-4xl w-full glass-panel rounded-3xl border border-gold/40 shadow-2xl overflow-hidden bg-black space-y-4 p-4 sm:p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                <h3 className="text-lg font-bold font-display text-white">
                  AUTO ELITE Grand Station 4K Ultra Tour
                </h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
              <video
                autoPlay
                controls
                playsInline
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1600&q=80"
              >
                <source
                  src="https://assets.mixkit.co/videos/preview/mixkit-car-undergoing-a-thorough-cleaning-process-42935-large.mp4"
                  type="video/mp4"
                />
                <source
                  src="https://assets.mixkit.co/videos/preview/mixkit-mechanic-working-on-a-car-engine-42931-large.mp4"
                  type="video/mp4"
                />
              </video>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-300 pt-2">
              <p className="font-mono text-gold">100 Apex Boulevard, Cinnamon Gardens, Colombo 07</p>
              <Link
                to="/book"
                onClick={() => setIsVideoModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider shadow-gold"
              >
                Book Workshop Bay
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* HERO SECTION WITH REAL BACKGROUND VIDEO */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-12 pb-20 overflow-hidden">
        {/* Background Real HTML5 Looping Video with Dark Vignette Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=2000&q=85"
            className="w-full h-full object-cover object-center filter brightness-[0.45] scale-105 transition-all duration-700"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-car-undergoing-a-thorough-cleaning-process-42935-large.mp4"
              type="video/mp4"
            />
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-mechanic-working-on-a-car-engine-42931-large.mp4"
              type="video/mp4"
            />
          </video>
          {/* Fallback Mustang Supercar Background Image */}
          <img
            src="https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=2000&q=85"
            alt="Ford Mustang Supercar AUTO ELITE"
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.45] scale-105 -z-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/50 to-transparent" />
          <div className="absolute inset-0 bg-radial-glow opacity-80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center sm:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-gold/30 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-widest shadow-gold">
              <Sparkles className="w-4 h-4 text-gold animate-pulse" />
              <span>World-Class Automotive Excellence</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-white tracking-tight uppercase leading-[1.08]">
              PREMIUM VEHICLE CARE <br />
              <span className="text-gold-shine">BEYOND EXPECTATIONS</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-body leading-relaxed">
              Experience certified master mechanics, 3D laser diagnostics, and climate-controlled precision garage facilities crafted for luxury, sports, and exotic automobiles.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <Link
                to="/services"
                className="px-8 py-4 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-sm tracking-wider uppercase shadow-gold-lg hover:scale-105 transition-all flex items-center gap-3 cursor-pointer"
              >
                <Wrench className="w-5 h-5" />
                <span>BOOK SERVICE</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="px-8 py-4 rounded-xl glass-panel border border-gold/40 text-gold hover:bg-gold hover:text-navy-dark font-bold text-sm tracking-wider uppercase transition flex items-center gap-3 cursor-pointer shadow-gold"
              >
                <div className="w-6 h-6 rounded-full bg-gold text-navy-dark flex items-center justify-center font-bold text-xs animate-pulse">
                  ▶
                </div>
                <span>WATCH VIDEO TOUR</span>
              </button>

              <Link
                to="/services"
                className="px-8 py-4 rounded-xl glass-panel border border-white/20 text-white hover:border-gold font-bold text-sm tracking-wider uppercase hover:bg-white/5 transition flex items-center gap-2"
              >
                <span>EXPLORE SERVICES</span>
              </Link>
            </div>
          </motion.div>

          {/* Quick Floating Stat Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="glass-panel p-6 rounded-3xl border border-gold/30 shadow-2xl space-y-6 bg-gradient-to-b from-navy-dark/90 to-charcoal/90">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-lg font-bold font-display text-white">Live Garage Telemetry</h4>
                  <p className="text-xs text-gold">Grand Station Status</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Current Active Bays:</span>
                  <span className="font-bold text-gold font-mono">14 / 16 Operational</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gold h-full w-[88%]" />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Average Turnaround:</span>
                  <span className="font-bold text-white font-mono">98.4% On-Time</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Master Technicians:</span>
                  <span className="font-bold text-emerald-400 font-mono">12 On Duty</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* NEW FEATURE: LIVE VEHICLE SERVICE SITUATION TRACKER */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="glass-panel rounded-3xl border border-gold/40 p-8 sm:p-12 bg-navy-dark/95 shadow-2xl space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest">
              <Cpu className="w-4 h-4 animate-spin text-gold" />
              <span>Real-Time Customer Telemetry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white uppercase tracking-tight">
              LIVE VEHICLE <span className="text-gold-shine">SITUATION TRACKER</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Vehicle owners can enter their Ref ID below to monitor their car's live service bay situation & admin status.
            </p>
          </div>

          {/* Search Box & Quick Ref ID Chips */}
          <div className="max-w-xl mx-auto space-y-4">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-5 h-5 text-gold absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchRefId}
                onChange={(e) => setSearchRefId(e.target.value)}
                placeholder="Enter your Ref ID (e.g. AE-9481)..."
                className="w-full pl-12 pr-32 py-4 rounded-2xl bg-charcoal border border-gold/40 text-sm text-white focus:border-gold outline-none font-mono font-bold shadow-gold"
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider hover:shadow-gold transition cursor-pointer"
              >
                Track Live
              </button>
            </form>

            {/* Quick Sample Click Chips */}
            <div className="flex items-center justify-center flex-wrap gap-2 text-xs">
              <span className="text-slate-400 font-semibold text-[11px]">Quick Sample Ref IDs:</span>
              {activeBookings.slice(0, 4).map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => handleSelectSampleRef(b.id)}
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition border cursor-pointer ${
                    searchRefId === b.id
                      ? 'bg-gold text-navy-dark border-gold shadow-gold'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:border-gold/40 hover:text-gold'
                  }`}
                >
                  {b.id}
                </button>
              ))}
            </div>
          </div>

          {/* TELEMETRY RESULTS DISPLAY CARD */}
          {trackedBooking ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-gold/30 space-y-8"
            >
              {/* Header Info Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-extrabold text-gold uppercase tracking-widest">
                      REF ID: {trackedBooking.id}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  </div>
                  <h3 className="text-2xl font-black font-display text-white mt-1">
                    {trackedBooking.vehicle}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Owner: <strong className="text-white">{trackedBooking.customer}</strong> ({trackedBooking.phone})
                  </p>
                </div>

                <div className="sm:text-right space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                    Admin Status Tally
                  </span>
                  <span className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase border inline-block ${
                    trackedBooking.status === 'Completed & Paid'
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-mono shadow-emerald-500/20'
                      : trackedBooking.status === 'In Progress'
                      ? 'bg-gold/20 text-gold border-gold/40 shadow-gold'
                      : trackedBooking.status === 'Completed'
                      ? 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                      : 'bg-charcoal text-slate-200 border-white/20'
                  }`}>
                    {trackedBooking.status}
                  </span>
                </div>
              </div>

              {/* 4-Stage Visual Progress Bar */}
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                  <span className="text-gold uppercase tracking-wider">Live Service Station Progress:</span>
                  <span className="font-mono text-slate-400">Stage {getStageIndex(trackedBooking.status)} of 4</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { stage: 1, label: 'Reservation Logged', desc: 'Bay Allocated' },
                    { stage: 2, label: '3D Diagnostics', desc: 'Multi-Point Scope' },
                    { stage: 3, label: 'Engineering Work', desc: 'OEM Master Technician' },
                    { stage: 4, label: 'Quality Control', desc: 'Ready for Pickup' },
                  ].map((stg) => {
                    const currentStage = getStageIndex(trackedBooking.status);
                    const isDone = currentStage >= stg.stage;

                    return (
                      <div key={stg.stage} className="space-y-2">
                        <div className={`h-2.5 rounded-full transition-all duration-500 ${
                          isDone ? 'bg-gold shadow-gold' : 'bg-white/10'
                        }`} />
                        <div className="hidden sm:block text-[11px]">
                          <p className={`font-bold ${isDone ? 'text-gold' : 'text-slate-500'}`}>
                            {stg.stage}. {stg.label}
                          </p>
                          <p className="text-[10px] text-slate-400">{stg.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Detail Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-charcoal/80 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Selected Program</span>
                  <p className="text-sm font-bold text-gold">{trackedBooking.service}</p>
                  <p className="text-xs font-mono text-white">{trackedBooking.revenue}</p>
                </div>

                <div className="p-4 rounded-2xl bg-charcoal/80 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Assigned Master Mechanic</span>
                  <p className="text-sm font-bold text-white">{trackedBooking.mechanic}</p>
                  <p className="text-xs text-slate-400">OEM Master Engineer</p>
                </div>

                <div className="p-4 rounded-2xl bg-charcoal/80 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Station Location</span>
                  <p className="text-sm font-bold text-white">Colombo Grand Station</p>
                  <p className="text-xs text-slate-400">Cinnamon Gardens, Colombo 07</p>
                </div>
              </div>

            </motion.div>
          ) : (
            <div className="p-8 rounded-3xl bg-red-500/10 border border-red-500/30 text-center space-y-3 text-red-400">
              <AlertCircle className="w-10 h-10 mx-auto" />
              <h4 className="text-lg font-bold">No Reservation Found for "{searchRefId}"</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Please verify your Reference ID (e.g. AE-9481) or click one of the quick sample chips above to inspect active telemetry.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* NEW FEATURE: REAL CINEMATIC GARAGE & WORKSHOP SHOWCASE VIDEO */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">Exclusive Workshop Cinema</span>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
            INSIDE OUR <span className="text-gold-shine">GRAND STATION</span>
          </h2>
          <p className="text-sm text-slate-300">
            Watch our master mechanics performing 9H ceramic detailing, twin-turbo engine rebuilds, and Italian bake booth spray finishes.
          </p>
        </div>

        {/* Real HD Video Player Container */}
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-gold/40 shadow-2xl bg-black group">
          <video
            autoPlay
            loop
            muted
            playsInline
            controls
            poster="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80"
            className="w-full h-[320px] sm:h-[480px] lg:h-[560px] object-cover"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-mechanic-working-on-a-car-engine-42931-large.mp4"
              type="video/mp4"
            />
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-car-undergoing-a-thorough-cleaning-process-42935-large.mp4"
              type="video/mp4"
            />
            Your browser does not support HTML5 video playback.
          </video>

          {/* Video Floating Badges */}
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2 pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-red-600/90 text-white font-mono text-[10px] font-bold uppercase tracking-widest shadow-md animate-pulse">
              ● LIVE HD WORKSHOP STREAM
            </span>
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-gold border border-gold/30 font-mono text-[10px] font-bold">
              4K ULTRA HDR
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 z-10 p-4 sm:p-6 rounded-2xl glass-panel bg-black/70 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
            <div>
              <p className="font-bold text-white text-sm">Colombo 07 Grand Station Workshop</p>
              <p className="text-slate-400">16 Climate-Controlled Bays • OEM Master Technicians</p>
            </div>
            <Link
              to="/book"
              className="px-6 py-2.5 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider shadow-gold hover:scale-105 transition cursor-pointer"
            >
              Book Service Bay
            </Link>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { metric: '15,000+', label: 'Supercars & Exotic Vehicles Serviced' },
            { metric: '150-Point', label: 'Digital Laser Inspection Protocol' },
            { metric: '9H', label: 'Ceramic & Carbon Fiber Coating Specialists' },
            { metric: '100%', label: 'OEM Genuine Manufacturer Parts Guarantee' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 text-center space-y-2"
            >
              <h3 className="text-3xl sm:text-4xl font-black font-display text-gold font-mono">{stat.metric}</h3>
              <p className="text-xs text-slate-300 font-semibold uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ESTIMATOR CALCULATOR CARD */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="glass-panel rounded-3xl border border-gold/30 p-8 sm:p-12 bg-navy-dark/90 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">Instant Service Estimator</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white uppercase tracking-tight">
              CALCULATE YOUR <span className="text-gold-shine">SERVICE ESTIMATE</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Select your required maintenance or detailing program below to preview estimated duration, warranty, and LKR pricing.
            </p>

            <div className="space-y-4">
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Select Service Program
              </label>
              <select
                value={selectedCalcService}
                onChange={(e) => setSelectedCalcService(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-charcoal border border-white/10 text-sm text-white focus:border-gold outline-none"
              >
                {autoEliteServices.map((s) => (
                  <option key={s.id} value={s.id} className="bg-navy-dark">
                    {s.name} - {s.price}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="lg:col-span-6 glass-panel p-6 sm:p-8 rounded-2xl border border-gold/40 bg-white/5 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <h4 className="text-lg font-bold text-white">{calcService.name}</h4>
                <p className="text-xs text-gold">{calcService.category}</p>
              </div>
              <span className="text-2xl font-black text-gold font-mono">{calcService.price}</span>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Duration:</span>
                <span className="font-bold text-white">{calcService.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Warranty Coverage:</span>
                <span className="font-bold text-gold">{calcService.warranty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Master Technician:</span>
                <span className="font-bold text-white">Certified OEM Specialist</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/book"
                className="w-full py-3.5 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider shadow-gold hover:shadow-gold-lg transition flex items-center justify-center gap-2"
              >
                <span>BOOK THIS PROGRAM NOW</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MASTER MECHANICS SECTION */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">Master Engineers</span>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
            MEET OUR <span className="text-gold-shine">MASTER MECHANICS</span>
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Factory-trained specialists certified by Porsche, AMG, BMW M, and Ferrari.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {autoEliteMechanics.map((mech) => (
            <motion.div
              key={mech.id}
              whileHover={{ y: -6 }}
              className="glass-panel p-6 rounded-3xl border border-white/10 text-center space-y-4 group hover:border-gold/50 transition"
            >
              <img
                src={mech.avatar}
                alt={mech.name}
                className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-gold/40 group-hover:scale-105 transition"
              />
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-gold transition">{mech.name}</h3>
                <p className="text-xs font-semibold text-gold uppercase mt-0.5">{mech.role}</p>
                <p className="text-[11px] text-slate-400 mt-1">{mech.specialty}</p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300 font-mono">
                <span>{mech.experience}</span>
                <span className="flex items-center gap-1 text-gold">
                  <Star className="w-3.5 h-3.5 fill-gold text-gold" /> {mech.rating}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">Client Testimonials</span>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
            TRUSTED BY <span className="text-gold-shine">LUXURY OWNERS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {autoEliteTestimonials.map((t) => (
            <motion.div
              key={t.id}
              whileHover={{ y: -6 }}
              className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4 relative"
            >
              <div className="flex items-center gap-1 text-gold">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-gold" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                "{t.comment}"
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-xs text-gold font-mono">{t.vehicle}</p>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{t.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
