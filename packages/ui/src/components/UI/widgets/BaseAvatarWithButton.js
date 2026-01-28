import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  styled,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { loadProfileImage } from '@utils/helper/Helper';
import BaseAvatar from './BaseAvatar';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  border: `2px solid ${theme.palette.background.default}`,
  padding: 4,
  zIndex: 1,
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
}));

const AvatarWithUpdate = ({ imageUrl, name, size = 300, onImageUpdate }) => {
  const [imageBlobUrl, setImageBlobUrl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    (async () => {
      const blobUrl = await loadProfileImage(imageUrl);
      setImageBlobUrl(blobUrl);
    })();
  }, [imageUrl]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const openFilePicker = (captureMode) => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', captureMode || '');
      fileInputRef.current.click();
    }
  };

  const handleOptionClick = (source) => {
    switch (source) {
      case 'camera':
        openFilePicker('environment'); // or 'user' for front cam
        break;
      case 'gallery':
        openFilePicker(); // No capture attr, opens gallery
        break;
      case 'files':
        openFilePicker(); // Same as gallery
        break;
      default:
        break;
    }
    handleMenuClose();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpdate?.(event); // or handle the file directly here
    }
  };

  return (
    <Box position="relative" display="inline-block" width={size} height={size}>
      <BaseAvatar name={name} size={size} imageUrl={imageBlobUrl} />

      <StyledIconButton size="small" onClick={handleMenuOpen}>
        <PhotoCameraIcon sx={{ fontSize: size / 5 }} />
      </StyledIconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={() => handleOptionClick('camera')}>Open Camera</MenuItem>
        <MenuItem onClick={() => handleOptionClick('gallery')}>Upload from Gallery</MenuItem>
        <MenuItem onClick={() => handleOptionClick('files')}>Upload from Files</MenuItem>
      </Menu>

      {/* Shared hidden input for all cases */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </Box>
  );
};

export default AvatarWithUpdate;
