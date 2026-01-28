import React, { useContext, useEffect, useState, useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { OrderServices } from "@utils/services/OrderServices";
import { getModifiedDateCell } from "@utils/helper/Helper";

const TrackingComponent = ({ setLoading, entity, entityId, open }) => {
  const { lang } = useContext(LanguageContext);
  const { getTrackingDetails } = OrderServices();
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // // 🔥 Use a ref to check if the component is mounted
  // const isMounted = useRef(false);

  // // This effect sets and resets the mounted flag
  // useEffect(() => {
  //   isMounted.current = true;
  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, []);

  const getData = () => {
    setLoading(true);
    
    getTrackingDetails(entity, entityId)
      .then((res) => {
        // 🔥 Only update state if the component is still mounted
        // if (isMounted.current) {
          setData(res?.data || []);
          setTotalCount(res?.total || 0);
        // }
      })
      .catch(() => {
        // Handle API errors
      })
      .finally(() => {
        // 🔥 Only update state if the component is still mounted
        // if (isMounted.current) {
          setLoading(false);
        // }
      });
  };

  useEffect(() => {
    if (open && entity && entityId) {
      getData();
    }
  }, [open, entity, entityId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
        padding: "20px",
        alignItems: "center",
      }}
    >
      {data.length === 0 ? (
        <Typography variant="body2">
          {Literal[lang].noDetailsFound}
        </Typography>
      ) : (
        data.map((item, idx) => (
          <Stack
            key={idx}
            direction="row"
            spacing={3}
            sx={{
              width: "100%",
              alignItems: "stretch",
            }}
          >
            {/* Left Column: Date & Time */}
            <Stack
              direction="column"
              flex={1}
              justifyContent="center"
              sx={{ pr: 2 }}
            >
              <Typography variant="body2">
                {getModifiedDateCell({ row: item }, "timestamp", "date")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getModifiedDateCell({ row: item }, "timestamp", "time")}
              </Typography>
            </Stack>

            {/* Right Column: Value */}
            <Box
              sx={{
                flex: 2.7,
                borderLeft: "1px solid var(--color-gray-300)",
                display: "flex",
                alignItems: "center",
                justifyContent: 'center'
              }}
            >
              <Box sx={{ width: "70%" }}>
                <Typography variant="body1">{item?.newValue}</Typography>
              </Box>
            </Box>
          </Stack>
        ))
      )}
    </div>
  );
};

export default TrackingComponent;