import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-6 py-20 space-y-6">
      <div className="w-24 h-24 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold shadow-gold-lg animate-pulse">
        <AlertCircle className="w-12 h-12" />
      </div>

      <h1 className="text-6xl sm:text-8xl font-black font-display text-white tracking-tight">
        404 <span className="text-gold-shine">ERROR</span>
      </h1>

      <p className="text-lg text-slate-300 font-display">ROUTE OFF TRACK</p>

      <p className="text-xs text-slate-400 max-w-md leading-relaxed">
        The page you are looking for has been moved or does not exist in the AUTO ELITE garage telemetry registry.
      </p>

      <div className="pt-4">
        <Link
          to="/"
          className="px-8 py-4 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider shadow-gold hover:shadow-gold-lg transition inline-flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>RETURN TO HOMEPAGE</span>
        </Link>
      </div>
    </div>
  );
}
