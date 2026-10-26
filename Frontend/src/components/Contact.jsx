import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  HiEnvelope, HiPhone, HiMapPin, HiPaperAirplane, HiCheckCircle,
} from 'react-icons/hi2';
import { FaGithub, FaLinkedinIn, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { SiCredly } from 'react-icons/si';
import { usePortfolioData } from '../context/PortfolioContext';
   import { getSocialIcon } from '../utils/socialIcons';

const iconMap = {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  SiCredly,
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { portfolioData } = usePortfolioData();
  const { contact, socials } = portfolioData;

  const contactInfo = [
    { icon: HiEnvelope, label: 'Email',    value: contact.email,    href: `mailto:${contact.email}`, color: '#00d4ff' },
    { icon: HiPhone,    label: 'Phone',    value: contact.phone,    href: `tel:${contact.phone}`,    color: '#7c3aed' },
    { icon: HiMapPin,   label: 'Location', value: contact.location, href: null,                      color: '#10b981' },
  ];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Save to our database first
      const dbResponse = await fetch(`${(import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '')}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!dbResponse.ok) {
        throw new Error('Failed to save message');
      }

      // Optional email notification via Web3Forms (set VITE_WEB3FORMS_KEY to enable)
      if (import.meta.env.VITE_WEB3FORMS_KEY) await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
             access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          subject: `Portfolio Contact: ${formData.subject}`,
          message: formData.message,
          from_name: 'Khalid Abdussamii Portfolio',
        }),
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Something went wrong. Please try again or contact me directly via email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      <div className="blob w-[500px] h-[500px] bg-[#00d4ff] top-0 left-0 opacity-[0.07]" />
      <div className="blob w-[400px] h-[400px] bg-[#7c3aed] bottom-0 right-0 opacity-[0.07]" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="section-subtitle">
            Open to internships, graduate roles and collaborations. Send me a message and let's talk.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left - Contact Info */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div>
              <h3 className="text-2xl font-bold font-display text-white mb-3">
                Ready to <span className="text-gradient">Collaborate?</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                I'm always open to discussing new opportunities, creative projects, or just
                having a chat about tech. Let's build something awesome together!
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value, href, color }, index) => (
                <motion.div
                  key={label}
                  className="glass-card rounded-2xl p-4 flex items-center gap-4 group transition-all duration-300 neon-border relative overflow-hidden"
                  whileHover={{ 
                    x: 8, 
                    scale: 1.02,
                    boxShadow: `0 0 30px ${color}40, 0 0 60px ${color}20`
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Corner tech brackets - Always visible */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 opacity-40" style={{ borderColor: color }} />
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 opacity-40" style={{ borderColor: color }} />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 opacity-40" style={{ borderColor: color }} />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 opacity-40" style={{ borderColor: color }} />
                  
                  {/* Animated scanning line - Always visible */}
                  <motion.div
                    className="absolute inset-x-0 h-[1px] opacity-30"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                      boxShadow: `0 0 8px ${color}`
                    }}
                    animate={{
                      top: ['-5%', '105%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                      repeatDelay: 2,
                      delay: index * 0.5
                    }}
                  />
                  
                  {/* Animated shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  
                  {/* Icon with tech animations */}
                  <motion.div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                    style={{ background: `${color}15` }}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: `0 0 20px ${color}60`
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {/* Pulsing glow ring - Always animating */}
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      style={{ 
                        border: `2px solid ${color}`,
                        opacity: 0.3
                      }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.3
                      }}
                    />
                    
                    {/* Rotating outer ring */}
                    <motion.div
                      className="absolute inset-[-4px] rounded-xl"
                      style={{ 
                        border: `1px solid ${color}`,
                        opacity: 0.2
                      }}
                      animate={{
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />
                    
                    {/* Data particles orbiting the icon */}
                    <motion.div
                      className="absolute w-1 h-1 rounded-full"
                      style={{ backgroundColor: color }}
                      animate={{
                        x: [0, 20, 0, -20, 0],
                        y: [0, -20, 0, 20, 0],
                        opacity: [0, 1, 1, 1, 0]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: index * 0.5
                      }}
                    />
                    <motion.div
                      className="absolute w-1 h-1 rounded-full"
                      style={{ backgroundColor: color }}
                      animate={{
                        x: [0, -15, 0, 15, 0],
                        y: [0, 15, 0, -15, 0],
                        opacity: [0, 0.8, 0.8, 0.8, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: index * 0.5 + 1
                      }}
                    />
                    
                    {/* Icon with wiggle on hover */}
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="relative z-10"
                    >
                      <Icon className="w-5 h-5" style={{ color }} />
                    </motion.div>
                  </motion.div>
                  
                  <div className="relative z-10">
                    <span className="text-xs text-slate-500 uppercase tracking-wider block mb-0.5 group-hover:text-slate-400 transition-colors">{label}</span>
                    {href ? (
                      <a href={href} className="text-sm text-slate-200 font-medium hover:text-[#00d4ff] transition-colors">
                        {value}
                      </a>
                    ) : (
                      <span className="text-sm text-slate-200 font-medium group-hover:text-white transition-colors">{value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-slate-500 mb-4">Follow me on social media</p>
              <div className="flex gap-3">
                {socials.map(({ id, label, href, icon }) => {
                  const Icon = getSocialIcon(icon);
                  return (
                    <a
                      key={id}
                      id={`contact-social-${id}`}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-11 h-11 flex items-center justify-center rounded-xl glass-card
                        text-slate-400 hover:text-[#00d4ff] hover:border-[#00d4ff]/30
                        hover:shadow-[0_0_15px_rgba(0,212,255,0.2)] transition-all duration-300"
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability Card */}
            <div className="glass-card rounded-2xl p-5 neon-border relative overflow-hidden group">
              {/* Tech Grid Background Animation */}
              <div 
                className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-700 z-0"
                style={{
                  backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                  backgroundPosition: 'center center'
                }}
              />

              {/* Animated Data Streams (Vertical & Horizontal scanning lines) - MORE VISIBLE */}
              <motion.div
                className="absolute w-full h-[2px] z-[2]"
                style={{ 
                  background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
                  boxShadow: '0 0 20px rgba(16,185,129,0.8), 0 0 40px rgba(16,185,129,0.4)'
                }}
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute h-full w-[2px] z-[2]"
                style={{ 
                  background: 'linear-gradient(180deg, transparent, #00d4ff, transparent)',
                  boxShadow: '0 0 20px rgba(0,212,255,0.8), 0 0 40px rgba(0,212,255,0.4)'
                }}
                animate={{ left: ['-10%', '110%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 1.5 }}
              />

              {/* Thick glowing corner brackets - Only on hover */}
              <div className="absolute top-0 left-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]">
                <div className="absolute top-0 left-0 w-full h-full border-l-[3px] border-t-[3px] rounded-tl-2xl" 
                  style={{ 
                    borderColor: '#10b981',
                    filter: 'drop-shadow(0 0 8px #10b981) drop-shadow(0 0 12px #10b981)'
                  }} 
                />
              </div>
              <div className="absolute top-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute top-0 right-0 w-full h-full border-r-[3px] border-t-[3px] rounded-tr-2xl" 
                  style={{ 
                    borderColor: '#10b981',
                    filter: 'drop-shadow(0 0 8px #10b981) drop-shadow(0 0 12px #10b981)'
                  }} 
                />
              </div>
              <div className="absolute bottom-0 left-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 w-full h-full border-l-[3px] border-b-[3px] rounded-bl-2xl" 
                  style={{ 
                    borderColor: '#10b981',
                    filter: 'drop-shadow(0 0 8px #10b981) drop-shadow(0 0 12px #10b981)'
                  }} 
                />
              </div>
              <div className="absolute bottom-0 right-0 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 right-0 w-full h-full border-r-[3px] border-b-[3px] rounded-br-2xl" 
                  style={{ 
                    borderColor: '#10b981',
                    filter: 'drop-shadow(0 0 8px #10b981) drop-shadow(0 0 12px #10b981)'
                  }} 
                />
              </div>
              
              <div className="flex items-center gap-3 mb-2 relative z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-white">Currently Available</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed relative z-10">
                   {contact.availability}
              </p>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            className="lg:col-span-3 relative"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="glass-card rounded-[2rem] p-6 sm:p-10 relative overflow-hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-[3px] group"
              style={{
                borderColor: '#00d4ff',
                boxShadow: '0 0 30px rgba(0, 212, 255, 0.4), 0 0 60px rgba(124, 58, 237, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1)'
              }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00d4ff]/10 to-[#7c3aed]/10 blur-3xl rounded-full" />
              
              {/* Animated scanning line - Always visible */}
              <motion.div
                className="absolute inset-x-0 h-[2px] opacity-30 z-[5]"
                style={{
                  background: 'linear-gradient(90deg, transparent, #00d4ff, #7c3aed, transparent)',
                  boxShadow: '0 0 10px #00d4ff, 0 0 20px #7c3aed'
                }}
                animate={{
                  top: ['-5%', '105%']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: 1
                }}
              />
              
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-16 text-center h-full"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                    <HiCheckCircle className="w-12 h-12 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white mb-3">Message Sent!</h3>
                  <p className="text-slate-400 max-w-sm mb-8">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline py-2.5 px-6 text-sm">
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">Your Name</label>
                      <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe"
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00d4ff]/50 focus:bg-white/[0.05] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">Email Address</label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com"
                        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00d4ff]/50 focus:bg-white/[0.05] transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">Subject</label>
                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Opportunity or collaboration"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00d4ff]/50 focus:bg-white/[0.05] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold text-slate-400 uppercase tracking-wider pl-1">Message</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} placeholder="Tell me about the opportunity..."
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#00d4ff]/50 focus:bg-white/[0.05] transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full h-14 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] disabled:opacity-70 disabled:cursor-not-allowed transition-all">
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <HiPaperAirplane className="w-5 h-5 -mt-0.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
