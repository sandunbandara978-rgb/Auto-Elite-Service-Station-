import { autoEliteMechanics } from '../data/autoEliteData';
import { Star, ShieldCheck, Award, Wrench, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TeamPage() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* LAMBORGHINI SUPERCAR HERO SECTION (MATCHING HOME PAGE HERO FORMAT) */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 overflow-hidden">
        {/* Lamborghini Huracan Supercar Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=2000&q=85"
            alt="Lamborghini Huracan Supercar AUTO ELITE"
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
              <span>Stuttgart & Munich Guild Certified Engineers</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-white tracking-tight uppercase leading-[1.08]">
              MEET OUR <br />
              <span className="text-gold-shine">MASTER MECHANICS</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-body leading-relaxed">
              Meet our elite guild of Sri Lankan master engineers, powertrain specialists, and ceramic paint artisans behind every AUTO ELITE service.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <Link
                to="/book"
                className="px-8 py-4 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-sm tracking-wider uppercase shadow-gold-lg hover:scale-105 transition-all flex items-center gap-3 cursor-pointer"
              >
                <Wrench className="w-5 h-5" />
                <span>REQUEST MASTER ENGINEER</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <a
                href="#team-grid"
                className="px-8 py-4 rounded-xl glass-panel border border-white/20 text-white hover:border-gold font-bold text-sm tracking-wider uppercase hover:bg-white/5 transition flex items-center gap-2"
              >
                <span>VIEW MASTER GUILD</span>
              </a>
            </div>
          </div>

          {/* Quick Floating Stat Widget */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-6 rounded-3xl border border-gold/30 shadow-2xl space-y-6 bg-gradient-to-b from-navy-dark/90 to-charcoal/90">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-lg font-bold font-display text-white">Engineering Roster</h4>
                  <p className="text-xs text-gold">Sri Lanka Grand Station</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Master Technicians:</span>
                  <span className="font-bold text-gold font-mono">12 On Duty</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gold h-full w-[100%]" />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Average Rating:</span>
                  <span className="font-bold text-emerald-400 font-mono">4.96 / 5.0 ⭐</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Supercar Certifications:</span>
                  <span className="font-bold text-white font-mono">Porsche, AMG, BMW M, Tesla</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Grid Section */}
      <div id="team-grid" className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {autoEliteMechanics.map((m) => (
            <div key={m.id} className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row gap-6 items-center glass-panel-hover bg-navy-dark/90 shadow-xl">
              <img
                src={m.avatar}
                alt={m.name}
                className="w-32 h-32 rounded-2xl object-cover border-2 border-gold/40 shadow-xl shrink-0"
              />
              <div className="space-y-3 text-center sm:text-left flex-1">
                <div>
                  <h3 className="text-2xl font-bold font-display text-white">{m.name}</h3>
                  <p className="text-xs font-bold text-gold uppercase tracking-wider">{m.role}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{m.experience} • {m.specialty}</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic">"{m.bio}"</p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1 text-gold"><Star className="w-4 h-4 fill-gold" /> {m.rating} ({m.reviews} Reviews)</span>
                  <Link to="/book" className="text-gold font-bold hover:underline">Request Engineer &rarr;</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
