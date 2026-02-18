import React from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Divider 
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';
import ProductImageViewer from '@ui/components/UI/fields/ProductImageViewer'; // ✅ Import your new viewer

const PortfolioDetail = ({ project, isMobile }) => {
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

  // ✅ PREPARE MEDIA LIST
  // Combine Video -> Main Image -> Gallery into one array for the viewer
  // We use Set to remove duplicates if the main image is also in the gallery
  const mediaItems = [
    project.video, 
    project.img, 
    ...(project.gallery || [])
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
            Project Overview
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
              height: '470px', 
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Project Info
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Category */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ color: 'var(--secondarytext-color)' }}>Category</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, textTransform: 'capitalize', color: 'var(--primarytext-color)' }}>
                {project.category}
              </Typography>
            </Box>

            {/* Tech Stack */}
            <Box sx={{ mb: 3, flexGrow: 1 }}>
              <Typography variant="subtitle2" sx={{ color: 'var(--secondarytext-color)', mb: 1 }}>
                Technologies
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
                  <LaunchIcon fontSize="small" /> Live Demo
                </button>
              )}
              {project.repo && (
                <button 
                  onClick={() => window.open(project.repo, '_blank')}
                  className='form-skip-button'
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%' }}
                >
                  <GitHubIcon fontSize="small" /> Source Code
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
                Gallery & Media
            </Typography>
            
            {/* ✅ INTEGRATED VIEWER */}
            <ProductImageViewer 
                mediaItems={uniqueMediaItems} 
                alt={project.title}
                // Desktop: Thumbnails on Left | Mobile: Thumbnails on Bottom (handled by CSS, but passed logically here)
                thumbnailPosition={isMobile ? 'bottom' : 'right'} 
            />
        </Box>
      )}

    </Box>
  );
};

export default PortfolioDetail;