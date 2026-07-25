import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

export default function App() {
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('auto_elite_visited');
  });

  const handleLoadingComplete = () => {
    sessionStorage.setItem('auto_elite_visited', 'true');
    setIsLoading(false);
  };

  const triggerReplayLoader = () => {
    setIsLoading(true);
  };

  return (
    <>
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
    </>
  );
}
