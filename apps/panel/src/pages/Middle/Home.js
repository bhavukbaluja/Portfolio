import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero'; 
import About from './About';
import Contact from './Contact';
import Resume from './Resume';
import Portfolio from './Portfolio/Portfolio';
import Services from './Services';
import "./Middle.scss";
import AOS from 'aos';

const Home = ({isMobile}) => {
  const location = useLocation();
  const isManualScroll = useRef(false);

  // 1. Handle Initial Scroll (On Page Load with HashRouter)
  useEffect(() => {
    // In HashRouter, the path is in location.pathname (e.g., "/services")
    const path = location.pathname.replace('/', '');
    if (path && path !== '') {
      const element = document.getElementById(path);
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }
  }, [location]);

  // 2. Setup Manual Scroll Listener (The Lock)
  useEffect(() => {
    const handleManualStart = () => {
        isManualScroll.current = true;
        setTimeout(() => {
            isManualScroll.current = false;
        }, 1000);
    };

    window.addEventListener('manual-scroll-start', handleManualStart);
    return () => window.removeEventListener('manual-scroll-start', handleManualStart);
  }, []);

  // 3. Refresh AOS
  useEffect(() => {
    setTimeout(() => { AOS.refresh(); }, 100);
    const scrollContainer = document.querySelector('.dashboard-content');
    if (scrollContainer) {
      const handleScroll = () => AOS.refresh();
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // 4. ✅ BULLETPROOF SCROLL SPY
  useEffect(() => {
    const observerOptions = {
      root: document.querySelector('.dashboard-content'),
      rootMargin: '-20% 0px -40% 0px', // Adjusted to be more forgiving for shorter sections
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      // 🔒 IF LOCKED, DO NOTHING
      if (isManualScroll.current) return;

      let maxRatio = 0;
      let activeId = null;

      // ✅ FIX: Find the most visible intersecting section
      // This prevents tall sections (Portfolio) from overpowering short ones (Services)
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeId = entry.target.id;
        }
      });

      if (activeId) {
        // The URL gets the HashRouter format (e.g., "#/portfolio")
        const targetHash = `#${activeId}`;
        
        if (window.location.hash !== targetHash) {
           // A. Update URL silently so page reloads work
           window.history.replaceState(null, null, targetHash);
           
           // B. ✅ FIX: Broadcast ONLY the raw word (e.g., "portfolio") to the sidebar
           window.dispatchEvent(new CustomEvent('active-section-update', { detail: activeId }));
        }
     }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // ✅ FIX: Explicitly query the DOM IDs. 
    // This removes the fragile `useRef` object that misses elements during render cycles.
    const sectionIds = ['home', 'about', 'resume', 'portfolio', 'services', 'contact'];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page-container">
      {/* Ref hooks removed from the DOM elements for cleaner, direct ID targeting */}
      <div id="home">
        <Hero isMobile={isMobile}/>
      </div>

      <section id="about">
        <About isMobile={isMobile}/>
      </section>

      <section id="resume">
        <Resume isMobile={isMobile}/>
      </section>

      <section id="portfolio">
        <Portfolio isMobile={isMobile}/>
      </section>

      <section id="services">
        <Services isMobile={isMobile}/>
      </section>

      <section id="contact">
        <Contact isMobile={isMobile}/>
      </section>
    </div>
  );
};

export default Home;