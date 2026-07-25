import { useState } from 'react';
import { autoEliteGallery } from '../data/autoEliteData';
import { X, Maximize2, Sparkles, ChevronRight, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = ['All', 'Supercars', 'Engine Repair', 'Body & Paint', 'Detailing', 'Workshop'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState(null);

  const filteredGallery = autoEliteGallery.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <div className="space-y-16 pb-20">
      
      {/* BUGATTI SUPERCAR HERO SECTION (MATCHING HOME PAGE HERO FORMAT) */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 overflow-hidden">
        {/* Bugatti Supercar Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=2000&q=85"
            alt="Bugatti Supercar Gallery AUTO ELITE"
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
              <span>4K High-Resolution Automotive Showcase</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-white tracking-tight uppercase leading-[1.08]">
              WORKSHOP <br />
              <span className="text-gold-shine">SUPERCAR GALLERY</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-body leading-relaxed">
              A visual record of our finest twin-turbo engine rebuilds, ceramic 9H paint corrections, and supercar transformations at Colombo 07 Grand Station.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <a
                href="#gallery-grid"
                className="px-8 py-4 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-sm tracking-wider uppercase shadow-gold-lg hover:scale-105 transition-all flex items-center gap-3 cursor-pointer"
              >
                <span>EXPLORE 4K GALLERY</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <Link
                to="/services"
                className="px-8 py-4 rounded-xl glass-panel border border-white/20 text-white hover:border-gold font-bold text-sm tracking-wider uppercase hover:bg-white/5 transition flex items-center gap-2"
              >
                <Wrench className="w-4 h-4 text-gold" />
                <span>BOOK GARAGE BAY</span>
              </Link>
            </div>
          </div>

          {/* Quick Floating Stat Widget */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-6 rounded-3xl border border-gold/30 shadow-2xl space-y-6 bg-gradient-to-b from-navy-dark/90 to-charcoal/90">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-lg font-bold font-display text-white">4K Media Vault</h4>
                  <p className="text-xs text-gold">High-Res Log Archive</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Photo Projects:</span>
                  <span className="font-bold text-gold font-mono">1,200+ Documented</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gold h-full w-[98%]" />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Image Quality:</span>
                  <span className="font-bold text-emerald-400 font-mono">Ultra-HD Uncompressed</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Categories:</span>
                  <span className="font-bold text-white font-mono">Supercars, Paint, Tuning</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Gallery Section */}
      <div id="gallery-grid" className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-gold-gradient text-navy-dark shadow-gold'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className="group relative h-80 rounded-3xl overflow-hidden glass-panel border border-white/10 cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/30 to-transparent opacity-80 group-hover:opacity-90 transition" />
              
              <div className="absolute top-4 right-4 p-2.5 rounded-full bg-navy-dark/80 backdrop-blur-md text-gold opacity-0 group-hover:opacity-100 transition duration-300">
                <Maximize2 className="w-4 h-4" />
              </div>

              <div className="absolute bottom-6 left-6 right-6 space-y-2">
                <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-[10px] uppercase font-bold tracking-widest border border-gold/30">
                  {item.tag}
                </span>
                <h3 className="text-lg font-bold font-display text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl w-full glass-panel rounded-3xl overflow-hidden border border-gold/40 shadow-2xl p-4 bg-navy-dark/95">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={lightboxImage.image}
              alt={lightboxImage.title}
              className="w-full max-h-[75vh] object-contain rounded-2xl"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold font-display text-white">{lightboxImage.title}</h3>
              <p className="text-xs text-gold uppercase tracking-widest mt-1">{lightboxImage.category} • {lightboxImage.tag}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
