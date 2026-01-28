import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

const TrendingBar = ({ trendingBarData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(4);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (trendingBarData.length === 0 || isHovered) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % trendingBarData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [trendingBarData, isHovered]);

  const handleClick = () => {
    const currentItem = trendingBarData[currentIndex];
    if (currentItem?.path) {
      navigate(currentItem.path);
    }
  };

  const currentItem = trendingBarData[currentIndex];

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "var(--color-gray-400)",
        padding: "8px 16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        overflow: "hidden",
        position: "relative",
        opacity: isHovered ? 0.8 : 1,
        transition: "opacity 1s ease",
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
     <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: '40vw', opacity: 0.1 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-40vw', opacity: 0.1}}
          transition={{ duration: 0.3 }} // adjust for fast, smooth movement
          style={{
            position: "absolute",
            whiteSpace: "nowrap",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "var(--primarytext-color)",
              fontWeight: 500,
            }}
          >
            {currentItem?.title}
          </Typography>
        </motion.div>
      </AnimatePresence>

    </Box>
  );
};

export default TrendingBar;
