// src/components/orders/OrderStatusPopover.jsx
import React, { useEffect, useState } from "react";
import { Popover, List, ListItemButton, ListItemText } from "@mui/material";
import { getOrderStatusActions } from "@utils/helper/Helper";

const OrderStatusPopover = ({ anchorEl, onClose, orderStatus, onAction }) => {
  const open = Boolean(anchorEl);
  const [options, setOptions] = useState([]);

  // update whenever orderStatus changes
  useEffect(() => {
    if (orderStatus) {
      setOptions(getOrderStatusActions(orderStatus));
    }
  }, [orderStatus]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      style={{ pointerEvents: 'auto' }}
      PaperProps={{
        // onMouseLeave: !isMobile ? () => handleClose(true) : undefined, // ✅ Prevents accidental closing on mobile
        style: { padding: "16px", width: "auto", overflow: "visible" },
        onClick: (e) => e.stopPropagation(), 
      }}
    >
      <List>
        {options.map((option, idx) => (
          <ListItemButton
            key={idx}
            onClick={() => {
              onAction(option.nextStatus, orderStatus);
              onClose();
            }}
          >
            <ListItemText primary={option.label} />
          </ListItemButton>
        ))}
      </List>
    </Popover>
  );
};

export default OrderStatusPopover;
