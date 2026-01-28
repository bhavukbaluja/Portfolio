import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import "./Base.scss";

const HeartWishlistButton = ({ isActive, onToggle, tooltipmsg }) => {
  return (
    <Tooltip title={tooltipmsg? tooltipmsg : (isActive ? "Remove from Wishlist" : "Add to Wishlist")}>
      <IconButton
        className={`black-outline-heart-btn ${isActive ? "active" : ""}`}
        onClick={onToggle}
      >
        <FavoriteIcon className="favorite-button"/>
      </IconButton>
    </Tooltip>
  );
};

export default HeartWishlistButton;
