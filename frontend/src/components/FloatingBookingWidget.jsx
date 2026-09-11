import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { autoEliteServices } from '../data/autoEliteData';
import { addSystemBooking } from '../data/bookingStore';
import { getLoggedInCustomer } from '../data/customerAuth';
import CustomerAuthModal from './CustomerAuthModal';

export default function FloatingBookingWidget() {
  const [open, setOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const [selectedService, setSelectedService] = useState(autoEliteServices[0].id);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [date, setDate] = useState('2026-07-28');
  const [time, setTime] = useState('10:00 AM');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let activeCustomer = getLoggedInCustomer();
    if (!activeCustomer) {
      setAuthModalOpen(true);
      return;
    }

    const serviceObj = autoEliteServices.find(s => s.id === selectedService) || autoEliteServices[0];
    
    // Notify admin console & log exact customer inputs
    addSystemBooking({
      customer: customerName.trim() || activeCustomer.name,
      phone: customerPhone.trim() || activeCustomer.phone,
      vehicle: vehicle.trim() || activeCustomer.vehicle || 'Porsche 911 GT3 RS',
      service: serviceObj.name,
      date: date,
      time: time,
      mechanic: 'Marcus Vance',
      price: serviceObj.price,
      rawPrice: serviceObj.rawPrice,
      notes: 'Submitted via Express Floating Widget',
      type: 'booking'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
      navigate('/customer-dashboard');
    }, 2000);
  };

  return (
    <>
      <CustomerAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        message="Please create a user account or sign in to reserve this service."
        onSuccess={(user) => {
          setCustomerName(user.name);
          setCustomerPhone(user.phone);
        }}
      />

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-3.5 rounded-full bg-gold-gradient text-navy-dark font-bold text-sm shadow-gold-lg border border-white/20 transition-all cursor-pointer group"
      >
        <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline tracking-wide font-display">BOOK SERVICE</span>
        <span className="w-2 h-2 rounded-full bg-navy-dark animate-ping" />
      </motion.button>

      {/* Booking Quick Modal */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative max-w-md w-full glass-panel rounded-2xl border border-gold/30 p-6 sm:p-8 shadow-2xl text-white overflow-hidden bg-navy-dark/95"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold font-display text-white">Instant Booking</h3>
                  <p className="text-xs text-gold">AUTO ELITE Express Reserve</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center text-gold mb-4"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-white mb-2">Reservation Transmitted!</h4>
                  <p className="text-sm text-slate-300">
                    Your appointment has been sent real-time to the Admin Console. Redirecting...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      required
                      placeholder="e.g. Sahan Jayawardena"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal border border-white/10 text-white outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                      Phone Number (Sri Lanka)
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      required
                      placeholder="e.g. +94 77 999 8888"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal border border-white/10 text-white outline-none focus:border-gold"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                      Select Service
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal border border-white/10 text-white outline-none focus:border-gold"
                    >
                      {autoEliteServices.map((s) => (
                        <option key={s.id} value={s.id} className="bg-navy-dark">
                          {s.name} - {s.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                        Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-charcoal border border-white/10 text-white outline-none focus:border-gold"
                      />
                    </div>
                    <div>
                      <label className="block uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                        Time
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-charcoal border border-white/10 text-white outline-none focus:border-gold"
                      >
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="01:30 PM">01:30 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
                      Vehicle Make & Model
                    </label>
                    <input
                      type="text"
                      value={vehicle}
                      onChange={(e) => setVehicle(e.target.value)}
                      placeholder="e.g. Porsche 911 GT3 / BMW M8"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-charcoal border border-white/10 text-white outline-none focus:border-gold placeholder:text-slate-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gold-gradient text-navy-dark font-extrabold text-xs tracking-wider uppercase hover:shadow-gold transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>TRANSMIT REAL-TIME BOOKING</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
