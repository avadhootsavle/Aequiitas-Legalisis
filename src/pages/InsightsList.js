import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { insightsData } from '../data/insightsData';
import { ArrowRight, BookOpen, Search } from 'lucide-react';

export default function InsightsList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(insightsData.map(post => post.category))].filter(Boolean);

  const filteredInsights = insightsData.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div 
      className="insights-list-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <Helmet>
        <title>Legal Insights & News | AEQUIITAS LEGALISIS Mumbai</title>
        <meta name="description" content="Stay updated with the latest legal precedents, news, and insights from the expert attorneys at AEQUIITAS LEGALISIS." />
      </Helmet>

      <section style={{ padding: 'clamp(6rem, 10vw, 8rem) 4% clamp(2rem, 5vw, 4rem)', background: 'var(--bg-primary)' }}>
        <div className="section-container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}
          >
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Knowledge Base</span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
              Legal Insights & News
            </h1>
            <p className="lede" style={{ margin: '0 auto' }}>
              Expert analysis on the latest rulings, regulatory changes, and legal strategies affecting individuals and corporations in India.
            </p>
          </motion.div>

          <div style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ position: 'relative' }}>
                <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="text" 
                  placeholder="Search insights..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '100%', paddingLeft: '3rem', borderRadius: '30px' }}
                />
              </div>

              {categories.length > 1 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      style={{
                        padding: '0.5rem 1.25rem',
                        borderRadius: '20px',
                        border: '1px solid ' + (activeCategory === category ? 'var(--accent-gold)' : 'var(--border-light)'),
                        background: activeCategory === category ? 'rgba(192, 154, 83, 0.1)' : 'transparent',
                        color: activeCategory === category ? 'var(--accent-gold)' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontWeight: 500,
                        fontSize: '0.9rem'
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {filteredInsights.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
              <h3>No insights found.</h3>
              <p>Try adjusting your search criteria.</p>
            </div>
          ) : (
            <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '2.5rem' }}>
              <AnimatePresence>
                {filteredInsights.map((post, index) => (
                  <motion.div 
                    layout
                    key={post.slug}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '12px',
                      padding: '2.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'border-color 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(192, 154, 83, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-light)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-gold)', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 600 }}>
                      <BookOpen size={16} /> {post.date}
                      {post.category && <span style={{ padding: '0.2rem 0.6rem', border: '1px solid var(--accent-gold)', borderRadius: '12px', fontSize: '0.75rem' }}>{post.category}</span>}
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.3 }}>
                      {post.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>
                      {post.excerpt}
                    </p>
                    <Link to={`/insights/${post.slug}`} className="cta ghost" style={{ alignSelf: 'flex-start', padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                      Read Article <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
