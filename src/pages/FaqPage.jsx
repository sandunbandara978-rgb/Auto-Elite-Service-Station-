import { useState } from 'react';
import { autoEliteFaqs } from '../data/autoEliteData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-gold">Frequently Asked Questions</span>
        <h1 className="text-4xl sm:text-6xl font-black font-display text-white uppercase tracking-tight">
          GARAGE <span className="text-gold-shine">FAQS</span>
        </h1>
        <p className="text-sm text-slate-300">
          Everything you need to know about our warranties, concierge pickups, master technicians, and service programs.
        </p>
      </div>

      <div className="space-y-4">
        {autoEliteFaqs.map((faq, idx) => (
          <div
            key={idx}
            className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition bg-navy-dark/80"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-white hover:text-gold transition cursor-pointer"
            >
              <span className="flex items-center gap-3 text-sm font-display">
                <HelpCircle className="w-5 h-5 text-gold shrink-0" />
                {faq.q}
              </span>
              <ChevronDown className={`w-5 h-5 text-gold transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-6 text-xs text-slate-300 border-t border-white/5 pt-4 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
