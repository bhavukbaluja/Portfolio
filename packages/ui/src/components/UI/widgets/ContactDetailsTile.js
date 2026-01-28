import React, { useContext, useState, useEffect } from "react";
import { useFallbackImage } from '@utils/helper/FallbackImages';
import { Box, Card, Typography } from "@mui/material";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import useNavigateTo from "@utils/helper/ApiConfig/useNavigateTo";
import propertiesData from "@utils/Config/Properties.json";

const ContactDetailsTile = ({
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
        transition: "0.2s",
        backgroundColor: "var(--color-gray-50)", // Adapts via CSS vars
        "&:hover": {
          boxShadow: url ? "0 0 8px var(--color-gray-500)" : "none",
        },
      }}
      onClick={handleClick}
    >
      <Box display="flex" flexDirection="row" gap="10px" alignItems="center">
        {/* Image/Icon Container */}
        <Box
          sx={{
            flexShrink: 0,
            width: 60,
            height: 60,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid var(--divider-color, var(--color-gray-500))", // More neutral border
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
          }}
        >
          <Typography variant="h6" sx={{ mb: 0.3 }}>
            {Literal[lang][title]}
          </Typography>

          {Array.isArray(body) ? (
            body.map((key, i) => (
              <Typography
                key={i}
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.3 }}
              >
                {properties[key]}
              </Typography>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              {properties[body]}
            </Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default ContactDetailsTile;