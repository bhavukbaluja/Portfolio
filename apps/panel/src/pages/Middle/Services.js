import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // 1. Import useLocation
import propertiesData from "@utils/Config/Properties.json";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import Literal from "@ui/literals";
import SmallImageTileWithColor from "@ui/components/UI/widgets/SmallImageTileWithColor"; 

const Services = () => {
  const { lang } = useContext(LanguageContext);
  const properties = propertiesData[lang];
  const services = properties?.services || [];
  
  // 2. Track the active hash
  const location = useLocation();
  const [activeHash, setActiveHash] = useState(window.location.hash);

  // 3. Keep state synced with URL changes
  useEffect(() => {
    setActiveHash(location.hash);
  }, [location]);

  useEffect(() => {
    // Also listen to the custom scroll event from your Sidebar/Home component
    const handleScrollUpdate = (e) => {
      if (e.detail) setActiveHash(e.detail);
    };
    const handleHashChange = () => setActiveHash(window.location.hash);
    
    window.addEventListener('active-section-update', handleScrollUpdate);
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
        window.removeEventListener('active-section-update', handleScrollUpdate);
        window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="container">
      
      <div className="section-title" data-aos="fade-up">
        <span className='heading'>{Literal[lang].services}</span>
        <p>{Literal[lang].servicesDesc}</p>
      </div>

      <div className="row gy-4">
        {services.map((service, index) => {
          const tileId = `service-${index}`;
          // 4. Check if this specific tile matches the active URL hash
          const isActive = activeHash === `#${tileId}`;

          return (
            <div 
              id={tileId} 
              key={index} 
              className="col-lg-4 col-md-6" 
              data-aos="fade-up" 
              data-aos-delay={(index + 1) * 100}
            >
              <SmallImageTileWithColor
                  title={service.title}
                  description={service.desc}
                  icon={service.icon}
                  index={index}
                  url={service.url} 
                  isActive={isActive} // 5. Pass the prop down to the tile
              />
            </div>
          );
        })}
      </div>
    </div>
);
};

export default Services;