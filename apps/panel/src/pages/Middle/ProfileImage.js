import React from 'react';
import { Box } from '@mui/material';
import ReactCurvedText from 'react-curved-text';
import UserImg from "@assets/UserImage.png";

// Define the spin animation in your CSS file (e.g., Middle.scss)
// @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

const ProfileImage = ({ isMobile, properties }) => {
  return (
    <div 
      style={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        flex: 0.4,
        position: 'relative' // 1. Necessary for absolute positioning of the badge
      }}
    >
      <Box
        key="userImg"
        sx={{
          flexShrink: 0,
          width: isMobile ? '100%' : '90%',
          overflow: "visible", // 2. Allow the badge to hang outside the box
          borderRadius: "5%",
          backgroundColor: 'var(--color-gray-100)',
          position: 'relative' // Anchor point for the badge
        }}
      >
        {/* Main User Image */}
        <img 
          src={UserImg} 
          alt={properties?.user?.firstName} 
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            display: "block",
            borderRadius: "5%", // Apply radius to img directly
          }}
        />

        {/* --- BADGE START --- */}
        <div 
          style={{
            position: 'absolute',
            bottom: '-40px', // Adjust these to move it further out/in
            right: '-40px',
            width: '140px',  // Size of the whole badge area
            height: '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
        >
          {/* A. The White Circle Background */}
          <div 
            style={{
              position: 'absolute',
              width: '150px', // Smaller than text width to sit "inside" the ring
              height: '150px',
              backgroundColor: 'var(--color-gray-50)',
              borderRadius: '50%',
              boxShadow: '0 4px 10px var(--color-gray-500)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1
            }}
          >
            {/* B. The Emoji */}
            <span style={{ fontSize: '45px' }}>👨🏻‍💻</span> 
          </div>

          {/* C. The Rotating Text */}
          <div 
            className="spinning-text" // Ensure you have the @keyframes spin in CSS
            style={{
              position: 'absolute',
              zIndex: 2,
              animation: 'spin 10s linear infinite' // Inline animation if class missing
            }}
          >
            <ReactCurvedText
              width={160}   // Match wrapper size
              height={160}
              cx={80}       // Center X (half of width)
              cy={80}       // Center Y (half of height)
              rx={50}       // Radius X (Adjust to fit text around white circle)
              ry={50}       // Radius Y
              startOffset={0}
              reversed={true} // Usually false is easier to read for badges
              text={properties?.designation || "Web Developer • Designer •"}
              textProps={{
                style: { 
                  fontSize: '20px', // Increased Font Size
                //   fontWeight: 'bold',
                  fill: 'var(--secondarytext-color)',     // Text Color
                  letterSpacing: '3px'
                }
              }}
              textPathProps={null}
              tspanProps={null}
              ellipseProps={null}
              svgProps={null}
            />
          </div>
        </div>
        {/* --- BADGE END --- */}

      </Box>
    </div>
  );
};

export default ProfileImage;