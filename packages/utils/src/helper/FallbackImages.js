import { useTheme } from "@mui/material";

// 1. Import all your Light Mode Assets
import DefaultLight from "@assets/NoImage-light.png"; 
import CategoryLight from "@assets/NoImage-light.png"; // Or specific category placeholder
import UserLight from "@assets/NoImage-light.png"; // Example
import ProductLight from "@assets/NoImage-light.png"; // Example

// 2. Import all your Dark Mode Assets
import DefaultDark from "@assets/NoImage-dark.png"; 
import CategoryDark from "@assets/NoImage-dark.png"; // Or specific category placeholder
import UserDark from "@assets/NoImage-dark.png"; 
import ProductDark from "@assets/NoImage-dark.png"; 

/**
 * Custom Hook to get the correct fallback image based on Entity and Theme.
 * @param {string} entity - 'category', 'user', 'product', 'default'
 * @returns {string} - The imported image source
 */
export const useFallbackImage = (entity = "default") => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    entity="default";

    switch (entity) {
        case "category":
            return isDark ? CategoryDark : CategoryLight;
        
        case "user":
        case "profile":
            return isDark ? UserDark : UserLight;

        case "product":
            return isDark ? ProductDark : ProductLight;

        default:
            return isDark ? DefaultDark : DefaultLight;
    }
};