import { autoElitePackages } from '../data/autoEliteData';
import { CheckCircle2, ChevronRight, ShieldCheck, Sparkles, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PackagesPage() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* ASTON MARTIN SUPERCAR HERO SECTION (MATCHING HOME PAGE HERO FORMAT) */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 overflow-hidden">
        {/* Aston Martin Supercar Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=2000&q=85"
            alt="Corvette Supercar Packages AUTO ELITE"
            className="w-full h-full object-cover object-center filter brightness-[0.4] scale-105 transition-all duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/60 to-transparent" />
          <div className="absolute inset-0 bg-radial-glow opacity-80" />
        </div>

        {/* Hero Content Grid (Matching Home Page) */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center sm:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-gold/30 bg-gold/10 text-gold text-xs font-semibold uppercase tracking-widest shadow-gold">
              <Sparkles className="w-4 h-4 text-gold animate-pulse" />
              <span>Transparent All-Inclusive Maintenance Tiers</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-white tracking-tight uppercase leading-[1.08]">
              EXECUTIVE CARE <br />
              <span className="text-gold-shine">MAINTENANCE PACKAGES</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-body leading-relaxed">
              Structured, transparent maintenance tiers designed for luxury sedans, sports coupes, SUVs, and supercar fleets in Sri Lanka.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <Link
                to="/book"
                className="px-8 py-4 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-sm tracking-wider uppercase shadow-gold-lg hover:scale-105 transition-all flex items-center gap-3 cursor-pointer"
              >
                <Wrench className="w-5 h-5" />
                <span>BOOK PACKAGE NOW</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <a
                href="#packages-grid"
                className="px-8 py-4 rounded-xl glass-panel border border-white/20 text-white hover:border-gold font-bold text-sm tracking-wider uppercase hover:bg-white/5 transition flex items-center gap-2"
              >
                <span>COMPARE 4 TIERS</span>
              </a>
            </div>
          </div>

          {/* Quick Floating Stat Widget */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-6 rounded-3xl border border-gold/30 shadow-2xl space-y-6 bg-gradient-to-b from-navy-dark/90 to-charcoal/90">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-lg font-bold font-display text-white">Tier Telemetry</h4>
                  <p className="text-xs text-gold">Package Inclusions</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Most Popular:</span>
                  <span className="font-bold text-gold font-mono">Gold Supreme</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gold h-full w-[90%]" />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Engine Oil:</span>
                  <span className="font-bold text-emerald-400 font-mono">100% Synthetic OEM</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>VIP Lounge Access:</span>
                  <span className="font-bold text-white font-mono">Included Free</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Package Cards Grid Section */}
      <div id="packages-grid" className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {autoElitePackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`glass-panel rounded-3xl border ${pkg.borderColor} p-6 sm:p-8 flex flex-col justify-between relative glass-panel-hover ${
                pkg.popular ? 'shadow-gold-lg bg-navy-dark/95' : 'bg-navy-dark/80'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-gradient text-navy-dark font-extrabold text-[10px] uppercase tracking-widest shadow-gold">
                  {pkg.badge}
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold font-display text-white">{pkg.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{pkg.subtitle}</p>
                </div>

                <div className="py-4 border-y border-white/10">
                  <span className="text-4xl font-black text-white font-mono">{pkg.price}</span>
                  <span className="text-xs text-slate-400 block mt-1 uppercase font-medium">{pkg.period}</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-300">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  to="/book"
                  className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'bg-gold-gradient text-navy-dark shadow-gold hover:shadow-gold-lg'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  <span>Select Plan</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
