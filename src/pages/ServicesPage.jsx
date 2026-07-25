import { useState } from 'react';
import { autoEliteServices } from '../data/autoEliteData';
import { ShieldCheck, Clock, CheckCircle2, ChevronRight, Search, X, Flame, Wrench, Sparkles, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ['All', 'Maintenance', 'Safety', 'Diagnostics', 'Electrical', 'Comfort', 'Body & Paint', 'Detailing', 'Protection', 'Performance', 'Emergency'];

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState(null);

  const filteredServices = autoEliteServices.filter((s) => {
    const matchesCategory = activeCategory === 'All' || s.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-20">
      
      {/* DODGE DEMON HERO SECTION (STYLE MATCHING HOME PAGE HERO) */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 overflow-hidden">
        {/* Dodge Demon Background Image & Video Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=2000&q=85"
            alt="Dodge Demon SRT Supercar AUTO ELITE"
            className="w-full h-full object-cover object-center filter brightness-[0.4] scale-105 transition-all duration-700 hover:scale-110"
          />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.35] opacity-40"
          >
            <source
              src="https://assets.mixkit.co/videos/preview/mixkit-car-undergoing-a-thorough-cleaning-process-42935-large.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/60 to-transparent" />
          <div className="absolute inset-0 bg-radial-glow opacity-80" />
        </div>

        {/* Hero Content Grid (Matching Home Page) */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center sm:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            {/* Dodge Demon Flame Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-red-500/40 bg-red-600/10 text-red-400 text-xs font-bold uppercase tracking-widest shadow-gold">
              <Flame className="w-4 h-4 text-red-500 animate-pulse" />
              <span>Dodge Demon SRT & Master Workshop Catalog</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-white tracking-tight uppercase leading-[1.08]">
              EXECUTIVE SERVICES <br />
              <span className="text-gold-shine">DODGE DEMON & SUPERCAR CARE</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-body leading-relaxed">
              Explore our 12 specialized automotive engineering, 3D laser diagnostics, ceramic detailing, and SRT muscle performance tuning programs certified for Sri Lanka.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <Link
                to="/book"
                className="px-8 py-4 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-sm tracking-wider uppercase shadow-gold-lg hover:scale-105 transition-all flex items-center gap-3 cursor-pointer"
              >
                <Wrench className="w-5 h-5" />
                <span>BOOK SERVICE BAY</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <a
                href="#services-catalog"
                className="px-8 py-4 rounded-xl glass-panel border border-white/20 text-white hover:border-gold font-bold text-sm tracking-wider uppercase hover:bg-white/5 transition flex items-center gap-2"
              >
                <span>VIEW 12 PROGRAMS</span>
              </a>
            </div>
          </div>

          {/* Quick Floating Telemetry Card (Matching Home Page) */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-6 rounded-3xl border border-gold/30 shadow-2xl space-y-6 bg-gradient-to-b from-navy-dark/90 to-charcoal/90">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-lg font-bold font-display text-white">Workshop Telemetry</h4>
                  <p className="text-xs text-gold">Sri Lanka Station Status</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Certified Programs:</span>
                  <span className="font-bold text-gold font-mono">12 Master Programs</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gold h-full w-[100%]" />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Dodge SRT Tuning Bay:</span>
                  <span className="font-bold text-emerald-400 font-mono">Fully Operational</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>OEM Parts Warranty:</span>
                  <span className="font-bold text-white font-mono">100% Genuine Guarantee</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MAIN CATALOG & FILTER SECTION */}
      <div id="services-catalog" className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
        
        {/* Filter & Search Bar */}
        <div className="glass-panel p-4 sm:p-6 rounded-2xl border border-white/10 space-y-4 bg-navy-dark/90">
          <div className="flex items-center gap-3 bg-charcoal border border-white/10 rounded-xl px-4 py-3">
            <Search className="w-5 h-5 text-gold shrink-0" />
            <input
              type="text"
              placeholder="Search services by keyword, part, or issue (e.g. Dodge, SRT, Brake, ECU, Ceramic)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />
          </div>

          {/* Categories Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gold-gradient text-navy-dark shadow-gold font-bold'
                    : 'bg-white/5 text-slate-300 hover:text-white border border-white/5 hover:border-gold/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="glass-panel rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-gold/50 transition-all duration-300 bg-navy-dark/90 shadow-xl"
            >
              <div>
                {/* Card Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-navy-dark/80 backdrop-blur-md text-gold text-[10px] uppercase font-bold tracking-widest border border-gold/30">
                    {service.category}
                  </span>
                  <span className="absolute bottom-4 right-4 text-base font-black text-gold font-mono glass-panel px-3 py-1 rounded-xl border border-gold/30">
                    {service.price}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold font-display text-white group-hover:text-gold transition">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Key Features Bullet List */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    {service.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-gold" />
                  <span>{service.duration}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white uppercase transition cursor-pointer"
                  >
                    Details
                  </button>
                  <Link
                    to="/book"
                    className="px-4 py-2 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider shadow-gold hover:shadow-gold-lg transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Book</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-2xl w-full glass-panel rounded-3xl border border-gold/40 p-6 sm:p-8 bg-navy-dark/95 shadow-2xl text-white space-y-6 overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest">Program Scope Breakdown</span>
                <h3 className="text-2xl font-bold font-display text-white mt-0.5">{selectedService.name}</h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 uppercase">Service Fee</span>
                <p className="text-xl font-black text-gold font-mono">{selectedService.price}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-slate-400 uppercase">Warranty & Duration</span>
                <p className="text-sm font-bold text-white">{selectedService.warranty} ({selectedService.duration})</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <h4 className="font-bold text-gold uppercase tracking-wider">Comprehensive Features & Inclusions:</h4>
              <div className="space-y-2">
                {selectedService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <button
                onClick={() => setSelectedService(null)}
                className="px-6 py-2.5 rounded-xl border border-white/20 text-xs font-bold text-slate-300 uppercase hover:text-white"
              >
                Close
              </button>
              <Link
                to="/book"
                onClick={() => setSelectedService(null)}
                className="px-8 py-3 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider shadow-gold"
              >
                Book This Program
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
