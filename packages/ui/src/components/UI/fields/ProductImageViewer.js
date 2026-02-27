import React, { useState, useRef, useCallback } from "react";
import "./ProductImageViewer.scss";
import { PrevArrow, NextArrow } from "@utils/helper/Helper";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'; 

const ProductImageViewer = ({ 
  mediaItems = [], 
  alt = "Product Media",
  thumbnailPosition = "left", // Options: 'left', 'right', 'top', 'bottom'
  fullscreenImageRatio,       // e.g., "2/3", "16/9", "1/1", etc.
  fullscreenVideoRatio        // e.g., "16/9", "4/3", etc.
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // --- Zoom State ---
  const [isMainViewerZoomed, setIsMainViewerZoomed] = useState(false);
  const [mainViewerZoomTransform, setMainViewerZoomTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isFullscreenZoomed, setIsFullscreenZoomed] = useState(false);
  const [fullscreenZoomTransform, setFullscreenZoomTransform] = useState({ x: 0, y: 0, scale: 1 });

  // --- Refs ---
  const mainImageContainerRef = useRef(null);
  const actualMainImageRef = useRef(null);
  const fullscreenContainerRef = useRef(null);
  const actualFullscreenImageRef = useRef(null);

  const mainZoomFactor = 2.5;
  const fullscreenZoomFactor = 3.5;

  // --- Helpers ---
  const getMediaType = (url) => {
    if (!url) return 'image';
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('drive.google.com')) return 'drive';
    if (url.match(/\.(mp4|webm|ogg|mov)$/i)) return 'video';
    return 'image';
  };

  const getYoutubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const currentType = getMediaType(mediaItems[activeIndex]);
  const isImage = currentType === 'image'; 

  // --- Zoom Logic ---
  const applyZoomTransform = useCallback(
    (e, containerRef, imageRef, setZoomState, setIsZoomedState, zoomFactor) => {
      if (!containerRef.current || !imageRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = x / rect.width;
      const yPercent = y / rect.height;

      const scale = zoomFactor;
      const translateX = -(xPercent * rect.width * (scale - 1));
      const translateY = -(yPercent * rect.height * (scale - 1));

      setZoomState({ x: translateX, y: translateY, scale });
      setIsZoomedState(true);
    },
    []
  );

  const handleMainViewerMouseMove = useCallback((e) => {
    if (!isMainViewerZoomed || !isImage) return;
    applyZoomTransform(e, mainImageContainerRef, actualMainImageRef, setMainViewerZoomTransform, setIsMainViewerZoomed, mainZoomFactor);
  }, [isMainViewerZoomed, applyZoomTransform, isImage]);

  const handleMainViewerMouseEnter = useCallback(() => {
    if (!isImage) return;
    setIsMainViewerZoomed(true);
    setMainViewerZoomTransform(prev => ({ ...prev, scale: mainZoomFactor }));
  }, [isImage]);

  const handleMainViewerMouseLeave = useCallback(() => {
    setIsMainViewerZoomed(false);
    setMainViewerZoomTransform({ x: 0, y: 0, scale: 1 });
  }, []);

  const handleFullscreenMouseMove = useCallback((e) => {
    if (!isFullscreenZoomed || !isImage) return;
    applyZoomTransform(e, fullscreenContainerRef, actualFullscreenImageRef, setFullscreenZoomTransform, setIsFullscreenZoomed, fullscreenZoomFactor);
  }, [isFullscreenZoomed, applyZoomTransform, isImage]);

  const handleFullscreenMouseEnter = useCallback(() => {
    if (!isImage) return;
    setIsFullscreenZoomed(true);
    setFullscreenZoomTransform(prev => ({ ...prev, scale: fullscreenZoomFactor }));
  }, [isImage]);

  const handleFullscreenMouseLeave = useCallback(() => {
    setIsFullscreenZoomed(false);
    setFullscreenZoomTransform({ x: 0, y: 0, scale: 1 });
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => {
      if (prev) {
        setFullscreenZoomTransform({ x: 0, y: 0, scale: 1 });
        setIsFullscreenZoomed(false);
      }
      return !prev;
    });
  }, []);

  const navigateImage = useCallback((direction) => {
    setActiveIndex(prev => {
      const newIndex = direction === 'prev'
        ? (prev === 0 ? mediaItems.length - 1 : prev - 1)
        : (prev === mediaItems.length - 1 ? 0 : prev + 1);

      if (isFullscreen) {
        setFullscreenZoomTransform({ x: 0, y: 0, scale: 1 });
        setIsFullscreenZoomed(false);
      }
      return newIndex;
    });
  }, [mediaItems, isFullscreen]);

  // --- Render Helpers ---

  const renderMediaContent = (url, ref, zoomStyle = {}, isForFullscreen = false) => {
    const type = getMediaType(url);
    
    // In fullscreen, we force the media to perfectly fill the ratio-box we make below.
    // 'cover' means it will crop slightly to fit the 2/3 or 16/9 shape perfectly.
    const combinedStyle = { 
      ...zoomStyle, 
      width: '100%', 
      height: '100%', 
      objectFit: isForFullscreen ? 'cover' : 'contain' 
    };

    if (type === 'youtube') {
      const videoId = getYoutubeId(url);
      return (
        <iframe
          style={combinedStyle}
          className="media-iframe"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    if (type === 'drive') {
       const previewUrl = url.replace('/view', '/preview');
       return (
        <iframe
          style={combinedStyle}
          className="media-iframe"
          src={previewUrl}
          title="Drive Video"
          allow="autoplay"
        />
       );
    }

    if (type === 'video') {
      return (
        <video 
            style={combinedStyle}
            className="media-video" 
            controls 
            src={url}
            onClick={(e) => e.stopPropagation()} 
        >
            Your browser does not support the video tag.
        </video>
      );
    }

    return (
      <img
        ref={ref}
        src={url}
        alt={alt}
        className="main-image"
        loading="eager"
        style={combinedStyle}
      />
    );
  };

  const renderThumbnail = (url, idx) => {
    const type = getMediaType(url);
    let content;

    if (type === 'youtube') {
      const videoId = getYoutubeId(url);
      content = (
        <>
            <img src={`https://img.youtube.com/vi/${videoId}/default.jpg`} alt={`Video ${idx}`} loading="lazy" />
            <div className="thumb-overlay"><PlayCircleOutlineIcon fontSize="small"/></div>
        </>
      );
    } else if (type === 'video' || type === 'drive') {
        content = (
            <div className="video-thumb-placeholder">
                <PlayCircleOutlineIcon />
                <span>Video</span>
            </div>
        );
    } else {
        content = <img src={url} alt={`${alt} thumbnail ${idx}`} loading="lazy" />;
    }

    return (
        <div
            key={idx}
            className={`thumbnail ${idx === activeIndex ? "active" : ""}`}
            onClick={() => setActiveIndex(idx)}
        >
            {content}
        </div>
    );
  };

  return (
    <div style={{width: '100%'}}>
      <div className={`product-image-viewer layout-${thumbnailPosition}`}>
        
        {/* Thumbnails */}
        <div className="thumbnail-list">
          {mediaItems.map((url, idx) => renderThumbnail(url, idx))}
        </div>

        {/* Main Viewer */}
        <div
          ref={mainImageContainerRef}
          className={`main-image-container ${!isImage ? 'no-zoom' : ''}`}
          // Apply the exact same ratio logic here. (Fallback to 16/9 if not provided)
          style={{
            aspectRatio: isImage ? (fullscreenImageRatio || '16/9') : (fullscreenVideoRatio || '16/9')
          }}
          onMouseMove={isImage ? handleMainViewerMouseMove : undefined}
          onMouseEnter={isImage ? handleMainViewerMouseEnter : undefined}
          onMouseLeave={isImage ? handleMainViewerMouseLeave : undefined}
          onClick={isImage ? toggleFullscreen : undefined}
        >
          {renderMediaContent(
            mediaItems[activeIndex], 
            actualMainImageRef, 
            isImage ? {
                transform: `scale(${mainViewerZoomTransform.scale}) translate(${mainViewerZoomTransform.x / mainViewerZoomTransform.scale}px, ${mainViewerZoomTransform.y / mainViewerZoomTransform.scale}px)`,
                transformOrigin: '0 0'
            } : {},
            false // Not fullscreen
          )}
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="fullscreen-carousel">
          <button className="close-btn" onClick={toggleFullscreen}>&times;</button>
          
          <PrevArrow onClick={() => navigateImage('prev')} className="nav-btn prev" />

          <div
            ref={fullscreenContainerRef}
            className="fullscreen-image-container"
            style={{
              // Apply dynamic aspect ratio directly to the wrapper
              aspectRatio: isImage ? fullscreenImageRatio : fullscreenVideoRatio,
              
              // Portrait-friendly logic for images (e.g. 2/3 ratio)
              // Landscape-friendly logic for video (e.g. 16/9 ratio)
              height: isImage && fullscreenImageRatio ? '80vh' : 'auto',
              width: !isImage && fullscreenVideoRatio ? '90vw' : 'auto',
              maxHeight: '80vh',
              maxWidth: '90vw',
              margin: '0 auto'
            }}
            onMouseMove={isImage ? handleFullscreenMouseMove : undefined}
            onMouseEnter={isImage ? handleFullscreenMouseEnter : undefined}
            onMouseLeave={isImage ? handleFullscreenMouseLeave : undefined}
          >
             {renderMediaContent(
                mediaItems[activeIndex], 
                actualFullscreenImageRef, 
                isImage ? {
                    transform: `scale(${fullscreenZoomTransform.scale}) translate(${fullscreenZoomTransform.x / fullscreenZoomTransform.scale}px, ${fullscreenZoomTransform.y / fullscreenZoomTransform.scale}px)`,
                    transformOrigin: '0 0'
                } : {},
                true // Is fullscreen (triggers 'cover' layout)
             )}
          </div>

          <NextArrow onClick={() => navigateImage('next')} className="nav-btn next" />

          <div className="fullscreen-thumbnails">
            {mediaItems.map((url, idx) => renderThumbnail(url, idx))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageViewer;