import React from "react";

const BaseShowImage = React.forwardRef(({ imageUrl, alt, aspectRatio, className = "", style = {} }, ref) => {
  return (
    <img
      ref={ref}
      src={imageUrl}
      alt={alt}
      className={className}
      loading="lazy"
      style={{
        width: "100%",
        aspectRatio: aspectRatio || "auto",
        objectFit: "cover",
        border: "1px solid #ccc",
        borderRadius: "8px",
        ...style, // allow overriding styles from props
      }}
    />
  );
});

export default BaseShowImage;
