import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from './Hero'; 
import About from './About';
import Contact from './Contact';
import Resume from './Resume';
import Portfolio from './Portfolio';
import Services from './Services';
import "./Middle.scss";
import AOS from 'aos';

const Home = ({isMobile}) => {
  const sectionRefs = useRef({});
  const location = useLocation();

  // 1. Handle Initial Scroll
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

  // 2. Refresh AOS
  useEffect(() => {
    setTimeout(() => { AOS.refresh(); }, 100);
    const scrollContainer = document.querySelector('.dashboard-content');
    if (scrollContainer) {
      const handleScroll = () => AOS.refresh();
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // 3. ✅ CRITICAL: Scroll Spy that Broadcasts Event
  useEffect(() => {
    const observerOptions = {
      root: document.querySelector('.dashboard-content'),
      rootMargin: '-20% 0px -60% 0px', // Active when element is near top-center
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          
          // Check if we need to update to avoid loop
          if (window.location.hash !== `#${id}`) {
             // A. Update URL silently
             window.history.replaceState(null, null, `#${id}`);
             
             // B. 🚨 THIS IS THE MISSING PART 🚨
             // Dispatch event so Sidebar knows to update!
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

      <section id="services" className="services section" ref={(el) => setRef(el, 'services')}>
        <Services isMobile={isMobile}/>
      </section>

      <section id="contact" ref={(el) => setRef(el, 'contact')}>
        <Contact isMobile={isMobile}/>
      </section>
    </div>
  );
};

export default Home;