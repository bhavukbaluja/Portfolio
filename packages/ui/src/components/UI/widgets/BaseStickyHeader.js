import React, { useEffect, useState } from 'react';
import "./Base.scss";

const BaseStickyHeader = ({content}) => {
    const [scrollPosition, setScrollPosition] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(scrollPosition > currentScrollPos || currentScrollPos < 10); // Show on scroll up or at top
      setScrollPosition(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollPosition]);

  return (
    // <div className='sticky-header-main'>
      <header className={`header`}>
            {content}
      </header>
    // </div>

  );
};

export default BaseStickyHeader;
