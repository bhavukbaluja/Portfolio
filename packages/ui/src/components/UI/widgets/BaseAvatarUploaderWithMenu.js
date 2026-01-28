import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useRef, useState } from 'react';
import theme from '@utils/Config/Theme';
import { loadProfileImage } from '@utils/helper/Helper';
import './Base.scss';
import BaseAvatar from './BaseAvatar';

const StyledIconButton = styled(IconButton)(({ }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: "var(--background2-color)",
  border: `2px solid var(--dark-color)`,
  padding: 4,
  zIndex: 1,
  '&:hover': {
    backgroundColor: "var(--secondarytext-color)"
  },
}));

const AvatarUploaderWithMenu = ({ imageRefreshKey, user, imageUrl, name, size = 120, onImageUpdate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [webcamOpen, setWebcamOpen] = useState(false);
  const [imageBlobUrl, setImageBlobUrl] = useState(null);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    (async () => {
    //   const refreshedUrl = `${imageUrl}?t=${imageRefreshKey}`;
      const blobUrl = await loadProfileImage(imageUrl, imageRefreshKey);
      setImageBlobUrl(blobUrl);
    })();
  }, [imageRefreshKey, imageUrl, user]);
  
  

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const openFilePicker = (captureMode) => {
    if (fileInputRef.current) {
      if (captureMode) {
        fileInputRef.current.setAttribute('capture', captureMode);
      } else {
        fileInputRef.current.removeAttribute('capture');
      }
      fileInputRef.current.click();
    }
  };

  const handleOptionClick = (option) => {
    switch (option) {
      case 'camera':
        if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
          openFilePicker('environment'); // Mobile
        } else {
          setWebcamOpen(true); // Desktop
        }
        break;
      case 'gallery':
      case 'files':
        openFilePicker();
        break;
      default:
        break;
    }
    handleMenuClose();
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access failed:", err);
      setWebcamOpen(false);
    }
  };

  useEffect(() => {
    if (webcamOpen) {
      startWebcam();
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [webcamOpen]);

  const handleCapture = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      const file = new File([blob], 'captured.png', { type: 'image/png' });
      onImageUpdate({ target: { files: [file] } });
      setWebcamOpen(false);
    }, 'image/png');
  };

  return (
    <>
      <Box position="relative" display="inline-block" width={size} height={size}>
        <BaseAvatar size={size} name={name} imageUrl={imageBlobUrl} />
        <StyledIconButton onClick={handleMenuOpen} className='uploadImgIcon'>
          <PhotoCameraIcon sx={{ fontSize: size / 5 }}/>
        </StyledIconButton>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(e) => {
            onImageUpdate(e);               // handle the uploaded image
            e.target.value = null;          // reset the input so same file can be picked again
          }}
        />
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => handleOptionClick('camera')}>Open Camera</MenuItem>
        <MenuItem onClick={() => handleOptionClick('gallery')}>Upload from Gallery</MenuItem>
        <MenuItem onClick={() => handleOptionClick('files')}>Upload from Files</MenuItem>
      </Menu>

      <Dialog open={webcamOpen} onClose={() => setWebcamOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Capture Photo</DialogTitle>
        <DialogContent>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: '100%', borderRadius: 8 }}
          />
          <Button
            onClick={handleCapture}
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
          >
            Capture
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AvatarUploaderWithMenu;
