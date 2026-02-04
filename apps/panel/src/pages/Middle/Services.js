import React, { useContext } from 'react';
import propertiesData from "@utils/Config/Properties.json";
import { LanguageContext } from '@ui/literals/LanguageProvider';
import Literal from "@ui/literals";

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
          <div 
            key={index} 
            className="col-lg-4 col-md-6 service-item d-flex" 
            data-aos="fade-up" 
            data-aos-delay={(index + 1) * 100}
          >
            <div className="icon flex-shrink-0">
              <i className={`bi ${service.icon}`}></i>
            </div>
            <div>
              <h4 className="title">
                {/* ✅ FIX: Change <a> to <span> and remove href="#" */}
                <span className="stretched-link" style={{cursor: 'pointer'}}>{service.title}</span>
              </h4>
              <p className="description">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
);
};

export default Services;