import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { fetchImage } from "@utils/helper/Helper";
import "./Middle.scss";
import { Box } from "@mui/material";
import { useFallbackImage } from '@utils/helper/FallbackImages'; // ✅ Hook
import BaseShowImageBoldOnHover from "@ui/components/UI/fields/BaseShowImageBoldOnHover";
import { URL_CONFIG } from '@utils/Config/URLs'; 

// ✅ FIX 1: Move cache OUTSIDE so it persists across re-renders/theme changes
const imageCache = new Map();

const CategoryTile = ({ category, isMobile }) => {
  
    const entity = "category";
    
    // ✅ FIX 2: Hook is called here. When theme changes, this updates instantly.
    const fallbackImg = useFallbackImage(entity);
    
    const { lang } = useContext(LanguageContext);
    const imagePath = category?.images?.[0];

    // Initialize state: Check cache first, otherwise null
    const [blobUrl, setBlobUrl] = useState(imagePath ? imageCache.get(imagePath) : null);

    useEffect(() => {
        let isMounted = true;
    
        // If we have an image path...
        if (imagePath) {
            // Case A: It's already in the shared cache -> Use it immediately
            if (imageCache.has(imagePath)) {
                setBlobUrl(imageCache.get(imagePath));
            } 
            // Case B: Not cached -> Fetch it
            else {
                const fetchAndSetImage = async () => {
                    try {
                        const fullImageUrl = URL_CONFIG.API_URL + "/" + imagePath;
                        const blob = await fetchImage(fullImageUrl);
                        
                        if (isMounted) {
                            if (blob) {
                                imageCache.set(imagePath, blob);
                                setBlobUrl(blob);
                            } else {
                                setBlobUrl(null); // Fetch failed, will show fallback
                            }
                        }
                    } catch (e) {
                        if (isMounted) setBlobUrl(null);
                    }
                };
                fetchAndSetImage();
            }
        } else {
            // No image path provided -> set null so fallback shows
            setBlobUrl(null);
        }

        return () => {
            isMounted = false;
        };
    }, [imagePath]); // ✅ Only re-run if the image URL changes, NOT on theme change

    return (
        <Box sx={{ display: 'flex', width: isMobile ? "48%" : "23%", alignItems: 'center', justifyContent: 'center' }}>
            <div className="BaseImageWrapper">
                <BaseShowImageBoldOnHover
                    // ✅ FIX 3: Dynamic Selection
                    // If blobUrl is ready, show it. If null, show the current theme's fallback.
                    imageUrl={blobUrl || fallbackImg}
                    alt={category?.name}
                    aspectRatio={2 / 3}
                />
                {category && 
                    <div className="ImageOverlayText">
                        <span>
                            {category?.name} 
                        </span>
                    </div>
                }
            </div>
        </Box>
    );
};

export default CategoryTile;