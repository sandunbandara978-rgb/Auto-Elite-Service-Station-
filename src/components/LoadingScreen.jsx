import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Initializing ECU...');

  useEffect(() => {
    const stages = [
      { threshold: 20, text: 'Initializing Systems...' },
      { threshold: 45, text: 'Calibrating Performance Spec...' },
      { threshold: 75, text: 'Loading 3D Customizer Engine...' },
      { threshold: 95, text: 'Ready for Takeoff...' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        const currentStage = stages.findLast((s) => next >= s.threshold);
        if (currentStage) {
          setStage(currentStage.text);
        }
        return next > 100 ? 100 : next;
      });
    }, 60);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black font-sans text-white select-none overflow-hidden"
    >
      {/* Background Ambient Glow & Grid Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 via-black/80 to-black pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"
      />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">
        {/* Animated Tachometer Ring Icon */}
        <div className="relative flex items-center justify-center w-36 h-36 mb-8">
          {/* Outer Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-accent border-r-accent/40"
          />

          {/* Counter-rotating Inner Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
            className="absolute inset-2 rounded-full border border-transparent border-b-white/50 border-l-white/20"
          />

          {/* Speedometer Needle Simulation */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="4"
              fill="transparent"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              stroke="#E10600"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={264}
              strokeDashoffset={264 - (264 * progress) / 100}
              strokeLinecap="round"
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </svg>

          {/* Center Brand Badge */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-2xl font-black tracking-widest text-white drop-shadow-[0_0_12px_rgba(225,6,0,0.8)]"
            >
              MODI
            </motion.span>
            <span className="text-[10px] font-semibold tracking-widest text-accent uppercase">
              Drive
            </span>
          </div>
        </div>

        {/* Progress Percentage */}
        <div className="flex items-baseline gap-1 mb-2">
          <motion.span 
            key={progress}
            initial={{ opacity: 0.7, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold tracking-tight text-white font-mono"
          >
            {progress}
          </motion.span>
          <span className="text-xl font-bold text-accent font-mono">%</span>
        </div>

        {/* Dynamic Status Text */}
        <p className="text-xs tracking-widest uppercase text-slate-400 font-medium h-5 mb-6 text-center">
          {stage}
        </p>

        {/* Smooth Sleek Progress Bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-[1px] backdrop-blur-sm border border-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 via-accent to-amber-500 rounded-full shadow-[0_0_12px_rgba(225,6,0,0.9)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
          />
        </div>

        {/* Footer Subtitle */}
        <div className="mt-8 flex items-center gap-2 text-[11px] text-slate-500 tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
          Luxury Automotive Engineering
        </div>
      </div>
    </motion.div>
  );
}
