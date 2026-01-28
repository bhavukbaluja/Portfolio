import React, { useState, useRef, useEffect, useCallback } from "react";
import "./ProductImageViewer.scss";
import { PrevArrow, NextArrow } from "@utils/helper/Helper";

const ProductImageViewer = ({ imageUrls = [], alt = "Product Image" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // State for main viewer internal zoom
  const [isMainViewerZoomed, setIsMainViewerZoomed] = useState(false);
  const [mainViewerZoomTransform, setMainViewerZoomTransform] = useState({ x: 0, y: 0, scale: 1 });

  // State for fullscreen internal zoom
  const [isFullscreenZoomed, setIsFullscreenZoomed] = useState(false);
  const [fullscreenZoomTransform, setFullscreenZoomTransform] = useState({ x: 0, y: 0, scale: 1 });

  // Refs
  const mainImageContainerRef = useRef(null);
  const actualMainImageRef = useRef(null);
  const fullscreenContainerRef = useRef(null);
  const actualFullscreenImageRef = useRef(null);

  const mainZoomFactor = 2.5;
  const fullscreenZoomFactor = 3.5;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    if (!isMainViewerZoomed) return;
    applyZoomTransform(e, mainImageContainerRef, actualMainImageRef, setMainViewerZoomTransform, setIsMainViewerZoomed, mainZoomFactor);
  }, [isMainViewerZoomed, applyZoomTransform]);

  const handleMainViewerMouseEnter = useCallback(() => {
    setIsMainViewerZoomed(true);
    setMainViewerZoomTransform(prev => ({ ...prev, scale: mainZoomFactor }));
  }, []);

  const handleMainViewerMouseLeave = useCallback(() => {
    setIsMainViewerZoomed(false);
    setMainViewerZoomTransform({ x: 0, y: 0, scale: 1 });
  }, []);

  const handleFullscreenMouseMove = useCallback((e) => {
    if (!isFullscreenZoomed) return;
    applyZoomTransform(e, fullscreenContainerRef, actualFullscreenImageRef, setFullscreenZoomTransform, setIsFullscreenZoomed, fullscreenZoomFactor);
  }, [isFullscreenZoomed, applyZoomTransform]);

  const handleFullscreenMouseEnter = useCallback(() => {
    setIsFullscreenZoomed(true);
    setFullscreenZoomTransform(prev => ({ ...prev, scale: fullscreenZoomFactor }));
  }, []);

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
        ? (prev === 0 ? imageUrls.length - 1 : prev - 1)
        : (prev === imageUrls.length - 1 ? 0 : prev + 1);

      if (isFullscreen) {
        setFullscreenZoomTransform({ x: 0, y: 0, scale: 1 });
        setIsFullscreenZoomed(false);
      }
      return newIndex;
    });
  }, [imageUrls, isFullscreen]);

  const isMobileView = windowWidth < 768;

  return (
    <>
      <div className={`product-image-viewer ${isMobileView ? 'mobile-view' : ''}`}>
        {!isMobileView && (
          <div className="thumbnail-list">
            {imageUrls.map((url, idx) => (
              <div
                key={idx}
                className={`thumbnail ${idx === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(idx)}
              >
                <img src={url} alt={`${alt} thumbnail ${idx}`} loading="lazy" />
              </div>
            ))}
          </div>
        )}

        <div
          ref={mainImageContainerRef}
          className="main-image-container"
          onMouseMove={!isMobileView ? handleMainViewerMouseMove : undefined}
          onMouseEnter={!isMobileView ? handleMainViewerMouseEnter : undefined}
          onMouseLeave={!isMobileView ? handleMainViewerMouseLeave : undefined}
          onClick={toggleFullscreen}
        >
          <img
            ref={actualMainImageRef}
            src={imageUrls[activeIndex]}
            alt={alt}
            className="main-image"
            loading="eager"
            style={{
              transform: `scale(${mainViewerZoomTransform.scale}) translate(${mainViewerZoomTransform.x / mainViewerZoomTransform.scale}px, ${mainViewerZoomTransform.y / mainViewerZoomTransform.scale}px)`,
              transformOrigin: '0 0'
            }}
          />
        </div>

        {isMobileView && (
          <div className="thumbnail-list horizontal">
            {imageUrls.map((url, idx) => (
              <div
                key={idx}
                className={`thumbnail ${idx === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(idx)}
              >
                <img src={url} alt={`${alt} thumbnail ${idx}`} loading="lazy" />
              </div>
            ))}
          </div>
        )}
      </div>

      {isFullscreen && (
        <div className="fullscreen-carousel">
          <button className="close-btn" onClick={toggleFullscreen}>
            &times;
          </button>
          <PrevArrow onClick={() => navigateImage('prev')} className="nav-btn prev" />

          <div
            ref={fullscreenContainerRef}
            className="fullscreen-image-container"
            onMouseMove={handleFullscreenMouseMove}
            onMouseEnter={handleFullscreenMouseEnter}
            onMouseLeave={handleFullscreenMouseLeave}
          >
            <img
              ref={actualFullscreenImageRef}
              src={imageUrls[activeIndex]}
              alt={alt}
              className="fullscreen-image"
              loading="eager"
              style={{
                transform: `scale(${fullscreenZoomTransform.scale}) translate(${fullscreenZoomTransform.x / fullscreenZoomTransform.scale}px, ${fullscreenZoomTransform.y / fullscreenZoomTransform.scale}px)`,
                transformOrigin: '0 0'
              }}
            />
          </div>

          <NextArrow onClick={() => navigateImage('next')} className="nav-btn next" />

          <div className="fullscreen-thumbnails">
            {imageUrls.map((url, idx) => (
              <div
                key={idx}
                className={`thumbnail ${idx === activeIndex ? "active" : ""}`}
                onClick={() => {
                  setActiveIndex(idx);
                  setFullscreenZoomTransform({ x: 0, y: 0, scale: 1 });
                  setIsFullscreenZoomed(false);
                }}
              >
                <img src={url} alt={`${alt} thumbnail ${idx}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductImageViewer;
