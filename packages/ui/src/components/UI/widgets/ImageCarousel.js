import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Box, IconButton, useTheme } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BaseShowImage from "@ui/components/UI/fields/BaseShowImage";
import {fetchImage, PrevArrow, NextArrow} from "@utils/helper/Helper";
import { URL_CONFIG } from "@utils/Config/URLs";

const ImageCarousel = ({ images, aspectRatio, imageRefreshKey }) => {
  const theme = useTheme();
  const[loadedImages, setLoadedImages] = useState(images);

  useEffect(()=>{
    const loadImages=async ()=>{
        
        let BlobImagesURLs = [];
        for(let image of images){
            const refreshedUrl = `${image}?t=${imageRefreshKey}`;
            const blobUrl = await fetchImage(URL_CONFIG.API_URL + "/" + refreshedUrl);
            BlobImagesURLs.push(blobUrl);
        }
        setLoadedImages(BlobImagesURLs);
    }
    loadImages();
  },[images]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: false,
    // pauseOnFocus: false,
    appendDots: dots => (
      <Box
        component="ul"
        sx={{
          position: 'absolute',
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'center',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          zIndex: 2,
          gap: 2,
        }}
      >
        {dots}
      </Box>
    ),
    customPaging: i => (
      <Box
        sx={{
          width: 13,
          height: 13,
          bgcolor: `var(--color-gray-300)`,
          borderRadius: '50%',
          border: `1px solid var(--color-gray-300)`,
          mx: 0.5,
          '&:hover': {
            bgcolor: `var(--light-color)`,
          },
        }}
      />
    ),
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Slider {...settings}>
        {loadedImages.map((url, index) => (
          <Box key={index} sx={{ px: 1, cursor: 'pointer' }} onClick={() => console.log("clicked: " + index)}>
            <BaseShowImage 
                imageUrl={url}
                aspectRatio={aspectRatio}
                alt={`Slide ${index + 1}`}
                style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: theme.shape.borderRadius,
                    objectFit: 'cover',
                }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ImageCarousel;
