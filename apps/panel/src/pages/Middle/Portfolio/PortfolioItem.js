import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined';
import { LanguageContext } from '@ui/literals/LanguageProvider';
import Literal from "@ui/literals";
import "../Middle.scss";

const PortfolioItem = ({ item, onViewDetails }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { lang } = useContext(LanguageContext);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.4 }}
      className="col-lg-4 col-md-6 portfolio-item"
    >
      {/* Tile Container */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onViewDetails && onViewDetails(item)}
        style={{
          position: 'relative',
          borderRadius: '12px',
          border: '1px solid var(--color-gray-200)',
          boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.2)' : '0 4px 10px var(--color-gray-600)',
          overflow: 'hidden',
          height: '300px',
          backgroundColor: 'var(--color-gray-200)',
          transition: 'box-shadow 0.3s ease-in-out',
          cursor: 'pointer'
        }}
      >
        
        {/* Image */}
        <img 
          src={item.img} 
          alt={item.title} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.5s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)' 
          }} 
        />

        {/* ACTION ICONS */}
        <div style={{ 
            position: 'absolute', 
            top: '15px',
            right: '15px',
            display: 'flex', 
            gap: '10px',
            zIndex: 10,
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'all 0.3s ease 0.1s'
          }}>
            
            {/* 1. Zoom Button (GLightbox) */}
            <a 
              href={item.img} 
              className="glightbox preview-link"
              onClick={(e) => {
                e.stopPropagation(); // Prevents the dialog modal from opening
              }} 
              data-gallery={`portfolio-gallery-${item.category}`}
              title={Literal[lang].zoom}
              data-title={item.title}
              data-description={item.shortDesc || item.desc}
              
              // ✅ FIX: Explicitly tell GLightbox this is an image so it doesn't hang on loading
              data-type="image" 
              
              style={{ 
                color: '#fff', 
                fontSize: '1.2rem', 
                cursor: 'pointer',
                background: 'rgba(0,0,0,0.6)', 
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
                <ZoomOutMapOutlinedIcon fontSize="small"/>
            </a>

            {/* 2. Details Button - Triggers Modal */}
            <div
              onClick={(e) => {
                e.stopPropagation(); 
                if (onViewDetails) onViewDetails(item);
              }}
              title={Literal[lang].viewDetails}
              style={{ 
                color: '#fff', 
                fontSize: '1.2rem', 
                cursor: 'pointer',
                background: 'rgba(0,0,0,0.6)', 
                borderRadius: '50%',
                width: '35px',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <InfoOutlinedIcon fontSize="small"/>
            </div>

          </div>

        {/* Shade Overlay */}
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: isHovered ? '60%' : '25%', 
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            zIndex: 1,
            transition: 'height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          {/* Title & Description */}
          <div style={{ transform: isHovered ? 'translateY(0)' : 'translateY(5px)', transition: 'transform 0.3s ease' }}>
            <h4 style={{ 
              color: '#fff', 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              margin: '0 0 5px 0',
              textShadow: '0 2px 5px rgba(0,0,0,0.7)' 
            }}>
              {item.title}
            </h4>

            <div style={{
              opacity: isHovered ? 1 : 0,           
              maxHeight: isHovered ? '100px' : '0', 
              overflow: 'hidden',
              transition: 'all 0.4s ease 0.1s'      
            }}>
              <p style={{ color: '#fff', fontSize: '0.9rem', margin: '5px 0 0 0', lineHeight: '1.4' }}>
                {item.shortDesc || item.desc} 
              </p>
            </div>
          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default PortfolioItem;