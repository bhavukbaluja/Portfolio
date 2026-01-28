import React, { useState } from 'react';
import './ProductTileCarousel.scss';
import ProductTile from './ProductTile';
import { PrevArrow, NextArrow } from '@utils/helper/Helper';

const ProductTileCarousel = ({ products = [], isMobile = false, itemsPerPage = 5, setLoading, loading, showSnackBar }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const arrowsInside = true;

  const maxIndex = Math.max(products.length - itemsPerPage, 0);

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => Math.min(prev + itemsPerPage, maxIndex));
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => Math.max(prev - itemsPerPage, 0));
    }
  };

  const trackTranslatePercent = (100 / itemsPerPage) * currentIndex;

  return (
    <div className="product-carousel">
      <PrevArrow onClick={prevSlide} disabled={currentIndex === 0} arrowsInside={arrowsInside} />

      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${trackTranslatePercent}%)`,
          }}
        >
          {products.map((product, index) => (
            <div
              className="carousel-tile-wrapper"
              key={product.id || index}
              style={{ flex: `0 0 calc(${100 / itemsPerPage}% - 4px)` }}
              >
              <ProductTile 
                product={product} 
                isMobile={isMobile}
                setLoading={setLoading}
                loading={loading}
                showSnackBar={showSnackBar}
              />
            </div>
          ))}
        </div>
      </div>

      <NextArrow onClick={nextSlide} disabled={currentIndex >= maxIndex} arrowsInside={arrowsInside} />
    </div>
  );
};

export default ProductTileCarousel;
