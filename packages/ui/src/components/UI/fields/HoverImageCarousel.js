import React, { useState, useEffect } from "react";
import "./HoverImageCarousel.scss";
import HeartWishlistButton from "@ui/components/UI/widgets/HeartWishlistButton";

const HoverImageCarousel = ({
  imageUrls = [],
  alt = "",
  isHovered = false,
  isWishlisted = false,
  toggleWishlist = () => {},
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!isHovered || imageUrls.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % imageUrls.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [isHovered, imageUrls]);

  useEffect(() => {
    if (!isHovered) setActiveIndex(0);
  }, [isHovered]);

  return (
    <div className="hover-image-carousel">
      {/* 💖 Wishlist Icon */}
      <div
        className="wishlist-overlay-button"
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist();
        }}
      >
        <HeartWishlistButton isActive={isWishlisted} noBg />
      </div>

      {imageUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={alt}
          className={`carousel-image ${index === activeIndex ? "active" : ""}`}
        />
      ))}
    </div>
  );
};

export default HoverImageCarousel;
