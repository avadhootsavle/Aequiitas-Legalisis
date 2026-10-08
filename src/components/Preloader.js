import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../logo-a.png';

const legalQuotes = [
  "Excellence in representation with integrity.",
  "Justice is truth in action.",
  "Clarity in counsel, strength in representation.",
  "Protecting your rights, securing your future.",
  "Precision. Strategy. Resolution."
];

export default function Preloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [quote] = useState(() => legalQuotes[Math.floor(Math.random() * legalQuotes.length)]);

  useEffect(() => {
    // Timer allows the cinematic entrance to complete before handing off
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) setTimeout(onComplete, 800); // Buffer for slide-up exit
    }, 2400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="preloader-container"
          style={{ background: '#ffffff', color: 'var(--text-primary)' }}
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', maxWidth: '400px', padding: '0 2rem' }}>
            {/* Logo Wrapper */}
            <motion.div
              style={{
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src={logo} alt="AEQUIITAS LEGALISIS Loading" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </motion.div>

            {/* Firm Name Cinematic Fade */}
            <motion.h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                letterSpacing: '0.25em',
                color: 'var(--text-primary)',
                margin: 0,
                textAlign: 'center',
                textTransform: 'uppercase',
                fontWeight: 600
              }}
              initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ delay: 0.2, duration: 1.2, ease: 'easeOut' }}
            >
              Aequiitas Legalisis
            </motion.h1>

            {/* Random Quote */}
            <motion.p
              style={{
                fontFamily: 'var(--font-serif)',
                fontStyle: 'italic',
                color: 'var(--text-secondary)',
                textAlign: 'center',
                fontSize: '1rem',
                margin: '0.5rem 0 1rem 0'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              "{quote}"
            </motion.p>

            {/* Premium Loading Bar */}
            <motion.div
              style={{
                width: '140px',
                height: '2px',
                background: 'var(--border-light)',
                position: 'relative',
                overflow: 'hidden'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                style={{ height: '100%', background: 'var(--accent-gold)', position: 'absolute', left: 0, top: 0 }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ delay: 0.8, duration: 1.4, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
