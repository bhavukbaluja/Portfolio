import { useFallbackImage } from '@utils/helper/FallbackImages';
import {
    Box,
    Card,
    CardContent,
    Divider,
    IconButton,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { URL_CONFIG, SizeChart_URL } from "@utils/Config/URLs";
import { fetchImage, formatOrderStatus } from "@utils/helper/Helper";
import { WebsiteServices } from "@utils/services/WebsiteServices";
import React, { useContext, useEffect, useState } from "react";
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useNavigateTo from "@utils/helper/ApiConfig/useNavigateTo";
import OrderStatusPopover from "../Order/OrderStatusPopover";
import { OrderServices } from "@utils/services/OrderServices";
import ModeOfTravelOutlinedIcon from '@mui/icons-material/ModeOfTravelOutlined';

// Cache persistence
const imageCache = new Map();

const CheckoutItemTile = ({
  item,
  isManager = false,
  isMobile,
  entity,
  setLoading,
  setOrder,
  showSnackBar,
  refreshSidebarCounts,
  handleOpenTracking,
}) => {

  // ✅ 1. Get dynamic fallback (instant update on theme toggle)
  const fallbackImg = useFallbackImage(entity);
  
  const { lang } = useContext(LanguageContext);
  const [imageUrl, setImageUrl] = useState(null); // Init as null
  const [sizeChart, setSizeChart] = useState([]);
  const { getEntities } = WebsiteServices();
  const [anchorEl, setAnchorEl] = useState(null);
  const NavigateTo = useNavigateTo();
  const { updateOrderItemStatus } = OrderServices();

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      if (!item.productImageUrl) return;

      // Check Cache
      if (imageCache.has(item.productImageUrl)) {
        if (isMounted) setImageUrl(imageCache.get(item.productImageUrl));
      } else {
        // Fetch
        try {
          const fullUrl = `${URL_CONFIG.API_URL}/${item.productImageUrl}`;
          const blob = await fetchImage(fullUrl);
          
          if (blob && isMounted) {
            imageCache.set(item.productImageUrl, blob);
            setImageUrl(blob);
          }
          // On fail: do nothing (stays null), render uses fallbackImg
        } catch (e) {
          console.error("Image load error", e);
        }
      }
    };

    const loadSizeChart = async () => {
      if (item?.sizeChartId) {
        try {
            const res = await getEntities(`${SizeChart_URL}/get/${item?.sizeChartId}`);
            if(isMounted) setSizeChart(res);
        } catch (e) { console.log(e); }
      }
    };

    loadImage();
    loadSizeChart();

    return () => { isMounted = false; };
  }, [item]);

  const handleNavigateToProduct = () => {
    const url = `${URL_CONFIG.SITE_URL}/product/${item.productId}?inventoryType=${item.inventoryType}&sizeId=${item.sizeChartId || "default"}`;
    window.open(url, "_blank");
  };

  const handleAction = async (action, status) => {
    try {
      setLoading(true);
      const res = await updateOrderItemStatus(item?.id, action);
      if (res?.msg) {
        showSnackBar(res?.msg);
        setOrder(res?.data);
        refreshSidebarCounts();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clickedTracking = () => {
    handleOpenTracking({
      entity: "orderItem",
      entityId: item?.id
    });
  };

  return (
    <Card variant="outlined" sx={{ mb: 2, borderRadius: "16px" }}>
      <Box display="flex" flexDirection={{ xs: "column", sm: "row" }}>
        {/* Image */}
        <Box
          sx={{
            flexShrink: 0,
            cursor: "pointer",
            width: { xs: "100%", sm: 160 },
            aspectRatio: "2 / 3",
            overflow: "hidden",
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: { sm: "16px", xs: 0 },
            backgroundColor: 'var(--color-gray-100)', // placeholder bg
          }}
        >
          <img
            // ✅ 2. Dynamic Source: Use fetched blob if ready, otherwise dynamic fallback
            src={imageUrl || fallbackImg}
            alt={item.productTitle}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              display: "block",
            }}
          />
        </Box>

        {/* Content */}
        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography variant="h6">{item.productTitle}</Typography>
            <div style={{ display: 'flex', flexDirection: 'row', mt: 0.5 }}>
              <Typography variant="body2" color="text.secondary">{Literal[lang].sku}:</Typography>
              <Typography variant="body2" sx={{ ml: '6px' }}>{item?.sku}</Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', mt: 0.5 }}>
              <Typography variant="body2" color="text.secondary">{Literal[lang].inventoryType}:</Typography>
              <Typography variant="body2" sx={{ ml: '6px' }}>
                {item.inventoryType.toLowerCase() === "sale" ? Literal[lang].purchase : Literal[lang].rent}
              </Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', mt: 0.5 }}>
              <Typography variant="body2" color="text.secondary">{Literal[lang].size}:</Typography>
              <Typography variant="body2" sx={{ ml: '6px' }}>
                {sizeChart?.size + (sizeChart?.userId != 1 ? " (Custom)" : "") || "N/A"}
              </Typography>
            </div>
          </CardContent>

          {/* Bottom actions */}
          <Stack
            direction={isMobile ? 'column' : "row"}
            justifyContent="space-between"
            alignItems="center"
            style={{ cursor: "pointer", padding: '16px', paddingBottom: '0' }}
          >
            <Typography variant="body1">{formatOrderStatus(item?.status, isManager, false)}</Typography>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '10px' }}>
              {entity=="order" && ( 
                <Tooltip title={Literal[lang].trackStatus}>
                    <IconButton size="small" onClick={clickedTracking}>
                    <ModeOfTravelOutlinedIcon />
                    </IconButton>
                </Tooltip>
              )}
              <Tooltip title={Literal[lang].viewProductPage}>
                <IconButton size="small" onClick={handleNavigateToProduct}>
                  <WysiwygOutlinedIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={Literal[lang].viewSize}>
                <IconButton size="small">
                  <StraightenOutlinedIcon />
                </IconButton>
              </Tooltip>
              {isManager && (
                <Tooltip title={Literal[lang].moreOptions}>
                  <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
                    <KeyboardArrowDownIcon />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          </Stack>
          <Divider sx={{ my: 1 }} />
          <Stack style={{ flexDirection: "row", gap: 2, padding: '16px', justifyContent: 'space-evenly', alignItems: 'center', textAlign: 'center', flexWrap: 'wrap', paddingTop: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="body2" color="text.secondary">{Literal[lang].quantity}:</Typography>
              <Typography variant="body1" sx={{ ml: '6px' }}>{item.quantity}</Typography>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="body2" color="text.secondary">{Literal[lang].price}:</Typography>
              <Typography variant="body1" sx={{ ml: '6px' }}>₹{item.price}/-</Typography>
            </div>
            {item.inventoryType === "RENTAL" && (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Typography variant="body2" color="text.secondary">{Literal[lang].security}:</Typography>
                <Typography variant="body1" sx={{ ml: '6px' }}>₹{item.security}/-</Typography>
              </div>
            )}
          </Stack>
        </Box>
      </Box>

      <OrderStatusPopover
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        orderStatus={item?.status}
        onAction={handleAction}
      />
    </Card>
  );
};

export default CheckoutItemTile;