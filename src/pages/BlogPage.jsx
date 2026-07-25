import { useState } from 'react';
import { autoEliteBlogs } from '../data/autoEliteData';
import { Calendar, User, ArrowRight, X } from 'lucide-react';

export default function BlogPage() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-gold">Automotive Engineering Journal</span>
        <h1 className="text-4xl sm:text-6xl font-black font-display text-white uppercase tracking-tight">
          AUTOMOTIVE <span className="text-gold-shine">INSIGHTS</span>
        </h1>
        <p className="text-sm text-slate-300">
          Technical guides, nanotech detailing advice, and engine maintenance articles written by master technicians.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {autoEliteBlogs.map((b) => (
          <div key={b.id} className="glass-panel rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between glass-panel-hover">
            <div className="relative h-56 overflow-hidden">
              <img src={b.image} alt={b.title} className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition duration-500" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-bold text-gold border border-gold/30 uppercase">
                {b.category}
              </span>
            </div>

            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-gold" /> {b.date}</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-gold" /> {b.author}</span>
                </div>
                <h3 className="text-lg font-bold font-display text-white leading-snug">{b.title}</h3>
                <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">{b.snippet}</p>
              </div>

              <button
                onClick={() => setSelectedArticle(b)}
                className="w-full py-3 rounded-xl border border-white/10 hover:border-gold hover:bg-gold hover:text-navy-dark text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative max-w-2xl w-full glass-panel rounded-3xl border border-gold/30 p-6 sm:p-8 text-white space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold text-gold uppercase tracking-widest">{selectedArticle.category}</span>
                <h3 className="text-xl font-bold font-display text-white">{selectedArticle.title}</h3>
              </div>
              <button onClick={() => setSelectedArticle(null)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-64 object-cover rounded-2xl" />
            <p className="text-xs text-slate-300 leading-relaxed">{selectedArticle.snippet}</p>
            <p className="text-xs text-slate-300 leading-relaxed">
              At AUTO ELITE, our commitment to technical precision means every fluid specification, bolt torque sequence, and nanotech polymer coating is verified against OEM factory standards.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
