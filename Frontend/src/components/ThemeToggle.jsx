import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiCog6Tooth } from 'react-icons/hi2';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Save preference
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light');
    
    // Apply styles
    if (newTheme) {
      document.documentElement.style.colorScheme = 'dark';
      document.body.style.backgroundColor = '#0a0a0f';
      document.body.style.color = '#e2e8f0';
    } else {
      document.documentElement.style.colorScheme = 'light';
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#1a1a1a';
    }
  };

  if (!mounted) return null;

  return (
    <motion.button
      onClick={toggleTheme}
      className="settings-toggle-button"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Glow background circle */}
      <div className="settings-glow" />
      
      {/* Outer ring */}
      <div className="settings-outer-ring" />
      
      {/* Icon container */}
      <motion.div
        className="settings-icon"
        animate={{ rotate: isDark ? 0 : 360 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <HiCog6Tooth className="icon gear-icon" />
      </motion.div>
    </motion.button>
  );
}
