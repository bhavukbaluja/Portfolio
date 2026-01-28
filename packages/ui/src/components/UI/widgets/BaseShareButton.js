import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import "./Base.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
// import { faUpload } from "@fortawesome/free-solid-svg-icons";

// Add the icon to the library
library.add(faShare);

export const BaseShareButton = ({ onShare }) => {
  return (
    <Tooltip title="Share">
      <IconButton className="share-button" onClick={onShare}>
      <FontAwesomeIcon icon={['fas', 'share']} />    </IconButton>
    </Tooltip>
  );
};

export default BaseShareButton;
