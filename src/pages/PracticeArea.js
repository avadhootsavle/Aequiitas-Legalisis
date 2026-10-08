import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Shield, Landmark, Scale, Users, TrendingUp, Phone } from 'lucide-react';
import { servicesData } from '../data/servicesData';

const iconMap = {
  Shield: <Shield size={48} color="var(--accent-gold)" />,
  Landmark: <Landmark size={48} color="var(--accent-gold)" />,
  Scale: <Scale size={48} color="var(--accent-gold)" />,
  Users: <Users size={48} color="var(--accent-gold)" />,
  TrendingUp: <TrendingUp size={48} color="var(--accent-gold)" />
};

export default function PracticeArea() {
  const { id } = useParams();
  const service = servicesData[id];

  if (!service) {
    return (
      <div className="section-container" style={{ padding: '8rem 4%', textAlign: 'center' }}>
        <h2>Practice Area Not Found</h2>
        <Link to="/" className="cta primary" style={{ marginTop: '2rem' }}>Return Home</Link>
      </div>
    );
  }

  return (
    <div className="practice-area-page">
      <Helmet>
        <title>{service.title} | AEQUIITAS LEGALISIS Mumbai</title>
        <meta name="description" content={`Expert legal counsel in ${service.title} in Andheri West, Mumbai. ${service.subtitle}`} />
      </Helmet>

      <section style={{ padding: 'clamp(6rem, 12vw, 10rem) 4% clamp(2rem, 5vw, 4rem)', background: 'var(--bg-primary)' }}>
        <div className="section-container" style={{ maxWidth: '800px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            <ArrowLeft size={16} /> Back to Practice Areas
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ marginBottom: '1.5rem' }}>{iconMap[service.icon]}</div>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
              {service.title}
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
              {service.subtitle}
            </p>
            {service.contact && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--accent-gold)', fontSize: '1.1rem', fontWeight: 600 }}>
                <Phone size={20} />
                <a href={`tel:+91${service.contact}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  +91 {service.contact}
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 4% clamp(4rem, 8vw, 8rem)', background: 'var(--bg-secondary)' }}>
        <div className="section-container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'grid', gap: '3rem' }}>
            <div style={{ color: 'var(--text-primary)', lineHeight: 1.8, fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
              {service.content}
            </div>

            <div style={{ padding: '0', borderRadius: '0', border: 'none', background: 'transparent' }}>
              <h3 style={{ marginBottom: '2.5rem', fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--text-primary)' }}>Areas of Expertise</h3>
              <div style={{ display: 'grid', gap: '2rem' }}>
                {service.features.map((feature, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    style={{ background: 'var(--bg-primary)', padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', borderLeft: '4px solid var(--accent-gold)', boxShadow: 'var(--shadow-sm)' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                      <CheckCircle2 size={24} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <h4 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', lineHeight: 1.4 }}>
                        {typeof feature === 'string' ? feature : feature.title}
                      </h4>
                    </div>
                    {typeof feature === 'object' && feature.description && (
                      <p style={{ margin: '0 0 0 3.5rem', fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {feature.description}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
