import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { insightsData } from '../data/insightsData';
import { ArrowLeft, ArrowRight, BookOpen, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function InsightPost() {
  const { slug } = useParams();
  const post = insightsData.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="section-container" style={{ padding: '8rem 4%', textAlign: 'center' }}>
        <h2>Article Not Found</h2>
        <Link to="/insights" className="cta primary" style={{ marginTop: '2rem' }}>Back to Insights</Link>
      </div>
    );
  }

  const relatedPosts = insightsData
    .filter(p => p.slug !== slug && (p.category === post.category || !post.category))
    .slice(0, 2);
  
  if (relatedPosts.length < 2) {
    const morePosts = insightsData.filter(p => p.slug !== slug && !relatedPosts.some(rp => rp.slug === p.slug));
    relatedPosts.push(...morePosts.slice(0, 2 - relatedPosts.length));
  }

  return (
    <motion.div 
      className="insight-post-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <Helmet>
        <title>{post.title} | AEQUIITAS LEGALISIS Insights</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article style={{ background: 'var(--bg-primary)' }}>
        {/* Article Header */}
        <header style={{ padding: 'clamp(6rem, 12vw, 10rem) 4% clamp(2rem, 5vw, 4rem)', borderBottom: '1px solid var(--border-light)', background: 'var(--bg-secondary)' }}>
          <div className="section-container" style={{ maxWidth: '800px' }}>
            <Link to="/insights" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
              <ArrowLeft size={16} /> All Insights
            </Link>
            
            {post.category && (
              <span className="eyebrow" style={{ display: 'block', marginBottom: '1rem' }}>{post.category}</span>
            )}
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.2 }}
            >
              {post.title}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem', marginTop: '1.5rem' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BookOpen size={16} color="var(--accent-gold)" /> {post.date}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={16} color="var(--accent-gold)" /> {post.author}</span>
            </motion.div>
          </div>
        </header>

        {/* Article Body */}
        <section style={{ padding: 'clamp(2rem, 5vw, 4rem) 4% clamp(4rem, 8vw, 8rem)', background: 'var(--bg-primary)' }}>
          <div className="section-container" style={{ maxWidth: '800px' }}>
            <div 
              style={{ 
                color: 'var(--text-primary)', 
                lineHeight: 1.8, 
                fontSize: '1.15rem',
                whiteSpace: 'pre-wrap', 
                fontFamily: 'var(--font-sans)'
              }}
            >
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>

            <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Need specific advice?</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Contact our team for a confidential consultation.</p>
              </div>
              <Link to="/#contact" className="cta primary">Consult Now</Link>
            </div>
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div style={{ marginTop: '6rem' }}>
                <h3 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontFamily: 'var(--font-serif)', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                  Related Insights
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '2rem' }}>
                  {relatedPosts.map(related => (
                    <Link 
                      key={related.slug} 
                      to={`/insights/${related.slug}`} 
                      style={{ 
                        textDecoration: 'none', 
                        display: 'block',
                        padding: '1.5rem',
                        border: '1px solid var(--border-light)',
                        borderRadius: '8px',
                        background: 'var(--bg-secondary)',
                        transition: 'border-color 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-gold)'}
                      onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}
                    >
                      {related.category && <span style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>{related.category}</span>}
                      <h4 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>{related.title}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        Read Article <ArrowRight size={14} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </article>
    </motion.div>
  );
}
