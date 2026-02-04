import React, { useState, useEffect, useContext } from 'react';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';
import propertiesData from "@utils/Config/Properties.json";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import Literal from "@ui/literals";

const Portfolio = () => {
  const { lang } = useContext(LanguageContext);
  const properties = propertiesData[lang];
  const [filter, setFilter] = useState('all');

  // Initialize GLightbox on mount
  useEffect(() => {
    const lightbox = GLightbox({
      selector: '.glightbox'
    });
    return () => {
      lightbox.destroy(); // Cleanup
    };
  }, []);

  // Use data from JSON, fallback to empty array if undefined
  const portfolioItems = properties?.portfolio || [];

  // Filter Logic
  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  // Extract unique categories for filter buttons
  const categories = ['all', ...new Set(portfolioItems.map(item => item.category))];

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
          <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
            {categories.map((cat, index) => (
               <li 
                 key={index} 
                 onClick={() => setFilter(cat)} 
                 className={filter === cat ? 'filter-active' : ''}
                 style={{textTransform: 'capitalize'}}
               >
                 {Literal[lang][cat] || cat}
               </li>
            ))}
          </ul>

          {/* Grid */}
          <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
            
            {filteredItems.map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6 portfolio-item">
                <div className="portfolio-content h-100">
                  <img src={item.img} className="img-fluid" alt={item.title} />
                  <div className="portfolio-info">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <a 
                      href={item.img} 
                      title={item.title} 
                      data-gallery={`portfolio-gallery-${item.category}`} 
                      className="glightbox preview-link"
                    >
                      <i className="bi bi-zoom-in"></i>
                    </a>
                    <a href={item.link || "#"} title="More Details" className="details-link">
                      <i className="bi bi-link-45deg"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default Portfolio;