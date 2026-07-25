import { useState } from 'react';
import { MapPin, PhoneCall, Mail, Clock, Send, CheckCircle2, ShieldCheck, Sparkles, ChevronRight, Wrench } from 'lucide-react';
import { addSystemBooking } from '../data/bookingStore';
import { Link } from 'react-router-dom';

export default function ContactPage() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const RECIPIENT_EMAIL = 'sandunbandara978@gmail.com';

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct mailto URL to directly dispatch email to sandunbandara978@gmail.com
    const subject = encodeURIComponent(`AUTO ELITE Concierge Inquiry from ${fullName || 'Customer'}`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nPhone: ${phone}\nEmail: ${email}\n\nInquiry Message:\n${message}`
    );
    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${subject}&body=${body}`;

    // Open default mail client or transmit
    window.location.href = mailtoUrl;

    // Log to Admin Console real-time notifications
    addSystemBooking({
      customer: fullName || 'Inquiry Client',
      phone: phone || '+94 77 000 0000',
      vehicle: 'Concierge Inquiry',
      service: `Concierge Message -> ${RECIPIENT_EMAIL}`,
      date: new Date().toISOString().split('T')[0],
      time: 'Now',
      mechanic: 'Concierge Team',
      price: 'Inquiry',
      rawPrice: 0,
      notes: `Sent to: ${RECIPIENT_EMAIL} | Message: ${message}`,
      type: 'inquiry'
    });

    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20">
      
      {/* MERCEDES-AMG GT SUPERCAR HERO SECTION (MATCHING HOME PAGE HERO FORMAT) */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 overflow-hidden">
        {/* AMG GT Black Series Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2000&q=85"
            alt="Mercedes-AMG GT Supercar AUTO ELITE"
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
              <span>24/7 Executive Concierge & Dispatch</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-white tracking-tight uppercase leading-[1.08]">
              GET IN TOUCH <br />
              <span className="text-gold-shine">GRAND STATION CONCIERGE</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-body leading-relaxed">
              Visit our flagship Grand Station facility in Colombo 07 or reach our 24/7 concierge assistance hotline for emergency dispatch and custom quotes.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <a
                href="#concierge-form"
                className="px-8 py-4 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-sm tracking-wider uppercase shadow-gold-lg hover:scale-105 transition-all flex items-center gap-3 cursor-pointer"
              >
                <Mail className="w-5 h-5" />
                <span>SEND CONCIERGE MESSAGE</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="tel:+94112553548"
                className="px-8 py-4 rounded-xl glass-panel border border-white/20 text-white hover:border-gold font-bold text-sm tracking-wider uppercase hover:bg-white/5 transition flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-gold" />
                <span>CALL +94 11 255 3548</span>
              </a>
            </div>
          </div>

          {/* Quick Floating Stat Widget */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-6 rounded-3xl border border-gold/30 shadow-2xl space-y-6 bg-gradient-to-b from-navy-dark/90 to-charcoal/90">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-lg font-bold font-display text-white">Concierge Desk</h4>
                  <p className="text-xs text-gold">24/7 Live Telemetry</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Direct Recipient:</span>
                  <span className="font-bold text-gold font-mono text-[11px] truncate max-w-[170px]">sandunbandara978@gmail.com</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gold h-full w-[100%]" />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Dispatch Arrival:</span>
                  <span className="font-bold text-emerald-400 font-mono">15-20 Mins Islandwide</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Station Address:</span>
                  <span className="font-bold text-white font-mono">Colombo 07 Station</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Form & Map Grid */}
      <div id="concierge-form" className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-7 glass-panel p-8 sm:p-12 rounded-3xl border border-gold/30 space-y-6 bg-navy-dark/90 shadow-2xl">
            <div className="space-y-2 border-b border-white/10 pb-4">
              <span className="text-xs font-bold text-gold uppercase tracking-widest">Direct Email Dispatch</span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white uppercase">Send Concierge Message</h2>
              <p className="text-xs text-slate-400">
                Inquiries sent here are dispatched directly to <strong className="text-gold font-mono">{RECIPIENT_EMAIL}</strong> and flagged in the Admin Console.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Message Dispatched!</h3>
                <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                  Your message was formatted and sent to <strong className="text-gold font-mono">{RECIPIENT_EMAIL}</strong>. Our executive concierge team will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold uppercase tracking-wider">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dinesh Perera"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/10 text-white focus:border-gold outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold uppercase tracking-wider">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+94 77 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/10 text-white focus:border-gold outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="dinesh@luxurycar.lk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/10 text-white focus:border-gold outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold uppercase tracking-wider">Inquiry Message *</label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Describe your requested service, vehicle model, or custom requirement..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/10 text-white focus:border-gold outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider shadow-gold hover:scale-[1.01] transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to {RECIPIENT_EMAIL}</span>
                </button>
              </form>
            )}
          </div>

          {/* Location & Station Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 bg-navy-dark/90 shadow-xl">
              <h3 className="text-xl font-bold font-display text-white">Grand Station Details</h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Grand Station Location</strong>
                    <p className="text-slate-300">100 Apex Boulevard, Cinnamon Gardens, Colombo 07, Sri Lanka</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <PhoneCall className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">24/7 Hotline & Dispatch</strong>
                    <p className="text-slate-300">+94 11 255 3548 / +94 77 911 0000</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Recipient Email Inbox</strong>
                    <p className="text-gold font-mono font-bold">sandunbandara978@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Operational Hours</strong>
                    <p className="text-slate-300">Mon - Sat: 7:30 AM - 8:30 PM</p>
                    <p className="text-slate-400">Sunday: Emergency Bay Service Only</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder Graphic Card */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-3 bg-navy-dark/90 text-center">
              <span className="text-[10px] font-bold text-gold uppercase tracking-widest">GPS Navigation</span>
              <p className="text-xs text-white font-semibold">Cinnamon Gardens Colombo Station Map</p>
              <div className="w-full h-36 rounded-2xl bg-charcoal border border-white/10 flex items-center justify-center text-slate-500 font-mono text-xs">
                [ 📍 GPS: 6.9061° N, 79.8708° E - Colombo 07 ]
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
