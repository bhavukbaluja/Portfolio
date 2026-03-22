import React, { useState, useRef, useCallback, useEffect } from "react";
import "./ProductImageViewer.scss";
import { PrevArrow, NextArrow } from "@utils/helper/Helper";
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const ProductImageViewer = ({
  mediaItems = [],
  alt = "Product Media",
  thumbnailPosition = "left", // Options: 'left', 'right', 'top', 'bottom'
  fullscreenImageRatio = "2/3",
  fullscreenVideoRatio = "16/9",
  isAutoplay = true,        // Toggle autoplay on/off
  autoplaySpeed = 2000      // Speed in milliseconds
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState("next");

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

  // --- Navigation Logic ---
  const navigateImage = useCallback((dir) => {
    setDirection(dir);
    setActiveIndex((prev) => {
      const newIndex = dir === 'prev'
        ? (prev === 0 ? mediaItems.length - 1 : prev - 1)
        : (prev === mediaItems.length - 1 ? 0 : prev + 1);

      // Reset zoom states on navigation
      setMainViewerZoomTransform({ x: 0, y: 0, scale: 1 });
      setIsMainViewerZoomed(false);
      setFullscreenZoomTransform({ x: 0, y: 0, scale: 1 });
      setIsFullscreenZoomed(false);

      return newIndex;
    });
  }, [mediaItems.length]);

  // --- Autoplay Logic ---
  useEffect(() => {
    if (!isAutoplay || isPaused || isFullscreen || mediaItems.length <= 1) return;
    
    const interval = setInterval(() => {
      navigateImage('next');
    }, autoplaySpeed);
    
    return () => clearInterval(interval);
  }, [isAutoplay, isPaused, isFullscreen, mediaItems.length, navigateImage, autoplaySpeed]);

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
  }, [isMainViewerZoomed, isImage, applyZoomTransform]);

  const handleMainViewerMouseEnter = useCallback(() => {
    setIsPaused(true);
    if (!isImage) return;
    setIsMainViewerZoomed(true);
    setMainViewerZoomTransform(prev => ({ ...prev, scale: mainZoomFactor }));
  }, [isImage]);

  const handleMainViewerMouseLeave = useCallback(() => {
    setIsPaused(false);
    setIsMainViewerZoomed(false);
    setMainViewerZoomTransform({ x: 0, y: 0, scale: 1 });
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

  // --- Render Helpers ---
  const renderMediaContent = (url, ref, zoomStyle = {}, isForFullscreen = false) => {
    const type = getMediaType(url);
    const combinedStyle = {
      ...zoomStyle,
      width: '100%',
      height: '100%',
      objectFit: isForFullscreen ? 'cover' : 'contain'
    };

    const mediaWrapperClass = `media-wrapper slide-${direction} ${isMainViewerZoomed || isFullscreenZoomed ? 'is-zoomed' : ''}`;

    if (type === 'youtube') {
      const videoId = getYoutubeId(url);
      return (
        <div key={url} className={mediaWrapperClass}>
          <iframe
            style={combinedStyle}
            className="media-iframe"
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`}
            title="YT"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      );
    }

    if (type === 'drive') {
      const previewUrl = url.replace('/view', '/preview');
      return (
        <div key={url} className={mediaWrapperClass}>
          <iframe
            style={combinedStyle}
            className="media-iframe"
            src={previewUrl}
            title="Drive Video"
            allow="autoplay"
          />
        </div>
      );
    }

    if (type === 'video') {
      return (
        <div key={url} className={mediaWrapperClass}>
          <video
            style={combinedStyle}
            className="media-video"
            controls
            src={url}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      );
    }

    return (
      <div key={url} className={mediaWrapperClass}>
        <img
          ref={ref}
          src={url}
          alt={alt}
          className="main-image"
          loading="eager"
          style={combinedStyle}
        />
      </div>
    );
  };

  const renderThumbnail = (url, idx, isFS = false) => {
    const type = getMediaType(url);
    let content;

    if (type === 'youtube') {
      const videoId = getYoutubeId(url);
      content = (
        <>
          <img src={`https://img.youtube.com/vi/${videoId}/default.jpg`} alt={`thumb-${idx}`} loading="lazy" />
          <div className="thumb-overlay"><PlayCircleOutlineIcon fontSize="small" /></div>
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
      content = <img src={url} alt={`${alt} thumb ${idx}`} loading="lazy" />;
    }

    return (
      <div
        key={idx}
        className={`thumbnail ${idx === activeIndex ? "active" : ""}`}
        onClick={() => {
          setDirection(idx > activeIndex ? "next" : "prev");
          setActiveIndex(idx);
        }}
        onMouseEnter={() => !isFS && setIsPaused(true)}
        onMouseLeave={() => !isFS && setIsPaused(false)}
        style={{ aspectRatio: type === 'image' ? fullscreenImageRatio : fullscreenVideoRatio }}
      >
        {content}
      </div>
    );
  };

  return (
    <div style={{ height: '100%', width: '100%', minHeight: 0 }}>
      <div className={`product-image-viewer layout-${thumbnailPosition}`}>

        {/* Thumbnails */}
        <div className="thumbnail-list">
          {mediaItems.map((url, idx) => renderThumbnail(url, idx))}
        </div>

        {/* Main Viewer */}
        <div
          ref={mainImageContainerRef}
          className={`main-image-container ${!isImage ? 'no-zoom' : ''}`}
          style={{
            aspectRatio: isImage ? fullscreenImageRatio : fullscreenVideoRatio
          }}
          onMouseMove={isImage ? handleMainViewerMouseMove : undefined}
          onMouseEnter={handleMainViewerMouseEnter}
          onMouseLeave={handleMainViewerMouseLeave}
          onClick={isImage ? toggleFullscreen : undefined}
        >
          {/* Autoplay Progress Bar - Only if enabled */}
          {isAutoplay && !isPaused && !isFullscreen && mediaItems.length > 1 && (
            <div 
              key={`progress-${activeIndex}`} 
              className="autoplay-progress-bar" 
              style={{ animationDuration: `${autoplaySpeed}ms` }} 
            />
          )}

          {renderMediaContent(
            mediaItems[activeIndex],
            actualMainImageRef,
            isImage ? {
              transform: `scale(${mainViewerZoomTransform.scale}) translate(${mainViewerZoomTransform.x / mainViewerZoomTransform.scale}px, ${mainViewerZoomTransform.y / mainViewerZoomTransform.scale}px)`,
              transformOrigin: '0 0',
              transition: isMainViewerZoomed ? 'none' : 'transform 0.3s ease'
            } : {},
            false
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
              aspectRatio: isImage ? fullscreenImageRatio : fullscreenVideoRatio,
              height: isImage ? '80vh' : 'auto',
              width: !isImage ? '90vw' : 'auto',
              maxHeight: '80vh',
              maxWidth: '100%',
              margin: '0 auto'
            }}
            onMouseMove={isImage ? (e) => applyZoomTransform(e, fullscreenContainerRef, actualFullscreenImageRef, setFullscreenZoomTransform, setIsFullscreenZoomed, fullscreenZoomFactor) : undefined}
            onMouseEnter={() => isImage && setIsFullscreenZoomed(true)}
            onMouseLeave={() => { setIsFullscreenZoomed(false); setFullscreenZoomTransform({ x: 0, y: 0, scale: 1 }); }}
          >
            {renderMediaContent(
              mediaItems[activeIndex],
              actualFullscreenImageRef,
              isImage ? {
                transform: `scale(${fullscreenZoomTransform.scale}) translate(${fullscreenZoomTransform.x / fullscreenZoomTransform.scale}px, ${fullscreenZoomTransform.y / fullscreenZoomTransform.scale}px)`,
                transformOrigin: '0 0'
              } : {},
              true
            )}
          </div>

          <NextArrow onClick={() => navigateImage('next')} className="nav-btn next" />

          <div className="fullscreen-thumbnails">
            {mediaItems.map((url, idx) => renderThumbnail(url, idx, true))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageViewer;