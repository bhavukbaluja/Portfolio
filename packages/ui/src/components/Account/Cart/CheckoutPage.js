import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "@utils/helper/ApiConfig/CartContext";
import { PanelServices } from "@utils/services/PanelServices";
import { OrderServices } from "@utils/services/OrderServices";
import { PaymentServices } from "@utils/services/PaymentServices";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import {isEmpty} from "@utils/helper/Helper";
import Literal from "@ui/literals";
import AddressSelectorDialog from "./AddressSelectorDialog";
import OrderSummary from "./OrderSummary";
import CheckoutItemTile from "./CheckoutItemTile";
import Razorpay from "razorpay";
import propertiesData from "@utils/Config/Properties.json";
import { AuthContext } from '@utils/helper/ApiConfig/AuthProvider';
import CompanyLogo from '@assets/LogoLight.png';
import AddressBox from "./AddressBox";
import ShipTypeBox from "./ShipTypeBox";

const CheckoutPage = ({ isMobile, showSnackBar, setLoading, loading, isManager = false, openTracking, setOpenTracking }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { emptyCart } = useCart();
  const { getGridData } = PanelServices();
  const { getOrdersByStatuses, updateOrderStatus, updateOrderAddress } = OrderServices();
  const { savePaymentInfo } = PaymentServices();
  const { lang } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const entity="checkout";
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get("orderId"));
  const properties = propertiesData[lang];

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [order, setOrder] = useState(null);
  const [shipType, setShipType] = useState(null);

  // 🔥 New: Local loading state for this component's data fetch
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(true);

  const applyCouponCode = () => {
    const COUPON_CODES = {
      SAVE10: 0.1,
      SAVE50: 0.5,
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
    const loadDraftOrder = async () => {
      setIsCheckoutLoading(true); // 🔥 Use the local loading state here
      try {
        const drafts = await getOrdersByStatuses(["DRAFT"]);
        const draft = drafts?.data?.[0];
        if (!draft || !draft.items || draft.items.length === 0) {
          showSnackBar("No draft order found", "error");
          navigate("/cart");
          return;
        }
        setOrder(draft);
        setShipType(draft?.shipType);
        setOrderId(draft.id);
        setSelectedAddress(draft.address);
      } catch (error) {
        console.error("Failed to fetch draft order:", error);
        showSnackBar("Failed to load order", "error");
        navigate("/cart");
      } finally {
        setIsCheckoutLoading(false); // 🔥 Use the local loading state here
      }
    };

    loadDraftOrder();
  }, []);

  const selectedTotal = order?.items?.reduce((acc, item) => {
    const price = item?.price || 0;
    return acc + price * (item.quantity || 1);
  }, 0);

  const totalRefundableSecurity = order?.items?.reduce((acc, item) => {
    if (item.inventoryType === "RENTAL") {
      const security = item?.security || 0;
      return acc + security * (item?.quantity || 1);
    }
    return acc;
  }, 0);

  const handlePlaceOrder = async () => {
    if (!orderId || !selectedAddress) {
      showSnackBar("Missing order ID or address", "error");
      return;
    }
  
    try {
      setLoading(true); // This remains global as it's a critical operation
      
      const razorpayOrder = await updateOrderStatus(orderId, "PENDING", selectedAddress?.id, shipType);
      
      if (razorpayOrder && razorpayOrder.id) {
        const razorpayOptions = {
          key: properties.VITE_RAZORPAY_KEY_ID,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: properties.BrandName,
          description: orderId+" Payment",
          image: CompanyLogo,
          order_id: razorpayOrder.id,
          handler: async function (response) {
            try {
              let res = await savePaymentInfo(response);

              if(res?.msg?.includes("verified")){
                const placedRes = await updateOrderStatus(orderId, "PLACED", null, null, res?.data);
              }

              showSnackBar("Payment successful!", "success");
              emptyCart();
              navigate(`/order/confirmation?orderId=${orderId}`);
            } catch (err) {
              showSnackBar("Payment failed to save", "error");
            }
          },
          prefill: {
            name: user?.name,
            email: user?.email,
            contact: user?.mobile,
          },
          theme: {
            color: `var(--maindark-color)`,
          },
        };
  
        const rzp = new window.Razorpay(razorpayOptions);
        rzp.open();
      } else {
        showSnackBar("Order placed without Razorpay payment", "info");
        emptyCart();
        // navigate(`/order/confirmation?orderId=${orderId}`);
      }
    } catch (err) {
      console.error("Failed to place order:", err);
      showSnackBar("Failed to place order", "error");
    } finally {
      setLoading(false); // This remains global
    }
  };  
  
  const updateDraft= async (entity, addressId) => {
    try {
      setLoading(true);
      await updateOrderAddress(addressId);
  
      if(entity=="address"){
        showSnackBar(Literal[lang].chosenAddressUpdated)
      }
      else{
        showSnackBar(Literal[lang].draftUpdated)
      }
    } catch (err) {
      console.error("Error creating draft order:", err);
      showSnackBar("Failed to create draft order", "error");
    } finally {
      setLoading(false);
    }
  }

  // 🔥 Use the local loading state to show the local spinner
  if (isCheckoutLoading) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        gap: 3,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography variant="h4" gutterBottom>
        {Literal[lang].checkout}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 3,
            p: 2,
            pb: 0,
            width: "100%",
          }}
        >
         <AddressBox isMobile={isMobile} setAddressModalOpen={setAddressModalOpen} selectedAddress={selectedAddress}/>
          <ShipTypeBox orderItems={order?.items} shipType={shipType} setShipType={setShipType} entity="checkout" isMobile={isMobile}/>

          <Box sx={{ mt: 2 }} >
            <Typography variant="h6" gutterBottom sx={{ml:1}}>
              {Literal[lang].itemsInOrder}:
            </Typography>
            {order?.items?.map((item, i) => (
              <CheckoutItemTile key={item?.id+i} item={item} entity={entity} isManager={isManager} isMobile={isMobile} setLoading={setLoading} setOrder={setOrder} showSnackBar={showSnackBar}/>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 2,
            p: 2,
            gap: 3,
            width: "100%",
          }}
        >
          <OrderSummary
            lang={lang}
            entity={entity}
            coupon={coupon}
            disableButton={isEmpty(shipType) && order?.items?.length>1}
            setCoupon={setCoupon}
            applyCouponCode={applyCouponCode}
            couponApplied={couponApplied}
            couponError={couponError}
            discount={discount}
            deliveryCharges={order?.deliveryCharges}
            selectedItems={order?.items}
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
        isMobile={isMobile}
        selectedAddress={selectedAddress}
        updateDraft={updateDraft}
        showSnackBar={showSnackBar}
        setSelectedAddress={setSelectedAddress}
        onSelect={(addr) => {
          setSelectedAddress(addr);
          setAddressModalOpen(false);
        }}
      />
    </Box>
  );
};

export default CheckoutPage;