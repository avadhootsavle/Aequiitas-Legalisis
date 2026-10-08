import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import './App.css';

import Preloader from './components/Preloader';

import Layout from './components/Layout';
import Home from './pages/Home';
import PracticeArea from './pages/PracticeArea';
import InsightsList from './pages/InsightsList';
import InsightPost from './pages/InsightPost';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, let the browser handle scrolling to the element
    if (hash) {
      // Use setTimeout to allow framer-motion exit/enter animations to complete
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400); // 400ms buffer for the page transition
    } else {
      // Otherwise scroll to absolute top immediately
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/practice/:id" element={<PracticeArea />} />
        <Route path="/insights" element={<InsightsList />} />
        <Route path="/insights/:slug" element={<InsightPost />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <BrowserRouter>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      <ScrollToTop />
      <Toaster position="bottom-right" />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
