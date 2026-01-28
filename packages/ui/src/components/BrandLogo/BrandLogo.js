import React, { useContext, useEffect, useState } from "react";
import propertiesData from "@utils/Config/Properties.json";
import { Link } from "react-router-dom";
import CompanyNameLogo from '@assets/NameLogo.png'; // ✅ Restored

import CompanyLetterNameLogoLight from '@assets/LogoWithNameLight.png';
import CompanyLogoLight from '@assets/LogoLight.png';
import CompanyLogoWithTagLineLight from '@assets/LogoWithTaglineLight.png';

import CompanyLetterNameLogoDark from '@assets/LogoWithNameDark.png';
import CompanyLogoDark from '@assets/LogoDark.png';
import CompanyLogoWithTagLineDark from '@assets/LogoWithTaglineDark.png';

import "./BrandLogo.scss";
import SafeImage from "@utils/helper/SafeImage";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { useTheme } from "@mui/material";

const BrandLogo = ({ fontSize = "90px", entity = "main", isMobile }) => {

    const [logoImageError, setLogoImageError] = useState(false);
    const { lang } = useContext(LanguageContext);
    const properties = propertiesData[lang];

    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    // 1. Dynamic Asset Selection based on Theme
    const Logo = isDark ? CompanyLogoDark : CompanyLogoLight;
    const LetterNameLogo = isDark ? CompanyLetterNameLogoDark : CompanyLetterNameLogoLight;
    const LogoWithTagLine = isDark ? CompanyLogoWithTagLineDark : CompanyLogoWithTagLineLight;

    // 2. Determine which image to show based on entity
    const getDefaultImage = (currentEntity) => {
        if (currentEntity === "footer") return LogoWithTagLine;
        if (currentEntity === "header") return Logo; // This returns just the Icon
        if (currentEntity === "sideBar") return LogoWithTagLine;
        return LetterNameLogo; 
    };

    const [image, setImage] = useState(getDefaultImage(entity));

    // ✅ FIX: Added isDark to dependencies so the Icon updates on theme switch
    useEffect(() => {
        setImage(getDefaultImage(entity));
    }, [entity, isDark]);

    const numericFontSize = parseInt(fontSize, 10);

    return (
        <Link to="/" className='logo'>
            {logoImageError ? (
                <span className="brand-name" style={{ fontSize: (numericFontSize - 20) + "px", color: theme.palette.text.primary }}>
                    {properties.BrandName}
                </span>
            ) : (
                (entity === "header") ? (
                    isMobile ? (
                        <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', padding: '0px' }}>
                            {/* Mobile: Uses the combined Logo+Name asset */}
                            <SafeImage 
                                className='brand-logo' 
                                style={{ width: (numericFontSize + 20) + "px", height: (numericFontSize + 20) + "px" }} 
                                src={LetterNameLogo} 
                                alt={properties.BrandName} 
                                onError={() => setLogoImageError(true)} 
                            />
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '10px', paddingRight: '10px' }}>
                            {/* Desktop: Split view (Icon + Static Text) */}
                            
                            {/* 1. Dynamic Icon (Changes Light/Dark) */}
                            <SafeImage 
                                className='brand-logo' 
                                style={{ width: fontSize, height: fontSize }} 
                                src={image} 
                                alt={properties.BrandName} 
                                onError={() => setLogoImageError(true)} 
                            />
                            
                            {/* 2. Static Name (Common for both modes) */}
                            <SafeImage 
                                className='brand-logo' 
                                style={{ width: (numericFontSize * 4) + "px", height: fontSize }} 
                                src={CompanyNameLogo} 
                                alt={properties.BrandName} 
                                onError={() => setLogoImageError(true)} 
                            />
                        </div>
                    )
                ) : (
                    // Default/Footer logic
                    <SafeImage 
                        className='brand-logo' 
                        style={{ width: fontSize, height: fontSize }} 
                        src={image} 
                        alt={properties.BrandName} 
                        onError={() => setLogoImageError(true)} 
                    />
                )
            )}
        </Link>
    )
}
export default BrandLogo;