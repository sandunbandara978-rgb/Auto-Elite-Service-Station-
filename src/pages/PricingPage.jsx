import { useState } from 'react';
import { autoEliteServices } from '../data/autoEliteData';
import { ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PricingPage() {
  const [selectedServices, setSelectedServices] = useState([autoEliteServices[0].id, autoEliteServices[2].id]);

  const toggleService = (id) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((s) => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const totalPrice = selectedServices.reduce((sum, id) => {
    const s = autoEliteServices.find((item) => item.id === id);
    return sum + (s ? s.rawPrice : 0);
  }, 0);

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-gold">Zero Hidden Fees</span>
        <h1 className="text-4xl sm:text-6xl font-black font-display text-white uppercase tracking-tight">
          TRANSPARENT <span className="text-gold-shine">PRICING</span>
        </h1>
        <p className="text-sm text-slate-300">
          Clear, upfront pricing with certified 1-year warranties and OEM factory parts guaranteed.
        </p>
      </div>

      {/* Interactive Custom Cart Builder */}
      <div className="glass-panel p-8 rounded-3xl border border-gold/30 bg-navy-dark/90 shadow-2xl space-y-8">
        <div className="border-b border-white/10 pb-4">
          <h3 className="text-2xl font-bold font-display text-white">Custom Service Bundle Calculator</h3>
          <p className="text-xs text-gold">Check multiple service programs to see combined total pricing.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {autoEliteServices.map((s) => {
            const isChecked = selectedServices.includes(s.id);
            return (
              <div
                key={s.id}
                onClick={() => toggleService(s.id)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                  isChecked
                    ? 'border-gold bg-gold/10 shadow-gold'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${isChecked ? 'bg-gold border-gold text-navy-dark' : 'border-white/30'}`}>
                    {isChecked && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">{s.name}</p>
                    <p className="text-[10px] text-slate-400">{s.category}</p>
                  </div>
                </div>
                <span className="text-sm font-black font-mono text-gold">{s.price}</span>
              </div>
            );
          })}
        </div>

        {/* Total Cost Bar */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-navy-dark via-charcoal to-navy-dark border border-gold/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-slate-400">Total Selected ({selectedServices.length} Services)</p>
            <p className="text-3xl font-black text-gold font-mono">${totalPrice.toLocaleString()}</p>
          </div>

          <Link
            to="/book"
            className="px-8 py-4 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider shadow-gold hover:shadow-gold-lg transition flex items-center gap-2"
          >
            <span>RESERVE THIS BUNDLE</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
