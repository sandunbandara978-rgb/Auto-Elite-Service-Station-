import { autoEliteTestimonials } from '../data/autoEliteData';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-gold">5-Star Verified Reviews</span>
        <h1 className="text-4xl sm:text-6xl font-black font-display text-white uppercase tracking-tight">
          CLIENT <span className="text-gold-shine">TESTIMONIALS</span>
        </h1>
        <p className="text-sm text-slate-300">
          Read unfiltered feedback from luxury car collectors, supercar owners, and executive fleet managers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {autoEliteTestimonials.map((t) => (
          <div key={t.id} className="glass-panel p-8 rounded-3xl border border-gold/20 space-y-6 flex flex-col justify-between glass-panel-hover">
            <div className="space-y-4">
              <Quote className="w-8 h-8 text-gold/40" />
              <div className="flex text-gold gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold" />
                ))}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed italic">"{t.comment}"</p>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <img src={t.image} alt={t.author} className="w-12 h-12 rounded-full object-cover border border-gold/40" />
              <div>
                <p className="text-sm font-bold text-white">{t.author}</p>
                <p className="text-xs text-gold">{t.role}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{t.service} • {t.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
