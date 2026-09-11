import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, Component } from 'react';
import { AnimatePresence } from 'framer-motion';

import AutoEliteLoadingScreen from './components/AutoEliteLoadingScreen';
import MouseGlow from './components/MouseGlow';
import FloatingBookingWidget from './components/FloatingBookingWidget';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookAppointmentPage from './pages/BookAppointmentPage';
import InspectionPage from './pages/InspectionPage';
import PackagesPage from './pages/PackagesPage';
import EmergencyPage from './pages/EmergencyPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import PricingPage from './pages/PricingPage';
import TeamPage from './pages/TeamPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BlogPage from './pages/BlogPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AdminLoginPage from './pages/AdminLoginPage';
import NotFoundPage from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Error boundary prevents blank/black screen crashes on any JS error
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[AUTO ELITE] Render error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0B0F19',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontFamily: 'sans-serif',
          gap: '16px',
          padding: '24px'
        }}>
          <div style={{ fontSize: '48px' }}>⚙️</div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>AUTO ELITE</h1>
          <p style={{ color: '#94a3b8', margin: 0 }}>A system error occurred. Reloading…</p>
          <button
            onClick={() => { localStorage.removeItem('auto_elite_visited'); window.location.href = '/'; }}
            style={{
              marginTop: '8px',
              padding: '10px 28px',
              background: '#C9A84C',
              color: '#0B0F19',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Reload Site
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  // Use localStorage (not sessionStorage) so loading screen only shows ONCE ever
  // sessionStorage resets on every tab/refresh which causes the black screen.
  const [isLoading, setIsLoading] = useState(() => {
    return !localStorage.getItem('auto_elite_visited');
  });

  const handleLoadingComplete = () => {
    localStorage.setItem('auto_elite_visited', 'true');
    setIsLoading(false);
  };

  const triggerReplayLoader = () => {
    setIsLoading(true);
  };

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <MouseGlow />

      <AnimatePresence mode="wait">
        {isLoading && (
          <AutoEliteLoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col font-sans selection:bg-gold selection:text-navy-dark">
        <Navbar onReplayLoader={triggerReplayLoader} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/book" element={<BookAppointmentPage />} />
            <Route path="/inspection" element={<InspectionPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/emergency" element={<EmergencyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <FloatingBookingWidget />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
