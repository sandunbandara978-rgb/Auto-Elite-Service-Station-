import { useState } from 'react';
import { ShieldCheck, CheckCircle2, FileCheck, Search, ChevronRight, Sparkles, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const inspectionCategories = [
  {
    title: 'Powertrain & Engine Bay',
    items: ['Turbocharger Impeller Play & Oil Leak Check', 'ECU Fault Telemetry Scan & Fuel Trim Test', 'Ignition Coil Resistance & Spark Wear', 'Coolant Pressure & Radiator Hose Integrity']
  },
  {
    title: 'Chassis, Suspension & Brakes',
    items: ['Brembo Ceramic Rotor Thickness Gauge Scan', 'Hunter 3D Suspension Geometry Audit', 'Brake Line Hydraulic Pressure Bleed Audit', 'Bushing & Control Arm Wear Scan']
  },
  {
    title: 'Body, Paint & Aerodynamics',
    items: ['Paint Thickness Depth Gauge Audit (Accident Scan)', 'Windshield Hydrophobic & Chip Inspection', 'Under-Carriage Carbon Diffuser Clearance', 'Active Aero Spoiler Servo Motor Check']
  },
  {
    title: 'Electrical & Comfort Systems',
    items: ['AGM Battery Cold Crank Voltage Load Test', 'Climate Control Refrigerant & Ozone Sanitization', 'Infotainment Telemetry & CAN-Bus Loop Scan', 'Driver Assistance & Lane Sensor Calibration']
  }
];

export default function InspectionPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-16 pb-20">
      
      {/* MCLAREN SUPERCAR HERO SECTION (MATCHING HOME PAGE HERO FORMAT) */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 overflow-hidden">
        {/* McLaren 720S Supercar Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=2000&q=85"
            alt="McLaren Supercar Inspection AUTO ELITE"
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
              <span>OEM Certified Digital Laser Inspection Protocol</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-white tracking-tight uppercase leading-[1.08]">
              150-POINT DIGITAL <br />
              <span className="text-gold-shine">LASER INSPECTION</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-body leading-relaxed">
              The industry benchmark for pre-purchase evaluation, warranty validation, paint thickness depth scanning, and luxury car health audits.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-sm tracking-wider uppercase shadow-gold-lg hover:scale-105 transition-all flex items-center gap-3 cursor-pointer"
              >
                <FileCheck className="w-5 h-5" />
                <span>BOOK LKR 38,000 AUDIT</span>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <a
                href="#inspection-scope"
                className="px-8 py-4 rounded-xl glass-panel border border-white/20 text-white hover:border-gold font-bold text-sm tracking-wider uppercase hover:bg-white/5 transition flex items-center gap-2"
              >
                <span>SIMULATE 150-POINT CHECK</span>
              </a>
            </div>
          </div>

          {/* Quick Floating Stat Widget */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-6 rounded-3xl border border-gold/30 shadow-2xl space-y-6 bg-gradient-to-b from-navy-dark/90 to-charcoal/90">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h4 className="text-lg font-bold font-display text-white">Diagnostic Scanner</h4>
                  <p className="text-xs text-gold">Hunter 3D Telemetry</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Inspection Checkpoints:</span>
                  <span className="font-bold text-gold font-mono">150 Total Points</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gold h-full w-[100%]" />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Report Output:</span>
                  <span className="font-bold text-emerald-400 font-mono">Digital PDF + HD Video</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Accident Paint Scan:</span>
                  <span className="font-bold text-white font-mono">Depth Gauge Active</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Inspection Simulator Section */}
      <div id="inspection-scope" className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
        <div className="glass-panel rounded-3xl border border-gold/30 p-6 sm:p-10 bg-navy-dark/90 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 gap-4">
            <div>
              <h3 className="text-2xl font-bold font-display text-white">Live Inspection Checklist Simulator</h3>
              <p className="text-xs text-gold">Interactive 150-Point Scope Preview</p>
            </div>
            <Link
              to="/book"
              className="px-6 py-3 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider shadow-gold hover:shadow-gold-lg transition flex items-center justify-center gap-2"
            >
              <FileCheck className="w-4 h-4" />
              <span>BOOK LKR 38,000 INSPECTION</span>
            </Link>
          </div>

          {/* Tab Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {inspectionCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`p-4 rounded-2xl text-xs font-bold uppercase transition text-left border cursor-pointer ${
                  activeTab === idx
                    ? 'bg-gold-gradient text-navy-dark border-gold shadow-gold'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:border-gold/40 hover:text-white'
                }`}
              >
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h4 className="text-sm font-bold text-gold uppercase tracking-wider">
              {inspectionCategories[activeTab].title} Scope Items:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inspectionCategories[activeTab].items.map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-charcoal border border-white/5">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
                  <span className="text-xs text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
