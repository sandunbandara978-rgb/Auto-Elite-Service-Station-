import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Shield, UserCheck, PhoneCall, RotateCcw, ChevronDown, User, LogOut } from 'lucide-react';
import { getLoggedInCustomer, logoutCustomer } from '../data/customerAuth';
import CustomerAuthModal from './CustomerAuthModal';

const mainNavs = [
  { name: 'Home', to: '/' },
  { name: 'Services', to: '/services' },
  { name: 'Inspection', to: '/inspection' },
  { name: 'Packages', to: '/packages' },
  { name: 'Emergency 24/7', to: '/emergency', highlight: true },
  { name: 'Book', to: '/book' },
  { name: 'Gallery', to: '/gallery' },
];

const secondaryNavs = [
  { name: 'About', to: '/about' },
  { name: 'Pricing', to: '/pricing' },
  { name: 'Our Team', to: '/team' },
  { name: 'Testimonials', to: '/testimonials' },
  { name: 'Blog', to: '/blog' },
  { name: 'FAQ', to: '/faq' },
  { name: 'Contact', to: '/contact' },
];

export default function Navbar({ onReplayLoader }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [customer, setCustomer] = useState(getLoggedInCustomer);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const handleAuthChange = () => {
      setCustomer(getLoggedInCustomer());
    };
    window.addEventListener('auto_elite_auth_change', handleAuthChange);
    return () => window.removeEventListener('auto_elite_auth_change', handleAuthChange);
  }, []);

  const handleLogout = () => {
    logoutCustomer();
    setCustomer(null);
  };

  return (
    <>
      <CustomerAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(user) => setCustomer(user)}
      />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0F19]/80 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gold-gradient p-[1px] shadow-gold transition group-hover:scale-105">
              <div className="w-full h-full rounded-[11px] bg-navy-dark flex items-center justify-center font-black font-display text-gold text-lg">
                AE
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-[0.2em] text-white font-display uppercase">
                  AUTO <span className="text-gold-shine">ELITE</span>
                </span>
              </div>
              <p className="text-[9px] tracking-[0.25em] text-slate-400 font-medium uppercase -mt-0.5">
                Luxury Garage & Station
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden items-center gap-5 xl:flex">
            {mainNavs.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-gold drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]'
                      : item.highlight
                      ? 'text-red-400 hover:text-red-300 font-bold'
                      : 'text-slate-300 hover:text-gold'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* More Pages Dropdown */}
            <div className="relative" onMouseLeave={() => setDropdownOpen(false)}>
              <button
                onMouseEnter={() => setDropdownOpen(true)}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-gold transition py-1 cursor-pointer"
              >
                <span>Explore</span>
                <ChevronDown className="w-3.5 h-3.5 text-gold" />
              </button>

              {dropdownOpen && (
                <div 
                  onMouseEnter={() => setDropdownOpen(true)}
                  className="absolute top-full left-0 w-48 py-2 glass-panel rounded-xl border border-gold/30 shadow-2xl z-50 backdrop-blur-2xl"
                >
                  {secondaryNavs.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setDropdownOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-xs font-medium uppercase tracking-wider transition ${
                          isActive ? 'text-gold bg-gold/10' : 'text-slate-300 hover:text-gold hover:bg-white/5'
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Action Controls & Portals */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Replay Loader Button */}
            {onReplayLoader && (
              <button
                onClick={onReplayLoader}
                title="Replay Cinematic Alloy Loader"
                className="p-2 rounded-full border border-gold/20 bg-white/5 text-slate-400 hover:text-gold hover:border-gold/50 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}

            {/* Customer Account Button / User Profile */}
            {customer ? (
              <div className="flex items-center gap-2">
                <NavLink
                  to="/customer-dashboard"
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wider transition ${
                      isActive
                        ? 'border-gold bg-gold/20 text-gold'
                        : 'border-gold/40 bg-gold/10 text-gold hover:border-gold'
                    }`
                  }
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{customer.name}</span>
                </NavLink>

                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-red-400 hover:border-red-400/40 transition cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-bold uppercase tracking-wider hover:bg-gold hover:text-navy-dark transition cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Create Account / Sign In</span>
              </button>
            )}

            {/* Admin Dashboard */}
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-medium uppercase tracking-wider transition ${
                  isActive
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-white/10 text-slate-300 hover:border-gold/40 hover:text-white'
                }`
              }
            >
              <Shield className="w-3.5 h-3.5 text-gold" />
              <span>Admin</span>
            </NavLink>

            {/* Hotline CTA */}
            <a
              href="tel:0703735156"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gold-gradient text-navy-dark text-xs font-bold uppercase tracking-wider shadow-gold hover:shadow-gold-lg transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>0703735156</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-white/10 text-slate-300 hover:text-gold lg:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#0B0F19]/95 px-6 py-6 lg:hidden glass-panel">
            <div className="flex flex-col gap-3">
              {[...mainNavs, ...secondaryNavs].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm font-semibold uppercase tracking-wider transition ${
                      isActive ? 'text-gold' : 'text-slate-300 hover:text-white'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                {customer ? (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gold flex items-center gap-2">
                      <UserCheck className="w-4 h-4" /> {customer.name}
                    </span>
                    <button onClick={handleLogout} className="text-xs text-red-400 font-bold uppercase">
                      Log Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthModalOpen(true);
                    }}
                    className="flex items-center gap-2 text-sm text-gold font-bold uppercase"
                  >
                    <User className="w-4 h-4" /> Create Account / Sign In
                  </button>
                )}

                <NavLink
                  to="/admin-dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-gold font-semibold"
                >
                  <Shield className="w-4 h-4" /> Admin Portal
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

