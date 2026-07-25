import { ShieldCheck, Award, Wrench, Sparkles, Building2, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* FERRARI SUPERCAR HERO SECTION (MATCHING HOME PAGE HERO FORMAT) */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 overflow-hidden">
        {/* Ferrari SF90 Supercar Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=2000&q=85"
            alt="Ferrari SF90 Supercar AUTO ELITE"
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
              <span>15-Year Legacy of Supercar Engineering</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-white tracking-tight uppercase leading-[1.08]">
              CRAFTED FOR <br />
              <span className="text-gold-shine">AUTOMOTIVE PERFECTION</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-body leading-relaxed">
              Founded in 2011, AUTO ELITE was born from a singular vision: to revolutionize luxury automotive maintenance through OEM master mechanics, dust-free climate booths, and 4K digital telemetry.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <Link
                to="/services"
                className="px-8 py-4 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-sm tracking-wider uppercase shadow-gold-lg hover:scale-105 transition-all flex items-center gap-3 cursor-pointer"
              >
                <Wrench className="w-5 h-5" />
                <span>BOOK SERVICE BAY</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                to="/team"
                className="px-8 py-4 rounded-xl glass-panel border border-white/20 text-white hover:border-gold font-bold text-sm tracking-wider uppercase hover:bg-white/5 transition flex items-center gap-2"
              >
                <span>MEET OUR ENGINEERS</span>
              </Link>
            </div>
          </div>

          {/* Quick Floating Stat Widget */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-6 rounded-3xl border border-gold/30 shadow-2xl space-y-6 bg-gradient-to-b from-navy-dark/90 to-charcoal/90">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-lg font-bold font-display text-white">Grand Station Hub</h4>
                  <p className="text-xs text-gold">Colombo 07 Headquarter</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Supercars Serviced:</span>
                  <span className="font-bold text-gold font-mono">15,000+ Completed</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gold h-full w-[95%]" />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Climate Bays:</span>
                  <span className="font-bold text-emerald-400 font-mono">16 Bays Operational</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Laser Diagnostic Scanner:</span>
                  <span className="font-bold text-white font-mono">Hunter 3D Equipped</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Facility Showcase Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold uppercase tracking-widest border border-gold/30">
              <Building2 className="w-4 h-4" />
              <span>State-Of-The-Art Station</span>
            </div>
            <h2 className="text-3xl font-black font-display text-white uppercase tracking-tight">
              A Million-Dollar <span className="text-gold-shine">Engineering Hub</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our flagship Grand Station features 16 climate-controlled service bays, Italian Blowtherm paint bake ovens, Hunter 3D laser alignment ramps, and a glass-enclosed executive VIP lounge.
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span>100% OEM Original Factory Parts with Serial Warranty</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span>Stuttgart & Munich Trained Master Guild Engineers</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                <span>Transparent HD Video Diagnostic Portal Updates</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-gold/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80"
              alt="AUTO ELITE Facility"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-8 bg-navy-dark/90">
          <h3 className="text-2xl font-bold font-display text-white text-center">Our 15-Year Evolution</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {[
              { year: '2011', title: 'Founded in Colombo', desc: 'Started with 2 bays specializing in German automobiles.' },
              { year: '2015', title: 'OEM Certification', desc: 'Acquired official Bosch and Porsche master credentials.' },
              { year: '2019', title: 'Grand Station Launch', desc: 'Expanded to a 16-bay climate-controlled flagship garage.' },
              { year: '2026', title: 'Digital Telemetry Era', desc: 'Launched real-time live video tracking and 3D diagnostic reporting.' },
            ].map((t, i) => (
              <div key={i} className="p-4 space-y-2 border-l border-gold/30 text-left">
                <span className="text-2xl font-black text-gold font-mono">{t.year}</span>
                <h4 className="text-sm font-bold text-white">{t.title}</h4>
                <p className="text-xs text-slate-400">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
