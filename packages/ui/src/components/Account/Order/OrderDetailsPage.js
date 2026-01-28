import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useSearchParams, Link } from "react-router-dom";
import { OrderServices } from "@utils/services/OrderServices";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import Literal from "@ui/literals";
import CheckoutItemTile from "../Cart/CheckoutItemTile";
import AddressBox from "../Cart/AddressBox";
import OrderSummary from "../Cart/OrderSummary";
import { formatIndianDateTime } from "@utils/helper/Helper";
import ShipTypeBox from "../Cart/ShipTypeBox";
import TrackingDialog from "./TrackingDialog";
import MoreOptionsForOrder from "./MoreOptionsForOrder";

const OrderDetailsPage = ({
  isMobile,
  action,
  isManager = false,
  setLoading, // The global setLoading prop from App.jsx
  loading,
  showSnackBar,
  refreshSidebarCounts,
  imageRefreshKey,
  setImageRefreshKey
}) => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { getOrderById } = OrderServices();
  const { lang } = useContext(LanguageContext);

  const entity="order";
  const [order, setOrder] = useState(null);
  // 🔥 New: Local loading state for fetching the order details
  const [isOrderLoading, setIsOrderLoading] = useState(true);

  // Consolidated tracking state
  const [trackingState, setTrackingState] = useState({
    open: false,
    entity: null,
    entityId: null
  });

  const fetchOrderDetails = async () => {
    try {
      setIsOrderLoading(true); // 🔥 Use the local loading state here
      const res = await getOrderById(orderId);
      setOrder(res?.data);
    } catch (err) {
      console.error("Failed to fetch order:", err);
    } finally {
      setIsOrderLoading(false); // 🔥 Use the local loading state here
    }
  };

  useEffect(() => {
    if (orderId) fetchOrderDetails();
  }, [orderId]);

  // 🔥 Use the local loading state to show the local spinner
  if (isOrderLoading) {
    return (
      <Box p={4} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  if (!order) {
    return (
      <Box p={4}>
        <Typography color="error">{Literal[lang].orderNotFound}</Typography>
      </Box>
    );
  }

  const handleOpenTracking = ({ entity, entityId }) => {
    setTrackingState({
      open: true,
      entity,
      entityId
    });
  };

  const address = order?.address;
  const items = order?.items || [];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2, alignItems: "center", width: "100%" }}>
      {/* Title */}
      {action === "confirmation" ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <Typography variant="h4" gutterBottom style={{ color: `var(--success-color)` }}>
            {Literal[lang].orderPlacedTitle}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {Literal[lang].orderConfirmationSent}

          </Typography>
        </div>
      ) : (
        <Typography variant="h4" gutterBottom>
          {Literal[lang].orderDetails}
        </Typography>
      )}

      {/* Header with actions */}
      <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "center", pt: 2, width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 3, pl: 2, pb: 0 }}>
          <Typography variant="h6" gutterBottom>{Literal[lang].orderId}: {order.id}</Typography>
          <Typography variant="h6" gutterBottom>{Literal[lang].orderPlacedOn}: {formatIndianDateTime(order.orderPlacedOn)}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", flex: 2, p: 2, justifyContent: 'space-evenly', width: "100%" }}>
          {/* <div style={{ cursor: 'pointer' }} onClick={() => handleOpenTracking({ entity: "order", entityId: order?.id })}>
            <Typography color="secondary" fontWeight="bold">{Literal[lang].trackStatus}</Typography>
          </div>
          <Link to="/orders" style={{ textDecoration: "none" }}>
            <Typography color="primary" fontWeight="bold">{Literal[lang][isManager ? "viewAllOrders" : "viewOrders"]}</Typography>
          </Link>
          {!isManager && (
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography color="info" fontWeight="bold">{Literal[lang].continueShopping}</Typography>
            </Link>
          )} */}
          <MoreOptionsForOrder
            setLoading={setLoading}
            setImageRefreshKey={setImageRefreshKey}
            imageRefreshKey={imageRefreshKey}
            order={order}
            isMobile={true}
            entity="page"
            refresh={fetchOrderDetails}
            isManager={isManager}
            showSnackBar={showSnackBar}
            refreshSidebarCounts={refreshSidebarCounts}
          />
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: "flex-start", width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 3, p: 2, pb: 0 }}>
          <AddressBox isMobile={isMobile} selectedAddress={address} />
          <ShipTypeBox orderItems={items} shipType={order?.shipType} entity="order" isMobile={isMobile} isManager={isManager} />

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ ml: 1 }}>{Literal[lang].itemsInTheOrder}:</Typography>
            {items?.map((item) => (
              <CheckoutItemTile
                key={item.id}
                item={item}
                entity={entity}
                isManager={isManager}
                isMobile={isMobile}
                setLoading={setLoading}
                setOrder={setOrder}
                showSnackBar={showSnackBar}
                refreshSidebarCounts={refreshSidebarCounts}
                handleOpenTracking={handleOpenTracking}
              />
            ))}
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", flex: 2, p: 2, gap: 3 }}>
          <OrderSummary
            lang={lang}
            entity={entity}
            payment={order?.payment}
            discount={order?.discount}
            deliveryCharges={order?.deliveryCharges}
            selectedItems={items}
            totalRefundableSecurity={order?.totalSecurity}
            selectedTotal={order?.totalAmount || 0}
            proceedLabel={Literal[lang].checkout}
          />
        </Box>
      </Box>

      {/* Tracking Dialog */}
      {trackingState.open && (
        <TrackingDialog
          open={trackingState.open}
          setOpen={(isOpen) => setTrackingState(prev => ({ ...prev, open: isOpen }))}
          entity={trackingState.entity}
          entityId={trackingState.entityId}
          setLoading={setLoading}
        />
      )}
    </Box>
  );
};

export default OrderDetailsPage;