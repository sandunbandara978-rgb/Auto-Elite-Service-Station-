import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, Key, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Pre-configured Admin Credentials
    if ((username.trim().toLowerCase() === 'admin' || username.trim().toLowerCase() === 'admin@autoelite.com') && password === 'admin123') {
      if (onLoginSuccess) onLoginSuccess();
      sessionStorage.setItem('auto_elite_admin_auth', 'true');
      navigate('/admin-dashboard');
    } else {
      setError('Invalid Admin Credentials. Please check username & password.');
    }
  };

  const handleQuickFill = () => {
    setUsername('admin');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full glass-panel rounded-3xl border border-gold/40 p-8 sm:p-10 bg-navy-dark/95 shadow-2xl space-y-6">
        
        {/* Header Icon & Title */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold mx-auto shadow-gold">
            <ShieldCheck className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-bold font-display text-white uppercase tracking-tight">
            ADMINISTRATOR <span className="text-gold-shine">LOGIN</span>
          </h2>
          <p className="text-xs text-slate-400">
            Secure Level-5 Portal Access for AUTO ELITE Station Managers.
          </p>
        </div>

        {/* Demo Credentials Alert Box */}
        <div className="p-4 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-between text-xs text-slate-200">
          <div>
            <p className="font-bold text-gold uppercase tracking-wider">Demo Credentials:</p>
            <p className="font-mono mt-0.5 text-slate-300">
              Username: <strong className="text-white font-bold">admin</strong> <br />
              Password: <strong className="text-white font-bold">admin123</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={handleQuickFill}
            className="px-3 py-1.5 rounded-lg bg-gold text-navy-dark font-extrabold text-[10px] uppercase tracking-wider hover:bg-gold-hover transition cursor-pointer"
          >
            Auto Fill
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Admin Username or Email
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-gold absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="e.g. admin"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-charcoal border border-white/10 text-sm text-white focus:border-gold outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
              Password
            </label>
            <div className="relative flex items-center">
              <Key className="w-4 h-4 text-gold absolute left-4 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password..."
                className="w-full pl-11 pr-11 py-3 rounded-xl bg-charcoal border border-white/10 text-sm text-white focus:border-gold outline-none font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider shadow-gold hover:shadow-gold-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>AUTHENTICATE & LOG IN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
