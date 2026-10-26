import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import AdminApp from './admin/AdminApp';
import { Analytics } from '@vercel/analytics/react';
import { PortfolioProvider } from './context/PortfolioContext';

const SectionDivider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00d4ff]/20 to-transparent section-divider" />
);

function Portfolio() {
  return (
    <div className="min-h-screen text-slate-100 relative">
      <div className="relative z-20">
        <Navbar />
        <main>
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Certifications />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Contact />
        </main>
        <Footer />
      </div>
      <Analytics />
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isAdminRoute && <Analytics />}
    </>
  );
}

export default function App() {
  // Initialize theme on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const isDark = savedTheme === 'dark';
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (isDark) {
      document.documentElement.style.colorScheme = 'dark';
      document.body.style.backgroundColor = '#0a0a0f';
      document.body.style.color = '#e2e8f0';
    } else {
      document.documentElement.style.colorScheme = 'light';
      document.body.style.backgroundColor = '#f7f3f0';
      document.body.style.color = '#2d2d2d';
    }
  }, []);

  return (
    <PortfolioProvider>
      <Router>
        <AppContent />
      </Router>
    </PortfolioProvider>
  );
}
