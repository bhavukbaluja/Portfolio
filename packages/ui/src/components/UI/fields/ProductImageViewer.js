import React, { useState, useRef, useEffect, useCallback } from "react";
import "./ProductImageViewer.scss";
import { PrevArrow, NextArrow } from "@utils/helper/Helper";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'; 

const ProductImageViewer = ({ 
  mediaItems = [], 
  alt = "Product Media",
  thumbnailPosition = "left" // Options: 'left', 'right', 'top', 'bottom'
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // We can remove 'windowWidth' state for layout since CSS handles it now,
  // but we keep it if you have specific JS-only mobile logic.
  // For this refactor, CSS handles the responsive layout switch.

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

  const renderMediaContent = (url, ref, zoomStyle = {}) => {
    const type = getMediaType(url);

    if (type === 'youtube') {
      const videoId = getYoutubeId(url);
      return (
        <iframe
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
        style={zoomStyle}
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
        
        {/* Thumbnails (Unified Render) */}
        {/* CSS Flexbox order will handle position relative to main viewer */}
        <div className="thumbnail-list">
          {mediaItems.map((url, idx) => renderThumbnail(url, idx))}
        </div>

        {/* Main Viewer */}
        <div
          ref={mainImageContainerRef}
          className={`main-image-container ${!isImage ? 'no-zoom' : ''}`}
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
            } : {}
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
                } : {}
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