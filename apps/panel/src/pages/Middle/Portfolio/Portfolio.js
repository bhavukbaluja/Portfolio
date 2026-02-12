import React, { useState, useEffect, useContext, useRef } from 'react';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';
import { motion, AnimatePresence } from 'framer-motion'; 
import propertiesData from "@utils/Config/Properties.json";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import Literal from "@ui/literals";
import PortfolioItem from './PortfolioItem';
import PortfolioDetail from './PortfolioDetail'; // ✅ Import the body component
import BaseDialog from '@ui/components/UI/fields/BaseDialog'; // ✅ Import your BaseDialog

const Portfolio = ({isMobile}) => {
  const { lang } = useContext(LanguageContext);
  const properties = propertiesData[lang];
  const [filter, setFilter] = useState('all');
  const lightboxRef = useRef(null);

  // ✅ Dialog State
  const [selectedProject, setSelectedProject] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Use data from JSON
  const portfolioItems = properties?.portfolio || [];

  // Filter Logic
  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  // Unique categories
  const categories = ['all', ...new Set(portfolioItems.map(item => item.category))];

  // Initialize/Refresh GLightbox whenever the filter changes
  useEffect(() => {
    // Small delay to allow Framer Motion to render the DOM elements
    const timer = setTimeout(() => {
        if (lightboxRef.current) {
            lightboxRef.current.destroy();
        }
        lightboxRef.current = GLightbox({
            selector: '.glightbox'
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [filter, filteredItems]); 

  // ✅ Open Handler (Passed to PortfolioItem)
  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  return (
    <section id="portfolio" className="portfolio section light-background">
      
      {/* Section Title */}
      <div className="section-title" data-aos="fade-up">
        <span className='heading'>{Literal[lang].portfolio}</span>
        <p>{Literal[lang].portfolioDesc}</p>
      </div>

      <div className="container">

        <div className="isotope-layout">
          
          {/* Filters */}
          <ul style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-evenly'}} data-aos="fade-up" data-aos-delay="100">
            {categories.map((cat, index) => (
               <span 
                 key={index} 
                 onClick={() => setFilter(cat)} 
                 className={filter === cat ? 'filter-active' : ''}
                 style={{textTransform: 'capitalize', cursor: 'pointer'}}
               >
                 {Literal[lang][cat] || cat}
               </span>
            ))}
          </ul>

          {/* Grid Container */}
          <motion.div layout className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
            
            <AnimatePresence mode='popLayout'>
                {filteredItems.map((item, index) => (
                    <PortfolioItem 
                        key={item.id || item.title + index} 
                        item={item} 
                        onViewDetails={handleViewDetails} // ✅ Pass Handler here
                    />
                ))}
            </AnimatePresence>

          </motion.div>
        </div>

        {/* ✅ Implement BaseDialog with PortfolioDetail */}
        <BaseDialog
            open={isOpen}
            setOpen={setIsOpen}
            title={selectedProject?.title || "Project Details"}
            PopupClass={true} // Uses styles.FullPopup (Large/Full Screen)
            disableScrollLock={true}
            bodyComponent={
                <PortfolioDetail project={selectedProject} isMobile={isMobile}/>
            }
        />

      </div>
    </section>
  );
};

export default Portfolio;