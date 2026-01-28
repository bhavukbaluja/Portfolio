import React from 'react';

const SafeImage = ({ src, alt = '', ...props }) => {
  return <img src={src?.src || src} alt={alt} {...props} />;
};

export default SafeImage;
