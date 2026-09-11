import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Volume2, VolumeX } from 'lucide-react';

export default function AutoEliteLoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing ECU Telemetry...');
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const statusSteps = [
      { threshold: 15, text: 'Scanning Engine Control Unit...' },
      { threshold: 35, text: 'Calibrating Twin-Turbo Boost Specs...' },
      { threshold: 60, text: 'Activating 3D Laser Geometry Scan...' },
      { threshold: 85, text: 'Engaging AUTO ELITE Garage Systems...' },
      { threshold: 98, text: 'Engine Ready. Launching Platform...' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 350);
          return 100;
        }
        const step = Math.floor(Math.random() * 6) + 5;
        const next = prev + step > 100 ? 100 : prev + step;

        const currentStatus = statusSteps.findLast((s) => next >= s.threshold);
        if (currentStatus) {
          setStatusText(currentStatus.text);
        }
        return next;
      });
    }, 55);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B0F19] text-white font-sans select-none overflow-hidden"
    >
      {/* Background Gold Ambient Glow & Metallic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/20 via-navy-dark/90 to-[#05070D] pointer-events-none" />
      
      <div 
        className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#d4af3715_1px,transparent_1px),linear-gradient(to_bottom,#d4af3715_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"
      />

      {/* Sound Toggle Button (Optional Audio Simulation) */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-navy/80 backdrop-blur-md text-xs text-gold hover:bg-gold/10 transition"
      >
        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        <span>{soundEnabled ? 'Engine Audio Active' : 'Muted'}</span>
      </button>

      {/* Main Center Stage */}
      <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-6 text-center">
        
        {/* Rotating Luxury Alloy Wheel & Glowing Rotor SVG */}
        <div className="relative flex items-center justify-center w-48 h-48 mb-8">
          
          {/* Metallic Pulsing Outer Ring */}
          <motion.div
            animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full border-2 border-gold/40 shadow-[0_0_50px_rgba(212,175,55,0.3)]"
          />

          {/* Counter Rotating Outer Rim Geometry */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
            className="absolute inset-2 rounded-full border border-dashed border-gold/60"
          />

          {/* SVG Alloy Wheel with Brembo Brake Caliper */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            className="w-36 h-36 relative"
          >
            <svg className="w-full h-full drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]" viewBox="0 0 100 100">
              {/* Outer Rim */}
              <circle cx="50" cy="50" r="46" stroke="#D4AF37" strokeWidth="2.5" fill="none" />
              <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
              
              {/* Slotted Brake Disc Rotor */}
              <circle cx="50" cy="50" r="32" stroke="#475569" strokeWidth="6" fill="#1E293B" strokeDasharray="4 2" />
              
              {/* Red Brembo Caliper */}
              <path d="M 50 12 A 38 38 0 0 1 82 30" stroke="#DC2626" strokeWidth="7" strokeLinecap="round" fill="none" />
              
              {/* 5-Spoke Alloy Wheel Rim Design */}
              {[0, 72, 144, 216, 288].map((angle, idx) => (
                <g key={idx} transform={`rotate(${angle} 50 50)`}>
                  <path d="M 50 50 L 47 10 L 53 10 Z" fill="url(#goldRimGradient)" />
                  <circle cx="50" cy="12" r="1.5" fill="#FFFFFF" />
                </g>
              ))}

              {/* Center Hub Nut */}
              <circle cx="50" cy="50" r="9" fill="#D4AF37" stroke="#0F172A" strokeWidth="2" />
              <circle cx="50" cy="50" r="4" fill="#0F172A" />

              <defs>
                <linearGradient id="goldRimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#9A7B1C" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Center Brand Monogram */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs tracking-[0.3em] font-black text-gold uppercase drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]">
              AUTO
            </span>
          </div>
        </div>

        {/* Animated Brand Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2"
        >
          <h1 className="text-3xl sm:text-4xl font-black tracking-[0.25em] text-white uppercase font-display">
            AUTO <span className="text-gold-shine">ELITE</span>
          </h1>
          <p className="text-xs tracking-[0.35em] text-slate-400 font-medium uppercase mt-1">
            Luxury Vehicle Service & Station
          </p>
        </motion.div>

        {/* Dynamic Percentage Counter */}
        <div className="flex items-baseline gap-1 my-4">
          <span className="text-4xl font-extrabold font-mono text-white tracking-tight">
            {progress}
          </span>
          <span className="text-xl font-bold text-gold font-mono">%</span>
        </div>

        {/* Engine Status Subtitle */}
        <motion.p
          key={statusText}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs tracking-wider uppercase text-slate-300 font-mono h-6 mb-4"
        >
          {statusText}
        </motion.p>

        {/* Animated Metallic Gold Progress Bar */}
        <div className="w-full h-2 bg-navy-light/60 rounded-full overflow-hidden p-[1px] border border-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <motion.div
            className="h-full bg-gold-gradient rounded-full shadow-[0_0_15px_rgba(212,175,55,0.9)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.15 }}
          />
        </div>

        {/* Footer Badge */}
        <div className="mt-8 flex items-center gap-2 text-[11px] text-slate-500 uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-gold" />
          <span>Awwwards Grade Automotive Engineering</span>
        </div>
      </div>
    </motion.div>
  );
}
