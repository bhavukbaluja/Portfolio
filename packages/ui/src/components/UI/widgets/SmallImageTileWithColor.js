import React, { useContext, useState, useEffect } from "react";
import { useFallbackImage } from '@utils/helper/FallbackImages';
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import useNavigateTo from "@utils/helper/ApiConfig/useNavigateTo";
import "./SmallImageTile.scss";
import { SHAPE_COLOR_CONFIG } from "@utils/helper/Helper";

// ✅ 1. IMPORT THE MUI ICONS
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';
import MonitorOutlinedIcon from '@mui/icons-material/MonitorOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import ApiOutlinedIcon from '@mui/icons-material/ApiOutlined';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';

// ✅ 2. CREATE A MAPPING OBJECT
const MuiIconMap = {
  LayersOutlined: <LayersOutlinedIcon className="tile-icon" />,
  WebOutlined: <WebOutlinedIcon className="tile-icon" />,
  MonitorOutlined: <MonitorOutlinedIcon className="tile-icon" />,
  StorageOutlined: <StorageOutlinedIcon className="tile-icon" />,
  ApiOutlined: <ApiOutlinedIcon className="tile-icon" />,
  DatasetOutlined: <DatasetOutlinedIcon className="tile-icon" />,
  StorefrontOutlined: <StorefrontOutlinedIcon className="tile-icon" />,
  CloudUploadOutlined: <CloudUploadOutlinedIcon className="tile-icon" />,
  BuildOutlined: <BuildOutlinedIcon className="tile-icon" />,
  BugReportOutlined: <BugReportOutlinedIcon className="tile-icon" />
};

const SmallImageTileWithColor = ({
  isMobile,
  imageUrl,
  icon,
  title,
  url,
  description,
  price,
  theme,
  index,
}) => {
  const fallbackImg = useFallbackImage("default"); 
  const { lang } = useContext(LanguageContext);
  const NavigateTo = useNavigateTo();
  const [imgSrc, setImgSrc] = useState(imageUrl || fallbackImg);

  // --- Theme Logic ---
  let selectedTheme = theme;
  if (!selectedTheme || !SHAPE_COLOR_CONFIG[selectedTheme]) {
      const shapeKeys = Object.keys(SHAPE_COLOR_CONFIG);
      if (index !== undefined && index !== null) {
          const themeIndex = index % shapeKeys.length;
          selectedTheme = shapeKeys[themeIndex];
      } else {
          selectedTheme = "cyan";
      }
  }
  const config = SHAPE_COLOR_CONFIG[selectedTheme];

  useEffect(() => {
    setImgSrc(imageUrl || fallbackImg);
  }, [imageUrl, fallbackImg]);

  const handleClick = (e) => {
    e.preventDefault();
    if (url) {
      if (url.startsWith("http") || url.startsWith("mailto") || url.startsWith("tel")) {
        window.open(url, "_blank", "noopener,noreferrer");
      } else {
        NavigateTo(url);
      }
    }
  };

  const renderIcon = () => {
    if (imageUrl) {
      return (
        <img
          src={imgSrc}
          alt={Literal[lang][title] || title}
          onError={() => setImgSrc(fallbackImg)}
          className="tile-image"
        />
      );
    }
    
    // Check if the icon string exists in our MUI Map
    if (typeof icon === "string" && MuiIconMap[icon]) {
        return MuiIconMap[icon];
    }
    
    if (typeof icon === "string") {
      return <i className={`${icon} tile-icon`}></i>;
    }

    if (React.isValidElement(icon)) {
      return React.cloneElement(icon, { className: "tile-icon" });
    }

    return (
      <img
        src={fallbackImg}
        alt={Literal[lang][title] || title}
        className="tile-image"
      />
    );
  };

  return (
    <div 
      className="service-item position-relative" 
      onClick={handleClick}
      style={{ "--theme-color": config.color }} 
    >
      <div className="icon">
        {/* Class "blob-svg" targets specific background styles */}
        <svg className="blob-svg" width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
          <path stroke="none" strokeWidth="0" fill="#f5f5f5" d={config.path}></path>
        </svg>
        
        <div className="icon-content">
            {renderIcon()}
        </div>
      </div>

      <div className="stretched-link cursor-pointer">
        <h3 style={{ textTransform: 'capitalize'}}>{Literal[lang][title] || title}</h3>
      </div>
      
      {description && <p className="description">{description}</p>}

      {price && (
        <div className="price-tag">
           {price}
        </div>
      )}
    </div>
  );
};

export default SmallImageTileWithColor;