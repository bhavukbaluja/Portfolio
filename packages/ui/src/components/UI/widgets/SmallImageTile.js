import React, { useContext, useState, useEffect } from "react";
import { useFallbackImage } from '@utils/helper/FallbackImages';
import { Box } from "@mui/material"; // Removed unused imports
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import useNavigateTo from "@utils/helper/ApiConfig/useNavigateTo";
import propertiesData from "@utils/Config/Properties.json";

const SmallImageTile = ({
  isMobile,
  imageUrl,
  icon,
  title,
  url,
}) => {
  
  const fallbackImg = useFallbackImage("default"); 
  const { lang } = useContext(LanguageContext);
  const NavigateTo = useNavigateTo();
  // const properties = propertiesData[lang]; // Unused

  const [imgSrc, setImgSrc] = useState(imageUrl || fallbackImg);

  useEffect(() => {
    setImgSrc(imageUrl || fallbackImg);
  }, [imageUrl, fallbackImg]);

  const handleClick = () => {
    if (url) {
      if (
        url.startsWith("http") ||
        url.startsWith("mailto") ||
        url.startsWith("tel")
      ) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        NavigateTo(url);
      }
    }
  };

  return (
    <Box
      sx={{
        padding: "5px 5px 5px 5px", // increased padding slightly for hover effect space
        borderRadius: "10px",
        cursor: url ? "pointer" : "default",
        
        // ✅ FIX 1: Change width from "100%" to a fixed width
        // width: "90px", 
        
        // ✅ FIX 2: Align content internally
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        
        transition: "0.2s",
        "&:hover": {
          boxShadow: "0 0 8px var(--color-gray-500)",
          transform: "translateY(-2px)", // Optional: nice hover effect
        },
      }}
      onClick={handleClick}
    >
        {/* Image/Icon Container */}
        <Box
          sx={{
            flexShrink: 0,
            width: 60,
            height: 60,
            marginBottom: "8px", // Space between image and text
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid var(--divider-color, var(--color-gray-500))",
            borderRadius: "20px",
            display: "flex",
            backgroundColor: "white",
          }}
        >
          {imageUrl ? (
            <img
              src={imgSrc}
              alt={Literal[lang][title]}
              onError={() => setImgSrc(fallbackImg)}
              style={{
                padding: '0px', // Consistent padding
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            icon ? React.cloneElement(icon, { fontSize: "large" }) : (
                <img
                    src={fallbackImg}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                    alt={Literal[lang][title] || title}
                />
            )
          )}
      </Box>
      
      {/* Text Container */}
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <span style={{
            color: 'var(--secondarytext-color)', 
            fontSize: '12px', 
            textAlign: 'center',
            lineHeight: '1.2',
            wordBreak: 'break-word' // Prevents text overflow
        }}>
              {Literal[lang][title] || title}
        </span>
      </div>
    </Box>
  );
};

export default SmallImageTile;