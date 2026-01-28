import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import BasePopover from "../BasePopover";
import { IconButton } from "@mui/material";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const InfoTipIcon = ({ tipMsg, anchorHorizontal, transformHorizontal }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <IconButton
        tabIndex={-1}
        className="tooltip-icon-btn"
        disableRipple
        onClick={handlePopoverOpen}
      >
        <FontAwesomeIcon
          className="tooltip-icon"
          size="sm"
          icon={faCircleInfo}
        />
      </IconButton>
      {/* <BasePopover
        open={open}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        popOverContent={tipMsg}
        anchorHorizontal={anchorHorizontal}
        transformHorizontal={transformHorizontal}
        overrideProps={{ PaperProps: { elevation: 0.5 } }}
      /> */}
    </>
  );
};

export default InfoTipIcon;
