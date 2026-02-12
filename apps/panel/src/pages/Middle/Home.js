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
  const sectionRefs = useRef({});
  const location = useLocation();
  
  // ✅ LOCK REF: Stores whether we are auto-scrolling
  const isManualScroll = useRef(false);

  // 1. Handle Initial Scroll (On Page Load)
  useEffect(() => {
    if (location.hash && location.hash !== '#') {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
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
        // Lock the observer
        isManualScroll.current = true;
        
        // Unlock after 1 second (enough time for smooth scroll to finish)
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

  // 4. ✅ SCROLL SPY (With Lock Logic)
  useEffect(() => {
    const observerOptions = {
      root: document.querySelector('.dashboard-content'),
      rootMargin: '-30% 0px -50% 0px', // Adjusted for better accuracy
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      // 🔒 IF LOCKED, DO NOTHING
      if (isManualScroll.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          
          if (window.location.hash !== `#${id}`) {
             // A. Update URL silently
             window.history.replaceState(null, null, `#${id}`);
             
             // B. Broadcast event
             window.dispatchEvent(new CustomEvent('active-section-update', { detail: `#${id}` }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (el, id) => {
    if (el) sectionRefs.current[id] = el;
  };

  return (
    <div className="home-page-container">
      <div id="home" ref={(el) => setRef(el, 'home')}>
        <Hero isMobile={isMobile}/>
      </div>

      <section id="about" ref={(el) => setRef(el, 'about')}>
        <About isMobile={isMobile}/>
      </section>

      <section id="resume" ref={(el) => setRef(el, 'resume')}>
        <Resume isMobile={isMobile}/>
      </section>

      <section id="portfolio" ref={(el) => setRef(el, 'portfolio')}>
        <Portfolio isMobile={isMobile}/>
      </section>

      <section id="services" ref={(el) => setRef(el, 'services')}>
        <Services isMobile={isMobile}/>
      </section>

      <section id="contact" ref={(el) => setRef(el, 'contact')}>
        <Contact isMobile={isMobile}/>
      </section>
    </div>
  );
};

export default Home;