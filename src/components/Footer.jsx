import { Link } from 'react-router-dom';
import { PhoneCall, Mail, MapPin, ShieldCheck, Instagram, Facebook, Youtube, Twitter, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05070D] text-white pt-16 pb-12 relative overflow-hidden">
      {/* Ambient Radial Background Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Top Emergency Hotline Banner */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 mb-16 border border-gold/30 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-navy-dark via-charcoal to-navy-dark shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold border border-gold/40">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-display text-white">24/7 Rapid Roadside Assistance</h3>
              <p className="text-xs text-slate-400">Flatbed towing, battery jumpstart & mobile super mechanic dispatch.</p>
            </div>
          </div>
          <a
            href="tel:0703735156"
            className="px-6 py-3.5 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-sm tracking-wider uppercase shadow-gold hover:shadow-gold-lg transition flex items-center gap-2 whitespace-nowrap"
          >
            <span>CALL 0703735156</span>
          </a>
        </div>

        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gold-gradient p-[1px]">
                <div className="w-full h-full rounded-[7px] bg-navy-dark flex items-center justify-center font-black font-display text-gold text-sm">
                  AE
                </div>
              </div>
              <span className="text-xl font-black tracking-[0.2em] text-white font-display uppercase">
                AUTO <span className="text-gold-shine">ELITE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sri Lanka's premier luxury vehicle service station & garage. OEM master technicians, 3D laser diagnostics, and Italian bake oven painting for high-performance automobiles.
            </p>
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy-dark transition"><Instagram className="w-4 h-4" /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy-dark transition"><Facebook className="w-4 h-4" /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy-dark transition"><Youtube className="w-4 h-4" /></a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-gold hover:text-navy-dark transition"><Twitter className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold font-display uppercase tracking-wider text-gold mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/services" className="hover:text-gold transition">All 12 Service Programs</Link></li>
              <li><Link to="/inspection" className="hover:text-gold transition">150-Point Digital Inspection</Link></li>
              <li><Link to="/packages" className="hover:text-gold transition">Maintenance Package Tiers</Link></li>
              <li><Link to="/services" className="hover:text-gold transition">Service Programs Catalog</Link></li>
              <li><Link to="/gallery" className="hover:text-gold transition">Supercar Gallery</Link></li>
              <li><Link to="/pricing" className="hover:text-gold transition">Transparent Pricing Calculator</Link></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-sm font-bold font-display uppercase tracking-wider text-gold mb-4">Specialized Services</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/services" className="hover:text-gold transition">Engine ECU Tuning & Calibration</Link></li>
              <li><Link to="/services" className="hover:text-gold transition">3D Laser Wheel Alignment</Link></li>
              <li><Link to="/services" className="hover:text-gold transition">Brembo Ceramic Brake Overhaul</Link></li>
              <li><Link to="/services" className="hover:text-gold transition">9H Nano Ceramic Paint Shield</Link></li>
              <li><Link to="/services" className="hover:text-gold transition">Italian Bake Oven Custom Paint</Link></li>
              <li><Link to="/services" className="hover:text-gold transition">Swissvax Interior Steam Detail</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold font-display uppercase tracking-wider text-gold mb-2">Sri Lanka Concierge</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>100 Apex Boulevard, Cinnamon Gardens, Colombo 07, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <span>sandunbandara978@gmail.com</span>
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                Join VIP Club
              </label>
              <div className="flex items-center rounded-xl bg-navy-dark border border-white/10 p-1">
                <input
                  type="email"
                  placeholder="Enter email..."
                  className="w-full px-3 py-2 bg-transparent text-xs text-white outline-none placeholder:text-slate-500"
                />
                <button className="p-2 rounded-lg bg-gold text-navy-dark hover:bg-gold-hover transition">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Certifications */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>© 2026 AUTO ELITE Automotive Group. All Rights Reserved.</span>
          </div>
          <div className="flex gap-6 text-slate-400">
            <Link to="/privacy" className="hover:text-gold transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold transition">Terms of Service</Link>
            <Link to="/admin-dashboard" className="hover:text-gold transition">Portal Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
