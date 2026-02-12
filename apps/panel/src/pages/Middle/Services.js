import React, { useContext } from 'react';
import propertiesData from "@utils/Config/Properties.json";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import Literal from "@ui/literals";
import SmallImageTileWithColor from "@ui/components/UI/widgets/SmallImageTileWithColor"; // Check path!

const Services = () => {
  const { lang } = useContext(LanguageContext);
  const properties = propertiesData[lang];
  
  // Use data from JSON
  const services = properties?.services || [];

  return (
    <div className="container">
      
      <div className="section-title" data-aos="fade-up">
        <span className='heading'>{Literal[lang].services}</span>
        <p>{Literal[lang].servicesDesc}</p>
      </div>

      <div className="row gy-4">
        {services.map((service, index) => (
          // ✅ FIX: You MUST wrap the tile in a col-div for the grid to work
          <div 
            key={index} 
            className="col-lg-4 col-md-6" 
            data-aos="fade-up" 
            data-aos-delay={(index + 1) * 100}
          >
            <SmallImageTileWithColor
                title={service.title}
                description={service.desc}
                price={service.price}
                icon={service.icon}
                index={index}
                url={service.url} // Pass URL if you have it in JSON
            />
          </div>
        ))}
      </div>
    </div>
);
};

export default Services;