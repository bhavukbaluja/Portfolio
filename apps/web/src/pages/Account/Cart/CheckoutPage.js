import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "@utils/helper/ApiConfig/CartContext";
import { PanelServices } from "@utils/services/PanelServices";
import { OrderServices } from "@utils/services/OrderServices";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import Literal from "@ui/literals";
import AddressSelectorDialog from "./AddressSelectorDialog";
import OrderSummary from "./OrderSummary";
import { Address_URL } from "@utils/Config/URLs";

const CheckoutPage = ({ isMobile, showSnackBar, setLoading, loading }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { cart, selectedItems, emptyCart } = useCart();
  const { getGridData } = PanelServices();
  const { updateOrderStatus } = OrderServices();
  const { lang } = useContext(LanguageContext);

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);

  const applyCouponCode = () => {
    const COUPON_CODES = {
      SAVE10: 0.1,
      SAVE50: 0.5
    };
    if (COUPON_CODES[coupon]) {
      setDiscount(COUPON_CODES[coupon]);
      setCouponApplied(true);
      setCouponError(false);
    } else {
      setDiscount(0);
      setCouponApplied(false);
      setCouponError(true);
    }
  };

  useEffect(() => {
    const loadAddresses = async () => {
      const url = `${Address_URL}/user?`;
      await getGridData(url)
        .then((res) => {
          setAddresses(res?.data || []);
          setSelectedAddress(res?.data.find((a) => a.isPrimary) || res?.data[0]);
        })
        .finally(() => setLoading(false));
    };
    loadAddresses();
  }, []);

  useEffect(() => {
    if (!loading && (!selectedItems || selectedItems.length === 0)) {
      navigate("/cart");
    }
  }, [selectedItems, loading]);

  const selectedTotal = selectedItems.reduce((acc, item) => {
    const inventory = item.product?.inventories?.find(
      (inv) => inv?.type === item.inventoryType
    );
    const variant = inventory?.inventoryVariants?.find(
      (v) => v?.size?.id === item.sizeChartId
    );
    const price =
      variant?.salePrice -
        (variant?.salePrice * (variant?.discount || 0)) / 100 ||
      item?.price ||
      0;
    return acc + price * (item.quantity || 1);
  }, 0);

  const totalRefundableSecurity = selectedItems.reduce((acc, item) => {
    if (item.inventoryType === "RENTAL") {
      const inventory = item.product?.inventories?.find(
        (inv) => inv?.type === item.inventoryType
      );
      const security = inventory?.security || 0;
      return acc + security * (item.quantity || 1);
    }
    return acc;
  }, 0);

  const handlePlaceOrder = async () => {
    if (!orderId || !selectedAddress) {
      showSnackBar("Missing order ID or address", "error");
      return;
    }

    try {
      setLoading(true);
      await updateOrderStatus(orderId, "PLACED", selectedAddress);
      showSnackBar("Order placed successfully!", "success");
      emptyCart();
      navigate(`/order/confirmation?orderId=${orderId}`);
    } catch (err) {
      console.error("Failed to place order:", err);
      showSnackBar("Failed to place order", "error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography>{Literal[lang].loadingCheckout || "Loading checkout..."}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2, gap: 3, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        {Literal[lang].checkout}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          gap: 3,
          alignItems: "flex-start",
          width: '100%'
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flex: 3, p: 2, gap: 3, width: '100%' }}>
          <Box sx={{ border: "1px solid #ddd", borderRadius: 2, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {Literal[lang].deliveryAddress}
            </Typography>
            {selectedAddress ? (
              <Box>
                <Typography>{selectedAddress.fullName}</Typography>
                <Typography>{selectedAddress.streetAddress1}</Typography>
                <Typography>
                  {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pinCode}
                </Typography>
                <Typography>Phone: {selectedAddress.mobile}</Typography>
                <button
                  type="button"
                  className="form-skip-button"
                  style={{ width: '100px', height: '45px', flex: 1 }}
                  onClick={() => setAddressModalOpen(true)}
                >
                  {Literal[lang].change}
                </button>
              </Box>
            ) : (
              <Typography color="error">{Literal[lang].noAddressFound}</Typography>
            )}
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              {Literal[lang].itemsInOrder}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {selectedItems.map((item, i) => (
              <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Box>
                  <Typography>{item.product?.title}</Typography>
                  <Typography variant="body2">
                    {Literal[lang].size}: {item.size?.size || "-"} ({item.inventoryType})
                  </Typography>
                </Box>
                <Typography>
                  ₹{Math.round(item.price || 0)} x {item.quantity}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ flex: 2, width: '100%' }}>
          <OrderSummary
            lang={lang}
            entity="checkout"
            coupon={coupon}
            setCoupon={setCoupon}
            applyCouponCode={applyCouponCode}
            couponApplied={couponApplied}
            couponError={couponError}
            discount={discount}
            selectedItems={selectedItems}
            totalRefundableSecurity={totalRefundableSecurity}
            selectedTotal={selectedTotal}
            proceedLabel={Literal[lang].checkout}
            emptyCart={emptyCart}
            onProceedToBuy={handlePlaceOrder}
          />
        </Box>
      </Box>

      <AddressSelectorDialog
        open={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        addresses={addresses}
        selectedAddress={selectedAddress}
        onSelect={(addr) => {
          setSelectedAddress(addr);
          setAddressModalOpen(false);
        }}
      />
    </Box>
  );
};

export default CheckoutPage;
