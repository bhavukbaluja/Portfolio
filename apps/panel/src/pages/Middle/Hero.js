import React, { useContext, useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { useTheme } from '@mui/material/styles'; // ✅ Import theme hook
import useMediaQuery from '@mui/material/useMediaQuery'; // ✅ Import media query hook
import propertiesData from "@utils/Config/Properties.json";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import HeroImg from "@assets/Hero.png";

const Hero = ({isMobile}) => {
  const el = useRef(null);
  const { lang } = useContext(LanguageContext);
  const properties = propertiesData[lang];
  
  // 1. Get Theme and Responsive State
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  // 2. Dynamic Overlay Configuration
  // Dark Mode: Darker overlay (0.5) | Light Mode: Lighter overlay (0.2)
  const overlayOpacity = isDarkMode ? 0.6 : 0.3; 
  const overlayColor = isDarkMode ? '0, 0, 0' : '0, 0, 0'; // Keep black overlay for both to ensure white text pops, or use '255,255,255' for light mode if text is dark.

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Full-Stack Developer', 'Backend Developer', 'Front-End Developer', 'Freelancer'],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div 
      id="hero" 
      className="hero section"  
      style={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', // Center content horizontally
        // If image is on right, you might want text slightly to the left on desktop:
        // alignItems: isMobile ? 'center' : 'flex-start', 
        // paddingLeft: isMobile ? '0' : '10%',

        justifyContent: 'center',
        width: '100%',
        minHeight: '100vh', 

        // ✅ THEME & POSITION LOGIC
        backgroundImage: `linear-gradient(rgba(${overlayColor}, ${overlayOpacity}), rgba(${overlayColor}, ${overlayOpacity})), url(${HeroImg})`,
        
        backgroundSize: 'cover',            
        
        // ✅ KEY FIX: Anchor image to the RIGHT so the person isn't cut off
        // 'center right' usually works best. For fine tuning use percentages like '75% center'
        backgroundPosition: isMobile ? '85% center' : 'center right',       
        backgroundRepeat: 'no-repeat',
        
        // Text Color: Always white because we are using a dark overlay on the image
        color: '#ffffff', 
      }}
    >
      <div className="section-title" data-aos="fade-up" style={{
          // Optional: Move text slightly left on desktop if it covers the person's face
          marginRight: isMobile ? '0' : '30%', 
          textAlign: 'center'
      }}>
        <span 
          className='heading' 
          style={{
            textShadow: '0px 2px 4px rgba(0,0,0,0.8)', // Stronger shadow for readability
            fontWeight: 'bold', 
            fontSize: isMobile ? '40px' : '60px', // Responsive Font Size
            lineHeight: 1.2
          }}
        >
            {properties?.user?.firstName+" "+properties?.user?.lastName}
        </span>
        <p 
          style={{
            textShadow: '0px 1px 3px rgba(0,0,0,0.8)', 
            fontWeight: 'bold', 
            fontSize: isMobile ? '20px' : '30px', // Responsive Font Size
            marginTop: '10px'
          }}
        >
            I'm <span ref={el} className="typed"></span>
        </p>
      </div>
    </div>
  );
};

export default Hero;