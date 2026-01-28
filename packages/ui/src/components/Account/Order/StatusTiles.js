import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import StatusFilter from "./StatusFilter";
import { ORDER_STATUSES, AFTER_SALE_STATUSES } from "@utils/helper/Helper";

const StatusTiles = ({
  selectedStatuses,
  setSelectedStatuses,
  page,
  showOrderStatuses,
  showAfterSaleStatuses
}) => {
  const initializedRef = useRef(false);

  const handleSectionSelect = (statusesArray, selectAll) => {
    if (selectAll) {
      setSelectedStatuses((prev) => Array.from(new Set([...prev, ...statusesArray])));
    } else {
      setSelectedStatuses((prev) => prev.filter((status) => !statusesArray.includes(status)));
    }
  };

  useEffect(() => {
    // Only set from page data the first time this component mounts
    if (!initializedRef.current) {
      const allStatuses = [...ORDER_STATUSES, ...AFTER_SALE_STATUSES];

      if (page?.statuses?.includes("ALL")) {
        setSelectedStatuses(allStatuses);
      } else if (page?.statuses?.includes("ALLRETURNS")) {
        setSelectedStatuses([...AFTER_SALE_STATUSES]);
      }

      initializedRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {showOrderStatuses && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Order Statuses
          </Typography>
          <StatusFilter
            statuses={ORDER_STATUSES}
            selectedStatuses={selectedStatuses}
            setSelectedStatuses={setSelectedStatuses}
            onSectionSelect={(selectAll) => handleSectionSelect(ORDER_STATUSES, selectAll)}
          />
        </Box>
      )}
      {showAfterSaleStatuses && (
        <Box>
          <Typography variant="h6" gutterBottom>
            After-Sale Statuses
          </Typography>
          <StatusFilter
            statuses={AFTER_SALE_STATUSES}
            selectedStatuses={selectedStatuses}
            setSelectedStatuses={setSelectedStatuses}
            onSectionSelect={(selectAll) => handleSectionSelect(AFTER_SALE_STATUSES, selectAll)}
          />
        </Box>
      )}
    </Box>
  );
};

export default StatusTiles;
