import React from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  Grid, 
  Button, 
  Divider 
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';

const PortfolioDetail = ({ project, isMobile }) => {
  if (!project) return null;
  isMobile = false;
  return (
    <Box sx={{ padding: '10px', display: 'flex', flexDirection: isMobile? 'column': 'row', width: '100%', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* 1. HERO SECTION (Video or Main Image) */}
      <Box 
        sx={{ 
          width: "100%",
          aspectRatio: project?.video?'16/9': '1',
          flex: 1,
          borderRadius: '12px', 
          overflow: 'hidden', 
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          backgroundColor: '#000' // Dark background for media
        }}
      >
        {project.video ? (
          <iframe 
            width='100%'
            height='100%'
            src={project.video} 
            title={project.title} 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            style={{ display: 'block' }}
          ></iframe>
        ) : (
          <img 
            src={project.img} 
            alt={project.title} 
            style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }} 
          />
        )}
      </Box>

      <div style={{display: 'flex', flex: 1, flexDirection: isMobile? 'column':'row', gap: '20px'}}>
        
        {/* 2. LEFT COLUMN: Description & Gallery */}
        <div style={{flex: 0.6}}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'var(--primarytext-color)' }}>
            Project Overview
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: '1rem', 
              lineHeight: 1.8, 
              color: 'var(--secondarytext-color)', 
              whiteSpace: 'pre-line',
              mb: 4
            }}
          >
            {project.fullDesc || project.shortDesc}
          </Typography>

          {/* Gallery Grid */}
          {project.gallery && project.gallery.length > 0 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Screenshots & Details
              </Typography>
              <Grid container spacing={2}>
                {project.gallery.map((img, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box 
                      component="img"
                      src={img} 
                      alt={`Gallery ${index}`} 
                      sx={{ 
                        width: '100%', 
                        borderRadius: '8px', 
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'scale(1.02)' }
                      }} 
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </div>

        {/* 3. RIGHT COLUMN: Meta Info (Sidebar) */}
        <div style={{flex: 0.4}}>
          <Box 
            sx={{ 
              p: 3, 
              backgroundColor: 'var(--color-gray-50)', 
              borderRadius: '12px', 
              border: '1px solid var(--color-gray-100)' 
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
            <Box sx={{ mb: 3 }}>
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
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
              {project.link && (
                <button 
                  // variant="contained" 
                  href={project.link} 
                  target="_blank"
                  className='form-button'
                  // fullWidth
                  // sx={{ 
                  //   backgroundColor: 'var(--primarytext-color)', 
                  //   '&:hover': { backgroundColor: 'var(--theme-color)' } 
                  // }}
                >
                  <LaunchIcon /> Live Demo
                </button>
              )}
              {project.repo && (
                <button 
                  href={project.repo} 
                  target="_blank"
                  // fullWidth
                  className='form-skip-button'
                >
                  <GitHubIcon /> Source Code
                </button>
              )}
            </Box>
          </Box>
        </div>

      </div>
    </Box>
  );
};

export default PortfolioDetail;