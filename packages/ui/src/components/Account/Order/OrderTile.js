import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, Paper, Divider, Stack } from "@mui/material";
import { formatIndianDateTime, fetchImage, formatOrderStatus } from "@utils/helper/Helper";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import Literal from "@ui/literals";
import { useFallbackImage } from '@utils/helper/FallbackImages';
import { URL_CONFIG } from "@utils/Config/URLs";
import useNavigateTo from "@utils/helper/ApiConfig/useNavigateTo.js";
import { OrderServices } from "@utils/services/OrderServices";
import MoreOptionsForOrder from "./MoreOptionsForOrder";

// Cache outside to persist across re-renders
const imageCache = new Map();

const OrderTile = ({ order, isMobile, isManager, showSnackBar, refresh, setLoading, refreshSidebarCounts, imageRefreshKey, setImageRefreshKey }) => {
  
  const entity = "order";
  
  // ✅ 1. Get dynamic fallback (updates instantly on theme change)
  const fallbackImg = useFallbackImage(entity);
  
  const { lang } = useContext(LanguageContext);
  const [images, setImages] = useState({});
  const NavigateTo = useNavigateTo();

  const loadImages = async () => {
    const newImages = {};
    
    // Use Promise.all for parallel fetching
    const promises = (order.items || []).map(async (item) => {
      if (!item.productImageUrl) return; // Skip if no URL

      // Check Cache
      if (imageCache.has(item.productImageUrl)) {
        newImages[item.productId] = imageCache.get(item.productImageUrl);
      } else {
        // Fetch Fresh
        try {
          const fullUrl = `${URL_CONFIG.API_URL}/${item.productImageUrl}`;
          const blob = await fetchImage(fullUrl);
          
          if (blob) {
            imageCache.set(item.productImageUrl, blob);
            newImages[item.productId] = blob;
          }
          // ✅ FIX: If fetch fails, do NOT set fallbackImg in state. 
          // Leave it undefined so the render logic uses the dynamic fallback.
        } catch (e) {
           console.error("Image load failed", e);
        }
      }
    });

    await Promise.all(promises);
    setImages(newImages);
  };

  useEffect(() => {
    loadImages();
  }, [order]);

  const openDetails = () => {
    if ((order?.status === "PENDING" || order?.status === "PAYMENT_FAILED" ) && !isManager) {
      NavigateTo(`/checkout?orderId=${order?.id}`);
    } else {
      NavigateTo("/orders/details?orderId=" + order?.id);
    }
  };

  return (
    <Paper sx={{ mb: 2, p: 2, width: "100%"}}>

      <Stack
        direction="row"
        flexWrap="wrap"
        gap={2}
        alignItems="flex-start"
        sx={{ position: "relative" }}
      >
        {!isMobile && (
          <Box sx={{ flex: { xs: "1 1 100%", sm: "1 1 auto" }, cursor: "pointer" }}  onClick={openDetails} >
            <Typography variant="subtitle2" color="textSecondary">
              {Literal[lang].orderId}
            </Typography>
            <Typography>{order?.id}</Typography>
          </Box>
        )}

        {/* Order Placed On */}
        <Box sx={{ flex: { xs: "1 1 auto", sm: "1 1 auto" } , cursor: "pointer" }}>
          <Typography variant="subtitle2" color="textSecondary"  onClick={openDetails} >
            {Literal[lang].orderPlacedOn}
          </Typography>
          <Typography>{formatIndianDateTime(order.orderPlacedOn, false)}</Typography>
        </Box>

        {/* Total */}
        <Box sx={{ flex: { xs: "1 1 auto", sm: "1 1 auto" } }}>
          <Typography variant="subtitle2" color="textSecondary">
            {Literal[lang].total}
          </Typography>
          <Typography>₹{order.totalAmount.toFixed(2)}</Typography>
        </Box>

        {/* Security */}
        {order.totalSecurity !== 0 && (
          <Box sx={{ flex: { xs: "1 1 auto", sm: "1 1 auto" } }}>
            <Typography variant="subtitle2" color="textSecondary">
              {Literal[lang].security}
            </Typography>
            <Typography>₹{order.totalSecurity.toFixed(2)}</Typography>
          </Box>
        )}

        {!isMobile && (
          <Box sx={{ flex: { xs: "1 1 auto", sm: "1 1 auto" } }}>
            <Typography variant="subtitle2" color="textSecondary">
              {Literal[lang].shipTo}
            </Typography>
            <Typography>{order?.address?.fullName}</Typography>
          </Box>
        )}

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />
        <div style={{flexGrow: 1}}>
         <MoreOptionsForOrder
            setLoading={setLoading}
            setImageRefreshKey={setImageRefreshKey}
            imageRefreshKey={imageRefreshKey}
            openDetails={openDetails}
            order={order}
            entity="tile"
            isMobile={isMobile}
            refresh={refresh}
            isManager={isManager}
            showSnackBar={showSnackBar} 
            refreshSidebarCounts={refreshSidebarCounts}
          />
        </div>
      </Stack>
      <Divider sx={{ my: 2 }} />
      <Stack direction="row" justifyContent="space-between" alignItems="center" style={{ cursor: "pointer" }} onClick={openDetails} >
        <Typography variant="h6">{formatOrderStatus(order?.status, isManager)}</Typography>
      </Stack>


        {/* Order items images */}
        <Stack direction="row" gap={2} pt={2} flexWrap={"wrap"} onClick={openDetails} >
          {order.items?.map((item) => (
            <Box
              key={item.productId}
              sx={{
                flexShrink: 0,
                cursor: "pointer",
                width: { xs: "30%", sm: 70 },
                aspectRatio: "2 / 3",
                overflow: "hidden",
                borderRadius: "5%",
                backgroundColor: 'var(--color-gray-100)', // Subtle background while loading
              }}
            >
              <img
                // ✅ 2. Dynamic Source: Use fetched blob if available, otherwise use dynamic fallback
                src={images[item.productId] || fallbackImg}
                alt={item.productTitle}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
              />
            </Box>
          ))}
        </Stack>
    </Paper>
  );
};

export default OrderTile;