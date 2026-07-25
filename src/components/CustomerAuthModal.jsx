import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, Mail, Phone, Car, ShieldCheck, ArrowRight, UserPlus, LogIn, AlertCircle } from 'lucide-react';
import { loginCustomer, registerCustomer } from '../data/customerAuth';

export default function CustomerAuthModal({ isOpen, onClose, onSuccess, initialMode = 'login', message = '' }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regVehicle, setRegVehicle] = useState('');

  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = loginCustomer(loginEmail, loginPassword);
    if (res.success) {
      if (onSuccess) onSuccess(res.user);
      onClose();
    } else {
      setError(res.message);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = registerCustomer({
      name: regName,
      email: regEmail,
      phone: regPhone,
      password: regPassword,
      vehicle: regVehicle
    });

    if (res.success) {
      if (onSuccess) onSuccess(res.user);
      onClose();
    } else {
      setError(res.message);
    }
  };

  const handleFillDemoUser = () => {
    setLoginEmail('dinesh@luxurycar.lk');
    setLoginPassword('user123');
    setError('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative max-w-md w-full glass-panel rounded-3xl border border-gold/40 p-6 sm:p-8 bg-navy-dark/95 shadow-2xl text-white overflow-hidden space-y-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top Branding & Mode Toggle */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold mx-auto shadow-gold">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-display text-white uppercase tracking-tight">
              {mode === 'login' ? 'SIGN IN TO' : 'CREATE YOUR'} <span className="text-gold-shine">ACCOUNT</span>
            </h3>
            <p className="text-xs text-slate-300">
              {message || 'You must create or log into a user account to book services.'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase">
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`py-2 rounded-lg transition ${mode === 'login' ? 'bg-gold text-navy-dark shadow-gold' : 'text-slate-400 hover:text-white'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`py-2 rounded-lg transition ${mode === 'register' ? 'bg-gold text-navy-dark shadow-gold' : 'text-slate-400 hover:text-white'}`}
            >
              Create Account
            </button>
          </div>

          {/* Demo User Helper Box */}
          {mode === 'login' && (
            <div className="p-3 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-between text-xs text-slate-200">
              <div>
                <p className="font-bold text-gold uppercase text-[10px]">Demo User Credentials:</p>
                <p className="font-mono text-[11px] text-slate-300">dinesh@luxurycar.lk | user123</p>
              </div>
              <button
                type="button"
                onClick={handleFillDemoUser}
                className="px-2.5 py-1 rounded bg-gold text-navy-dark font-extrabold text-[10px] uppercase hover:bg-gold-hover transition"
              >
                Auto Fill
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* FORM 1: LOGIN */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                  Email Address or Phone
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-gold absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    placeholder="dinesh@luxurycar.lk"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-charcoal border border-white/10 text-white outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-gold absolute left-3.5 pointer-events-none" />
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-charcoal border border-white/10 text-white outline-none focus:border-gold font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider shadow-gold hover:shadow-gold-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>SIGN IN TO PROCEED</span>
                </button>
              </div>
            </form>
          ) : (
            /* FORM 2: REGISTER */
            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="block uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-gold absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    required
                    placeholder="e.g. Kasun Fernando"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal border border-white/10 text-white outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-gold absolute left-3.5 pointer-events-none" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                    placeholder="kasun@gmail.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal border border-white/10 text-white outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Phone Number (Sri Lanka)
                </label>
                <div className="relative flex items-center">
                  <Phone className="w-4 h-4 text-gold absolute left-3.5 pointer-events-none" />
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    required
                    placeholder="+94 77 123 4567"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal border border-white/10 text-white outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Vehicle Model
                </label>
                <div className="relative flex items-center">
                  <Car className="w-4 h-4 text-gold absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    value={regVehicle}
                    onChange={(e) => setRegVehicle(e.target.value)}
                    placeholder="e.g. BMW M5 (WP CAD-911)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal border border-white/10 text-white outline-none focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Create Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-gold absolute left-3.5 pointer-events-none" />
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    placeholder="Minimum 6 characters"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-charcoal border border-white/10 text-white outline-none focus:border-gold font-mono"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider shadow-gold hover:shadow-gold-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>REGISTER & PROCEED TO BOOKING</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
