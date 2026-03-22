import React, { useContext } from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Divider 
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import ProductImageViewer from '@ui/components/UI/fields/ProductImageViewer'; 
import { LanguageContext } from '@ui/literals/LanguageProvider';
import Literal from "@ui/literals";

// ==========================================
// 🚀 BUNDLER DIRECTORY IMPORT MAGIC
// ==========================================

// OPTION A: If you are using VITE (Active by default)
const allPortfolioImages = import.meta.glob('/public/assets/img/portfolio/**/*.{png,jpg,jpeg,svg}', { eager: true, import: 'default' });

// OPTION B: If you are using Webpack / Create React App (Uncomment below and delete Option A)
/*
const importAll = (r) => {
  let images = {};
  r.keys().map((item) => { images[item] = r(item); });
  return images;
};
const allPortfolioImages = importAll(require.context('../../assets/img/portfolio', true, /\.(png|jpe?g|svg)$/));
*/

const PortfolioDetail = ({ project, isMobile }) => {

  const { lang } = useContext(LanguageContext);
  
  if (!project) return null;

  // ✅ Helper to parse **bold** text manually
  const renderDescription = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // ==========================================
  // 📂 DYNAMIC FOLDER FILTERING & SORTING
  // ==========================================
  let dynamicGallery = [];
  
  if (project.galleryFolder) {
    dynamicGallery = Object.keys(allPortfolioImages)
      // 1. Filter images to only include ones matching this project's folder name
      .filter(path => path.includes(`/${project.galleryFolder}/`))
      // 2. 👈 NEW: Sort the file paths alphabetically & numerically (e.g., 1, 2, 10)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      // 3. Extract the actual URL from the bundler object
      .map(path => allPortfolioImages[path]);
  }

  // ✅ PREPARE MEDIA LIST
  // Combine Video -> Main Image -> Hardcoded Gallery -> Dynamic Folder Gallery
  const mediaItems = [
    project.video, 
    project.img, 
    ...(project.gallery || []),
    ...dynamicGallery
  ].filter(item => item && item !== ""); // Remove null/empty strings
  
  const uniqueMediaItems = [...new Set(mediaItems)];

  return (
    <Box sx={{ 
        padding: '10px', 
        display: 'flex', 
        flexDirection: 'column', 
        width: '100%', 
        gap: '40px', 
        justifyContent: 'center' 
    }}>
      
      {/* 1. TOP SECTION: Description (Left) & Info Sidebar (Right) */}
      <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          gap: '30px',
          alignItems: 'stretch' 
      }}>
        
        {/* LEFT: Project Overview */}
        <Box sx={{ flex: 1.5 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'var(--primarytext-color)' }}>
            {Literal[lang].projectOverview || "Project Overview"}
          </Typography>
          
          <Typography 
            component="div"
            variant="body1" 
            sx={{ 
              fontSize: '15px', 
              lineHeight: 1.8, 
              color: 'var(--primarytext-color)', 
              whiteSpace: 'pre-line',
              textAlign: 'justify' 
            }}
          >
            {renderDescription(project.fullDesc || project.shortDesc)}
          </Typography>
        </Box>

        {/* RIGHT: Meta Info Sidebar */}
        <Box sx={{ flex: 0.8, minWidth: isMobile ? '100%' : '300px' }}> 
          <Box 
            sx={{ 
              p: 3, 
              backgroundColor: 'var(--color-gray-50)', 
              borderRadius: '12px', 
              border: '1px solid var(--color-gray-100)',
              height: '100%', 
              minHeight: '470px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              {Literal[lang].projectInfo || "Project Info"}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Category */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ color: 'var(--secondarytext-color)' }}>
                {Literal[lang].category || "Category"}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, textTransform: 'capitalize', color: 'var(--primarytext-color)' }}>
                {project.category}
              </Typography>
            </Box>

            {/* Tech Stack */}
            <Box sx={{ mb: 3, flexGrow: 1 }}>
              <Typography variant="subtitle2" sx={{ color: 'var(--secondarytext-color)', mb: 1 }}>
                {Literal[lang].technologies || "Technologies"}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {project.techStack?.map((tech) => (
                  <Chip 
                    key={tech} 
                    label={tech} 
                    size="small" 
                    sx={{ 
                      backgroundColor: 'var(--maindark-color)', 
                      color: 'var(--color-gray-50)',
                      fontWeight: 400,
                      cursor: 'default',
                      '&:hover': { backgroundColor: 'var(--maindarker-color)' } 
                    }} 
                  />
                ))}
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 'auto' }}>
              {project.link && (
                <button 
                  onClick={() => window.open(project.link, '_blank')}
                  className='form-button'
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}
                >
                  <LaunchIcon fontSize="small" /> {Literal[lang].liveDemo || "Live Demo"}
                </button>
              )}
              {project.repo && (
                <button 
                  onClick={() => window.open(project.repo, '_blank')}
                  className='form-skip-button'
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}
                >
                  <GitHubIcon fontSize="small" /> {Literal[lang].sourceCode || "Source Code"}
                </button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* 2. BOTTOM SECTION: Interactive Media Viewer */}
      {uniqueMediaItems.length > 0 && (
        <Box style={{width: '100%'}}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            {Literal[lang].galleryNMedia || "Gallery & Media"}
          </Typography>
          <Box 
            sx={{ 
              width: '100%', 
              height: { xs: 'auto', md: '470px' },
              overflow: 'hidden', 
              borderRadius: '12px',
              display: 'flex',          
              flexDirection: 'column',   
              alignItems: 'center'
            }}
          >
              <ProductImageViewer 
                mediaItems={uniqueMediaItems} 
                alt={project.title}
                fullscreenImageRatio="3/2"
                fullscreenVideoRatio="16/9"
                isAutoplay={false}
                thumbnailPosition={isMobile ? 'bottom' : 'right'} 
            />
          </Box>
        </Box>
      )}

    </Box>
  );
};

export default PortfolioDetail;