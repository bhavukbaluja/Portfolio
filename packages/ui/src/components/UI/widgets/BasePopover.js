import React, { useEffect } from 'react';
import { Box, Popover } from '@mui/material';

const BasePopover = ({
  id,
  anchorPosition,
  setAnchorPosition,
  isMobile = false,
  onClose,
  children,
  width = 300,
  padding = 2,
  disablePortal= false
}) => {
  const open = Boolean(anchorPosition);

  const handleClose = (forceClose = false) => {
    if (!forceClose && isMobile) return;
    setAnchorPosition(null);
    onClose?.();
  };

  return (
    <Popover
      id={id}
      open={open}
      disablePortal={disablePortal}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
      onClose={() => handleClose(false)}
      disableAutoFocus
      disableEnforceFocus
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      style={{ pointerEvents: 'auto' }}
      PaperProps={{
        // onMouseLeave: !isMobile ? () => handleClose(true) : undefined,
        onClick: (e) => e.stopPropagation(),
        style: { padding: 16, width, overflow: 'visible' },
      }}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <Box
        sx={{ width: '270px', padding: 2}} 
      >
      {/* <div style={{ padding, width }}> */}
        {children}
      {/* </div> */}
      </Box>
    </Popover>
  );
};
export default BasePopover;