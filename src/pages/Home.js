import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { 
  Scale, Shield, Landmark, Users, 
  ArrowRight, CheckCircle2, Mail, Phone, MapPin, 
  Briefcase, FileText, ChevronDown, TrendingUp
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const faqs = [
  { question: "Do you offer free initial consultations?", answer: "Yes, we offer a complimentary introductory call..." },
  { question: "What should I do if I am contacted by law enforcement?", answer: "If you are contacted by law enforcement, you have the right to remain silent..." },
  { question: "How do you structure your legal fees?", answer: "Our fees depend on the complexity and scope of the matter..." },
  { question: "Can you represent clients outside of Mumbai?", answer: "While we are based in Mumbai, our attorneys are equipped to handle complex litigation..." }
];

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isSubmittingCareer, setIsSubmittingCareer] = useState(false);

  // Parallax setup
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Process timeline setup
  const processRef = useRef(null);
  const { scrollYProgress: processScrollY } = useScroll({
    target: processRef,
    offset: ["start center", "end center"]
  });

  const toggleFaq = (index) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  const handleFormSubmit = async (e, formType) => {
    e.preventDefault();
    const setSubmitting = formType === 'contact' ? setIsSubmittingContact : setIsSubmittingCareer;
    
    setSubmitting(true);
    const loadingToast = toast.loading('Sending your message...');
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await response.json();
      if (data.success) {
        toast.success('Message sent successfully! We will contact you shortly.', { id: loadingToast, duration: 5000 });
        e.target.reset();
      } else {
        toast.error('Something went wrong. Please try again or call us directly.', { id: loadingToast });
      }
    } catch (error) {
      toast.error('Network error. Please try again later.', { id: loadingToast });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <Helmet>
        <title>AEQUIITAS LEGALISIS | Top Law Firm & Criminal Defense Lawyer in Andheri West, Mumbai</title>
        <meta name="description" content="AEQUIITAS LEGALISIS is a premier full-service law firm located in Andheri West, Mumbai. Established in 2016. We specialize in high-stakes Criminal Defense, Corporate Law, Civil Disputes, FEMA, PMLA, and Family Law with a 24/7 response." />
        <meta name="keywords" content="BEST LAWYER FOR FEMA IN ANDHERI WEST, BEST LAWYER FOR FEMA & PMLA PROCEEDINGS IN ANDHERI WEST, SRA matters lawyer in Andheri west, Best lawyer for will advisory in Andheri West, Best lawyer for civil matters in Andheri West, Best lawyer for criminal case in Andheri West, Co-operative society matters lawyer in Andheri west, lawyer For Deemed conveyance in Andheri west, lawyer for Cheque bounce case in Andheri West, Best trademark registration lawyer in Andheri west, AEQUIITAS LEGALISIS" />
        <meta property="og:title" content="AEQUIITAS LEGALISIS | Expert Legal Counsel in Mumbai" />
        <meta property="og:description" content="Full-service law firm based in Andheri West, Mumbai specializing in high-stakes criminal defense, corporate & commercial matters, FEMA, PMLA, and civil law." />
      </Helmet>

      {/* Hero Section */}
      <section className="hero" id="firm" ref={heroRef}>
        <motion.div className="hero-content" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span variants={fadeUp} className="eyebrow">Since 2016 | Full-service</motion.span>
            <motion.h1 variants={fadeUp}>Your partner in achieving legal success.</motion.h1>
            <motion.p variants={fadeUp} className="lede">
              AEQUIITAS LEGALISIS is a full-service law firm with a strong focus on criminal and legal matters. 
              Our practical knowledge and rich experience allow us to provide comprehensive services that protect your position in and out of court.
            </motion.p>
            <motion.div variants={fadeUp} className="hero-actions">
              <a className="cta primary" href="#contact">Book a strategy call <ArrowRight className="cta-icon" /></a>
              <a className="cta ghost" href="#practice">Explore practice</a>
            </motion.div>
            <motion.div variants={fadeUp} className="badges">
              <div className="badge"><span>2016</span><p>Established</p></div>
              <div className="badge"><span>24/7</span><p>Response</p></div>
              <div className="badge"><span>Expert</span><p>Criminal Defense</p></div>
            </motion.div>
          </motion.div>

          <motion.div className="hero-visual" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <Briefcase className="visual-quote-icon" size={32} />
            <h3>"Trusted counsel in complex legal matters with excellence and integrity."</h3>
            <div className="hero-visual-list">
              <div className="visual-list-item">
                <div className="visual-list-icon"><Scale size={20} /></div>
                <div className="visual-list-text"><h4 style={{ fontFamily: "'Lora', serif", textTransform: 'uppercase', fontWeight: 600 }}>Legal & Advisory Solutions</h4><p>Strategic | Practical | Result-Driven</p></div>
              </div>
              <div className="visual-list-item">
                <div className="visual-list-icon"><Landmark size={20} /></div>
                <div className="visual-list-text"><h4 style={{ fontFamily: "'Lora', serif", textTransform: 'uppercase', fontWeight: 600 }}>Taxation & Compliance Services</h4><p>Accurate | Compliant | Insight-Driven</p></div>
              </div>
              <div className="visual-list-item">
                <div className="visual-list-icon"><TrendingUp size={20} /></div>
                <div className="visual-list-text"><h4 style={{ fontFamily: "'Lora', serif", textTransform: 'uppercase', fontWeight: 600 }}>Lending & Finance Advisory</h4><p>Structured | Secure | Growth-Oriented</p></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Info Bar */}
      <section className="info-bar">
        <div className="info-container">
          <div className="stat-group"><span className="stat-label"><CheckCircle2 size={16} /> Focus</span><p className="stat-value">Criminal and legal matters across a full-service practice</p></div>
          <div className="stat-group"><span className="stat-label"><CheckCircle2 size={16} /> Approach</span><p className="stat-value">Excellence in representation with integrity and clear communication</p></div>
          <div className="stat-group"><span className="stat-label"><CheckCircle2 size={16} /> Availability</span><p className="stat-value">Based in Mumbai with rapid mobilization when you need it</p></div>
        </div>
      </section>

      {/* Practice Areas */}
      <section className="practice-section" id="practice">
        <div className="section-container">
          <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
            <span className="eyebrow">Services</span>
            <h2>Practice areas built around your needs</h2>
            <p className="lede">Excellence in legal representation and integrity in service across criminal, corporate, civil, and family matters.</p>
          </motion.div>

          <motion.div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}>
            {[
              { id: 'legal-advisory', title: 'Legal & Advisory Solutions', icon: <Scale size={28} />, phone: '8976587979', subtitle: 'Strategic | Practical | Result-Driven', features: [ 'Litigation & Dispute Resolution (Civil & Criminal)', 'Labour & Employment Counsel', 'Family & Personal Counsel', 'Intellectual Property Protection (IPR)', 'Contract Drafting, Vetting & Negotiation', 'Conveyancing, Stamp Duty & Registration Compliance', 'Property Documentation & Title Regularization', 'Estate Planning, Wills & Succession Advisory', 'Liasoning & Legal Support', 'Dispute Strategy & Pre-Litigation Advisory' ] },
              { id: 'taxation-compliance', title: 'Taxation & Compliance Services', icon: <Landmark size={28} />, phone: '8879647979', subtitle: 'Accurate | Compliant | Insight-Driven', features: [ 'Comprehensive Direct & Indirect Taxation', 'International Taxation', 'GST Governance & Compliance', 'ROC & Company Compliance', 'Accounts & Financial Management', 'RERA Registration & Compliance', 'Forensic Audit & Investigations', 'Foreign Tax, NRI Tax & 15CA/CB Certification, Cross-Border', 'FEMA / Fera Compliance', 'PMLA Advisory & Compliance', 'International Remittance Advisory', 'Scutiny, Appeals & Tribunal Counsel' ] },
              { id: 'finance-advisory', title: 'Lending & Finance Advisory', icon: <TrendingUp size={28} />, phone: '8097247979', subtitle: 'Structured | Secure | Growth-Oriented', features: [ 'Start-up & Emerging Business Advisory', 'Finance & Debt Recovery Counsel', 'Asset Reconstruction & Debt Recovery (DRT / NCLT)', 'Debt Structuring & Consolidation', 'Corporate Rescue & Insolvency Counsel' ] }
            ].map(card => (
              <motion.div variants={fadeUp} className="service-card" key={card.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div className="service-icon-wrapper" style={{ margin: 0, width: '50px', height: '50px' }}>{card.icon}</div>
                  <h3 style={{ margin: 0, fontSize: '1.25rem', lineHeight: 1.3, fontFamily: "'Lora', serif", fontWeight: 700, textTransform: 'uppercase' }}>{card.title}</h3>
                </div>
                
                <p style={{ color: 'var(--accent-gold)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.5rem', fontWeight: 600 }}>{card.subtitle}</p>
                
                <ul style={{ padding: 0, margin: '0 0 2rem 0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1 }}>
                  {card.features.map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.4 }}>
                      <CheckCircle2 size={16} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: 'auto' }}>
                  <a href={`tel:+91${card.phone}`} className="cta gold" style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem', textDecoration: 'none', padding: '0.75rem' }}>
                    <Phone size={18} /> Call {card.phone}
                  </a>
                  <Link to={`/practice/${card.id}`} className="service-link" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600 }}>Learn more details <ArrowRight size={16}/></Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section" id="process">
        <div className="section-container">
          <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="eyebrow">Our process</span>
            <h2>Clear steps from intake to resolution</h2>
            <p className="lede">Know what to expect at every stage of your matter.</p>
          </motion.div>

          <div className="process-timeline" ref={processRef}>
            <motion.div className="process-timeline-active-line" style={{ scaleY: processScrollY }} />
            {[
              { step: '1', title: 'Intake', detail: 'We listen, assess urgency, and capture the key facts.' },
              { step: '2', title: 'Strategy', detail: 'We map scenarios, filings, and communication cadence.' },
              { step: '3', title: 'Filings', detail: 'We prepare and file with precision and timely follow-through.' },
              { step: '4', title: 'Updates', detail: 'You receive clear, concise progress updates and next actions.' },
              { step: '5', title: 'Resolution', detail: 'We drive toward the best possible outcome and closure.' }
            ].map((item, index) => (
              <motion.div className="process-step" key={item.title} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: index * 0.15, duration: 0.5 }}>
                <div className="process-marker">{item.step}</div>
                <div className="process-content"><h3>{item.title}</h3><p>{item.detail}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section" id="faq">
        <div className="section-container" style={{ maxWidth: '800px' }}>
          <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="eyebrow">Insights</span>
            <h2>Frequently asked questions</h2>
          </motion.div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <motion.div className="faq-item" key={index} onClick={() => toggleFaq(index)} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <div className="faq-question">
                  <h4>{faq.question}</h4>
                  <motion.div animate={{ rotate: openFaqIndex === index ? 180 : 0 }} transition={{ duration: 0.3 }}><ChevronDown className="faq-icon" /></motion.div>
                </div>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="faq-answer-wrapper">
                      <p className="faq-answer">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="section-container">
          <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="eyebrow">Ready when it matters</span>
            <h2>Engage our assistance.</h2>
            <p className="lede">Leave your contact details below. Our legal team will review them and reach out to you immediately to arrange a strategy call.</p>
          </motion.div>

          <div className="contact-grid">
            <div className="contact-form-wrapper">
              <form onSubmit={(e) => handleFormSubmit(e, 'contact')}>
                <input type="hidden" name="access_key" value="80fe6170-2922-46be-9759-04614e2875cc" />
                <div className="form-group"><label>Name</label><input type="text" name="name" placeholder="Your full name" required /></div>
                <div className="form-group"><label>Email</label><input type="email" name="email" placeholder="you@example.com" required /></div>
                <div className="form-group" style={{ marginBottom: '2.5rem' }}><label>Phone</label><input type="tel" name="phone" placeholder="+91 " required /></div>
                <button type="submit" disabled={isSubmittingContact} className="cta primary" style={{ width: '100%', opacity: isSubmittingContact ? 0.7 : 1 }}>
                  {isSubmittingContact ? "Sending..." : "Request a Callback"} <ArrowRight className="cta-icon" />
                </button>
              </form>
            </div>

            <div className="contact-info">
              <div className="info-item"><Mail className="info-icon" size={24} /><div className="info-text"><h4>Email</h4><p>insure.aequiitas@gmail.com</p></div></div>
              <div className="info-item"><Phone className="info-icon" size={24} /><div className="info-text"><h4>Mobile</h4><p>8976587979 / 8976577979</p></div></div>
              <div className="info-item"><MapPin className="info-icon" size={32} /><div className="info-text"><h4>Office</h4><p>201 & 301, Kshitij, Veera Desai Road, Near Azad Nagar Metro Station, Andheri West, Mumbai 400058</p></div></div>
              
              <div style={{ marginTop: '2rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                <iframe 
                  title="AEQUIITAS LEGALISIS Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.549663477389!2d72.83508927595169!3d19.127402250355505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9ee7094a7b5%3A0x206c313bc2290eea!2sAEQUIITAS%20LEGALISIS%20-%20Best%20Lawyer%20in%20Andheri%20West%7C%20SRA%2C%20Will%2CFEMA%20%26%20PMLA%7C%20Expert%20Legal%20Services-Divorce%2CCriminal%2CCivil%20Matter!5e0!3m2!1sen!2sin!4v1775051374380!5m2!1sen!2sin" 
                  width="100%" height="250" style={{ border: 0, display: 'block' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="careers-section" id="careers">
        <div className="section-container">
          <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <span className="eyebrow">Join our team</span>
            <h2>Apply for a position</h2>
            <p className="lede">We look for driven professionals who value integrity, precision, and client-first service.</p>
          </motion.div>

          <div className="careers-wrapper">
            <form onSubmit={(e) => handleFormSubmit(e, 'career')}>
              <input type="hidden" name="access_key" value="80fe6170-2922-46be-9759-04614e2875cc" />
              <div className="form-row">
                <div className="form-group"><label>Name</label><input type="text" name="candidate-name" placeholder="Your full name" required /></div>
                <div className="form-group"><label>Email</label><input type="email" name="candidate-email" placeholder="you@example.com" required /></div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Phone</label><input type="tel" name="candidate-phone" placeholder="+91 " required /></div>
                <div className="form-group"><label>Role</label><select name="candidate-role"><option>Associate</option><option>Intern</option><option>Paralegal</option><option>Administrative</option><option>Other</option></select></div>
              </div>
              <div className="form-group"><label>Brief Introduction</label><textarea name="candidate-message" placeholder="Tell us about your experience and interests" required /></div>
              <div className="form-group"><label>Portfolio or Resume Link (Optional)</label><input type="url" name="candidate-link" placeholder="https://..." /></div>
              <button type="submit" disabled={isSubmittingCareer} className="cta gold" style={{ width: '100%', opacity: isSubmittingCareer ? 0.7 : 1 }}>
                {isSubmittingCareer ? "Submitting..." : "Submit Application"} <FileText className="cta-icon" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
