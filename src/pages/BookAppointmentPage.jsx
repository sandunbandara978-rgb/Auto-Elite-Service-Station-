import { useState, useEffect } from 'react';
import { autoEliteServices, autoEliteMechanics, vehicleModelsByBrand } from '../data/autoEliteData';
import { addSystemBooking } from '../data/bookingStore';
import { getLoggedInCustomer } from '../data/customerAuth';
import CustomerAuthModal from '../components/CustomerAuthModal';
import { CheckCircle2, ChevronRight, ChevronLeft, ShieldCheck, Star, Sparkles, Wrench } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function BookAppointmentPage() {
  const [customer, setCustomer] = useState(getLoggedInCustomer);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const [step, setStep] = useState(1);
  const [customerName, setCustomerName] = useState(() => customer?.name || 'Sahan Jayawardena');
  const [customerPhone, setCustomerPhone] = useState(() => customer?.phone || '+94 77 999 8888');
  const [vehicleMake, setVehicleMake] = useState('Porsche');
  const [vehicleModel, setVehicleModel] = useState('911 GT3 RS (2024)');
  const [licensePlate, setLicensePlate] = useState('WP CAD-911');
  const [selectedServiceId, setSelectedServiceId] = useState(autoEliteServices[0].id);
  const [date, setDate] = useState('2026-07-28');
  const [time, setTime] = useState('10:00 AM');
  const [selectedMechanicId, setSelectedMechanicId] = useState(autoEliteMechanics[0].id);
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const active = getLoggedInCustomer();
    if (active) {
      setCustomer(active);
      setCustomerName(active.name);
      setCustomerPhone(active.phone);
    }
  }, []);

  const handleMakeChange = (newMake) => {
    setVehicleMake(newMake);
    const availableModels = vehicleModelsByBrand[newMake] || vehicleModelsByBrand['Porsche'];
    setVehicleModel(availableModels[0]);
  };

  const service = autoEliteServices.find((s) => s.id === selectedServiceId) || autoEliteServices[0];
  const mechanic = autoEliteMechanics.find((m) => m.id === selectedMechanicId) || autoEliteMechanics[0];

  const availableModelsList = vehicleModelsByBrand[vehicleMake] || vehicleModelsByBrand['Porsche'];

  const handleFinish = (e) => {
    if (e) e.preventDefault();
    
    let activeCustomer = getLoggedInCustomer();
    
    // Auto-create active customer session using entered inputs if not already signed in
    if (!activeCustomer) {
      const guestUser = {
        id: 'cust_' + Date.now(),
        name: customerName.trim() || 'Valued Customer',
        phone: customerPhone.trim() || '+94 77 123 4567',
        email: `${(customerName.trim() || 'customer').toLowerCase().replace(/\s+/g, '')}@autoelite.lk`,
        vehicle: `${vehicleMake} ${vehicleModel}`
      };
      sessionStorage.setItem('auto_elite_current_customer', JSON.stringify(guestUser));
      window.dispatchEvent(new CustomEvent('auto_elite_auth_change', { detail: guestUser }));
      activeCustomer = guestUser;
      setCustomer(guestUser);
    }

    // Dispatch exact customer input details to system store & admin console
    addSystemBooking({
      customer: customerName.trim() || activeCustomer.name,
      phone: customerPhone.trim() || activeCustomer.phone,
      vehicle: `${vehicleMake} ${vehicleModel}` + (licensePlate ? ` [${licensePlate}]` : ''),
      service: service.name,
      date: date,
      time: time,
      mechanic: mechanic.name,
      price: service.price,
      rawPrice: service.rawPrice,
      notes: notes || 'Standard reservation request',
      type: 'booking'
    });

    setConfirmed(true);
    setTimeout(() => {
      navigate('/customer-dashboard');
    }, 2500);
  };

  return (
    <>
      <CustomerAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        message="Please create a user account or sign in to complete your vehicle service reservation."
        onSuccess={(user) => {
          setCustomer(user);
          setCustomerName(user.name);
          setCustomerPhone(user.phone);
        }}
      />

      {/* PORSCHE 911 GT3 RS SUPERCAR HERO SECTION (MATCHING HOME PAGE HERO FORMAT) */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 overflow-hidden">
        {/* Porsche 911 GT3 RS Supercar Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=85"
            alt="Porsche 911 GT3 RS Supercar AUTO ELITE"
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
              <span>4-Step Master Reservation Protocol</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display text-white tracking-tight uppercase leading-[1.08]">
              RESERVE YOUR <br />
              <span className="text-gold-shine">SERVICE BAY NOW</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-body leading-relaxed">
              Lock in your OEM master technician and climate-controlled service bay in Sri Lanka with instant real-time telemetry tracking.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <a
                href="#booking-wizard"
                className="px-8 py-4 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-sm tracking-wider uppercase shadow-gold-lg hover:scale-105 transition-all flex items-center gap-3 cursor-pointer"
              >
                <Wrench className="w-5 h-5" />
                <span>START WIZARD BELOW</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <Link
                to="/services"
                className="px-8 py-4 rounded-xl glass-panel border border-white/20 text-white hover:border-gold font-bold text-sm tracking-wider uppercase hover:bg-white/5 transition flex items-center gap-2"
              >
                <span>EXPLORE PROGRAMS</span>
              </Link>
            </div>
          </div>

          {/* Quick Floating Stat Widget */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-6 rounded-3xl border border-gold/30 shadow-2xl space-y-4 bg-gradient-to-b from-navy-dark/90 to-charcoal/90">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h4 className="text-base font-bold font-display text-white">Live Bay Telemetry</h4>
                  <p className="text-[11px] text-gold">Colombo 07 Station</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              </div>

              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Available Bays:</span>
                  <span className="font-bold text-gold font-mono">14 Operational</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gold h-full w-[88%]" />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Master Mechanics:</span>
                  <span className="font-bold text-emerald-400 font-mono">4 On Duty</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Booking Wizard Section */}
      <div id="booking-wizard" className="mx-auto max-w-4xl px-6 lg:px-8 py-10 space-y-10">

        {/* Wizard Progress Bar */}
        <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center justify-between">
          {[
            { num: 1, label: 'Owner & Vehicle Specs' },
            { num: 2, label: 'Program Select' },
            { num: 3, label: 'Schedule & Engineer' },
            { num: 4, label: 'Confirmation' },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  step >= s.num
                    ? 'bg-gold text-navy-dark shadow-gold font-mono'
                    : 'bg-white/5 text-slate-500 border border-white/10'
                }`}
              >
                {s.num}
              </div>
              <span className={`hidden sm:inline text-xs font-semibold uppercase tracking-wider ${step >= s.num ? 'text-white' : 'text-slate-500'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Main Wizard Form Container */}
        <div className="glass-panel rounded-3xl border border-gold/30 p-6 sm:p-10 bg-navy-dark/90 shadow-2xl space-y-8">
          
          {confirmed ? (
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center text-gold border border-gold/40">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-bold font-display text-white">RESERVATION TRANSMITTED!</h2>
              <p className="text-xs text-slate-300 max-w-md">
                Booking for <strong className="text-white font-bold">{customerName}</strong> has been logged in the Admin Console. Redirecting to your Customer Dashboard...
              </p>
            </div>
          ) : (
            <>
              {/* STEP 1: CUSTOMER & VEHICLE DETAILS */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold font-display text-white border-b border-white/10 pb-3">
                    Step 1: Owner & Vehicle Specifications
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        Customer Full Name
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        placeholder="e.g. Sahan Jayawardena"
                        className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/10 text-sm text-white focus:border-gold outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        Phone Number (Sri Lanka)
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                        placeholder="e.g. +94 77 999 8888"
                        className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/10 text-sm text-white focus:border-gold outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        Automobile Brand
                      </label>
                      <select
                        value={vehicleMake}
                        onChange={(e) => handleMakeChange(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/10 text-sm text-white focus:border-gold outline-none"
                      >
                        <option value="Porsche">Porsche</option>
                        <option value="BMW">BMW</option>
                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                        <option value="Audi">Audi</option>
                        <option value="Lamborghini">Lamborghini</option>
                        <option value="Ferrari">Ferrari</option>
                        <option value="Range Rover">Range Rover</option>
                        <option value="Tesla">Tesla EV</option>
                        <option value="Other Luxury / EV">Other Luxury / EV</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        Specific Model & Year (Auto-Updated)
                      </label>
                      <select
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-charcoal border border-gold/40 text-sm text-gold font-bold focus:border-gold outline-none shadow-gold"
                      >
                        {availableModelsList.map((modelItem) => (
                          <option key={modelItem} value={modelItem} className="bg-navy-dark text-white font-normal">
                            {modelItem}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        License Plate (Sri Lanka Format)
                      </label>
                      <input
                        type="text"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        placeholder="e.g. WP CAD-911"
                        className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/10 text-sm text-white focus:border-gold outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: SERVICE SELECTION */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold font-display text-white border-b border-white/10 pb-3">
                    Step 2: Select Service Program
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {autoEliteServices.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => setSelectedServiceId(s.id)}
                        className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                          selectedServiceId === s.id
                            ? 'border-gold bg-gold/10 shadow-gold'
                            : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        <div>
                          <p className="text-sm font-bold text-white">{s.name}</p>
                          <p className="text-[11px] text-slate-400 mt-1">{s.duration} • {s.warranty}</p>
                        </div>
                        <span className="text-base font-black text-gold font-mono">{s.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: SCHEDULE & MECHANIC */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold font-display text-white border-b border-white/10 pb-3">
                    Step 3: Schedule & Master Technician
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/10 text-sm text-white focus:border-gold outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                        Time Slot
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/10 text-sm text-white focus:border-gold outline-none"
                      >
                        <option value="09:00 AM">09:00 AM (Morning Slot)</option>
                        <option value="11:30 AM">11:30 AM (Midday Slot)</option>
                        <option value="02:00 PM">02:00 PM (Afternoon Slot)</option>
                        <option value="04:30 PM">04:30 PM (Evening Slot)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
                      Choose Master Mechanic / Engineer
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {autoEliteMechanics.map((m) => (
                        <div
                          key={m.id}
                          onClick={() => setSelectedMechanicId(m.id)}
                          className={`p-4 rounded-2xl border transition cursor-pointer flex items-center gap-3 ${
                            selectedMechanicId === m.id
                              ? 'border-gold bg-gold/10 shadow-gold'
                              : 'border-white/10 bg-white/5 hover:border-white/30'
                          }`}
                        >
                          <img src={m.avatar} alt={m.name} className="w-12 h-12 rounded-full object-cover border border-gold/30" />
                          <div>
                            <p className="text-xs font-bold text-white">{m.name}</p>
                            <p className="text-[10px] text-gold font-semibold uppercase">{m.role}</p>
                            <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                              <Star className="w-3 h-3 text-gold fill-gold" /> {m.rating} ({m.experience})
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2">
                      Special Instructions or Requests
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Please check right front brake squeal above 60km/h..."
                      className="w-full px-4 py-3 rounded-xl bg-charcoal border border-white/10 text-sm text-white focus:border-gold outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: CONFIRMATION SUMMARY */}
              {step === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold font-display text-white border-b border-white/10 pb-3">
                    Step 4: Reservation Summary
                  </h3>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 text-xs">
                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-slate-400 uppercase">Customer Name & Phone</span>
                      <span className="font-bold text-white">{customerName} ({customerPhone})</span>
                    </div>

                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-slate-400 uppercase">Selected Vehicle</span>
                      <span className="font-bold text-white font-mono">{vehicleMake} {vehicleModel}</span>
                    </div>

                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-slate-400 uppercase">Selected Service</span>
                      <span className="font-bold text-gold font-mono">{service.name} ({service.price})</span>
                    </div>

                    <div className="flex justify-between items-center pb-3 border-b border-white/10">
                      <span className="text-slate-400 uppercase">Date & Time</span>
                      <span className="font-bold text-white font-mono">{date} at {time}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 uppercase">Assigned Engineer</span>
                      <span className="font-bold text-white font-mono">{mechanic.name} ({mechanic.role})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Submitting will transmit real-time telemetry details directly to the Admin Dashboard.</span>
                  </div>
                </div>
              )}

              {/* NAVIGATION BUTTONS */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="px-8 py-3.5 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider shadow-gold hover:shadow-gold-lg transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue Step {step + 1}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinish}
                    className="px-8 py-3.5 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs uppercase tracking-wider shadow-gold-lg hover:scale-105 transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>CONFIRM RESERVATION</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
