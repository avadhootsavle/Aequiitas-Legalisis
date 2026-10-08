import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import toast from 'react-hot-toast';
import logo from '../logo-a.png'; // Going up one dir

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Helper to determine active link
  const isActive = (path) => location.pathname === path;

  // Since we are now using separate pages, anchoring might be tricky 
  // if they try to link to #contact from /criminal-law.
  // For simplicity, we link back to root if it's a section, or directly to /insights.

  return (
    <div className="page">
      {/* Navigation */}
      <nav className="nav">
        <div className="brand">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <div className="brand-mark">
              <img src={logo} alt="AEQUIITAS LEGALISIS logo" />
            </div>
            <p className="brand-name">AEQUIITAS LEGALISIS</p>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="nav-actions">
          <Link className={`nav-link ${isActive('/') ? 'active' : ''}`} to="/">Home</Link>
          <Link className={`nav-link ${isActive('/insights') ? 'active' : ''}`} to="/insights">Insights & News</Link>
          <a className="nav-link" href="/#process">Our Process</a>
          <a className="nav-link" href="/#careers">Careers</a>
          <a className="cta gold" href="/#contact">Consultation</a>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Nav Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/insights" onClick={() => setIsMobileMenuOpen(false)}>Insights</Link>
            <a href="/#process" onClick={() => setIsMobileMenuOpen(false)}>Our Process</a>
            <a href="/#careers" onClick={() => setIsMobileMenuOpen(false)}>Join the Team</a>
            <a href="/#contact" className="mobile-menu-cta cta gold" onClick={() => setIsMobileMenuOpen(false)}>Consultation</a>
          </motion.div>
        )}
      </AnimatePresence>

      <main style={{ minHeight: '80vh' }}>
        {children}
      </main>

      {/* Footer */}
      <footer className="footer" style={{ background: '#0a0f16', color: '#fff', borderTop: '4px solid var(--accent-gold)' }}>
        <div className="section-container" style={{ padding: 'clamp(2rem, 6vw, 4rem) 4% 2rem' }}>
          <div className="footer-top" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: '4rem', marginBottom: '4rem' }}>
            <div className="footer-brand">
              <div style={{ marginBottom: '1.5rem', background: '#ffffff', padding: '12px 20px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={logo} alt="AEQUIITAS LEGALISIS logo" style={{ maxHeight: '55px', maxWidth: '100%', width: 'auto', objectFit: 'contain' }} />
              </div>
              <p className="brand-name" style={{ fontSize: '1.4rem', fontFamily: "'Playfair Display', serif", color: '#db0000ff', marginBottom: '0.5rem', fontWeight: 700 }}>AEQUIITAS LEGALISIS</p>
              <p className="footer-sub" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '1.5rem' }}>Excellence in representation with integrity. Providing comprehensive legal solutions across Mumbai.</p>

              <div className="footer-socials" style={{ display: 'flex', gap: '1rem' }}>
                <a href="https://wa.me/918976587979" target="_blank" rel="noreferrer" className="social-link" style={{ background: 'rgba(255,255,255,0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--accent-gold)', display: 'flex', transition: 'all 0.3s' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.5rem', position: 'relative', display: 'inline-block' }}>
                Navigation
                <span style={{ position: 'absolute', bottom: '-8px', left: 0, width: '40%', height: '2px', background: 'var(--accent-gold)' }}></span>
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li><Link to="/" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>Home</Link></li>
                <li><a href="/#process" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>Our Process</a></li>
                <li><Link to="/insights" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>Insights & News</Link></li>
                <li><a href="/#careers" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>Careers</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '1.5rem', position: 'relative', display: 'inline-block' }}>
                Contact Info
                <span style={{ position: 'absolute', bottom: '-8px', left: 0, width: '40%', height: '2px', background: 'var(--accent-gold)' }}></span>
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>
                  <MapPin size={18} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span>201 & 301, Kshitij, Veera Desai Road, Andheri West, Mumbai</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Phone size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                  <a href="tel:+918976587979" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>+91 8976587979 / 8976577979</a>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail size={18} color="var(--accent-gold)" style={{ flexShrink: 0 }} />
                  <a href="mailto:insure.aequiitas@gmail.com" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>insure.aequiitas@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>© {new Date().getFullYear()} AEQUIITAS LEGALISIS. All rights reserved. Based in Mumbai.</p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ background: 'transparent', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
              aria-label="Scroll to top"
              onMouseOver={(e) => { e.currentTarget.style.background = 'var(--accent-gold)'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent-gold)'; }}
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        className="floating-whatsapp"
        href="https://wa.me/918976587979?text=Hello%2C%20I%27m%20contacting%20you%20via%20the%20AEQUIITAS%20LEGALISIS%20website%20to%20discuss%20a%20legal%20matter.%20Please%20advise%20next%20steps."
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp AEQUIITAS LEGALISIS"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
        </svg>
      </a>
    </div>
  );
}
