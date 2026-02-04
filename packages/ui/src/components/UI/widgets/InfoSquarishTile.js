import React, { useContext, useState, useEffect } from "react";
import { useFallbackImage } from '@utils/helper/FallbackImages';
import { Box, Card, Typography } from "@mui/material";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import useNavigateTo from "@utils/helper/ApiConfig/useNavigateTo";
import propertiesData from "@utils/Config/Properties.json";

const InfoSquarishTile = ({
  isMobile,
  imageUrl,
  icon,
  title,
  url,
  body,
}) => {
  
  // 1. Get the theme-aware fallback image
  const fallbackImg = useFallbackImage("default"); 
  
  const { lang } = useContext(LanguageContext);
  const NavigateTo = useNavigateTo();
  const properties = propertiesData[lang];

  // 2. State to manage the image source (handles valid URL -> Error -> Fallback)
  const [imgSrc, setImgSrc] = useState(imageUrl || fallbackImg);

  // 3. Sync state when props or theme changes
  useEffect(() => {
    // If imageUrl exists, try it. If not, use the current theme's fallback.
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
    <Card
      variant="outlined"
      sx={{
        padding: "10px",
        borderRadius: "16px",
        cursor: url ? "pointer" : "default",
        width: "100%",
        backgroundColor: "var(--color-gray-50)",

        // ✅ Key Step 1: Add smooth transition for the transform property
        transition: "transform 0.3s ease, box-shadow 0.3s ease",

        "&:hover": {
          // ✅ Key Step 2: Move the card UP (negative Y)
          transform: "translateY(-7px)", 

          // ✅ Key Step 3: Add a strong drop shadow to simulate height
          boxShadow: "0 12px 24px var(--color-gray-400)", 
          
          // Optional: Change border color like your Tailwind example
          borderColor: "var(--color-gray-400)" 
        },
      }}
      onClick={handleClick}
    >
      <Box display="flex" flexDirection="column" gap="10px" alignItems="center">
        {/* Image/Icon Container */}
        <Box
          sx={{
            flexShrink: 0,
            width: 60,
            height: 60,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            // border: "1px solid var(--divider-color, var(--color-gray-500))", // More neutral border
            borderRadius: "20px",
            display: "flex",
            backgroundColor: "var(--color-gray-50)",
          }}
        >
          {imageUrl ? (
            <img
              src={imgSrc}
              alt={Literal[lang][title]}
              onError={() => setImgSrc(fallbackImg)} // Switch to fallback on error
              style={{
                padding: title === "address" ? "5px" : '0px',
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          ) : (
            // If no imageUrl provided, check for Icon, otherwise show Fallback
            icon ? React.cloneElement(icon, { fontSize: "large" }) : (
                <img
                    src={fallbackImg}
                    alt={Literal[lang][title]}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                    }}
                />
            )
          )}
        </Box>

        {/* Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignItems: 'center'
          }}
        >
          <Typography variant="h6" sx={{ mb: 0.3 }}>
            {Literal[lang][title]}
          </Typography>

          {Array.isArray(body) ? (
            body.map((key, i) => (
              <span
                key={i}
                style={{color:"var(--secondarytext-color)", fontSize: '14px', lineHeight: 1.3, display: 'flex', alignItems: 'center', justifyContent:'center' }}
              >
                {properties[key]}
              </span>
            ))
          ) : (
            <p variant="body1" color="text.secondary" sx={{display: 'flex', alignItems: 'center'}}>
              {/* {properties[body]} */}
            </p>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default InfoSquarishTile;