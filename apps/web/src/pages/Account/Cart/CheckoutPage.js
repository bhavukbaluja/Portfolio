import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
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
import BaseRadioGroup from "@ui/components/UI/fields/BaseRadioGroup";
import Razorpay from "razorpay";
import properties from "@utils/Config/Properties.json";
import { AuthContext } from '@utils/helper/ApiConfig/AuthProvider';
import CompanyLogo from '@assets/Logo.png';

const CheckoutPage = ({ isMobile, showSnackBar, setLoading, loading }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { emptyCart } = useCart();
  const { getGridData } = PanelServices();
  const { getOrdersByStatus, updateOrderStatus, updateOrderAddress } = OrderServices();
  const { savePaymentInfo } = PaymentServices();
  const { lang } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);

  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get("orderId"));
  const [orderItems, setOrderItems] = useState([]);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [order, setOrder] = useState(null);
  const [shipType, setShipType] = useState(null);

  const deliveryOpt = [
    { label: "shipTogether", value: "ShipTogether" },
    { label: "shipAsap", value: "ShipAsap" },
  ];

  const handleTypeSelect = (value) => {
    setShipType(value);
  };

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
      setLoading(true);
      try {
        const drafts = await getOrdersByStatus("draft");
        const draft = drafts?.[0];
        if (!draft || !draft.items || draft.items.length === 0) {
          showSnackBar("No draft order found", "error");
          navigate("/cart");
          return;
        }
        setOrder(draft);
        setOrderItems(draft.items);
        setShipType(draft?.shipType);
        setOrderId(draft.id);
        setSelectedAddress(draft.address);
      } catch (error) {
        console.error("Failed to fetch draft order:", error);
        showSnackBar("Failed to load order", "error");
        navigate("/cart");
      } finally {
        setLoading(false);
      }
    };

    loadDraftOrder();
  }, []);

  const selectedTotal = orderItems.reduce((acc, item) => {
    const price = item?.price || 0;
    return acc + price * (item.quantity || 1);
  }, 0);

  const totalRefundableSecurity = orderItems.reduce((acc, item) => {
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
      setLoading(true);
      
      // ⬇️ Call your existing backend method, now returns Razorpay order if status is PLACED
      const razorpayOrder = await updateOrderStatus(orderId, "PENDING", selectedAddress?.id, shipType);
      // const demo = {
      //   razorpay_payment_id: "pay_QwtzkWrtcEe0ej",
      //   razorpay_order_id: "order_QwtzFSBzhNCoPv",
      //   razorpay_signature: "2dc42dbf62f6cc9ac0af192cae9350a7935b91bac420ba290472a47c308ce080"
      // };
      
      // let res = await savePaymentInfo(demo); // stringifying the actual object
      
      // if (res?.msg?.includes("verified")) {
      //   const placedRes = await updateOrderStatus(orderId, "PLACED", null, null, res?.data);
      // }
      
      if (razorpayOrder && razorpayOrder.id) {
        // 🔁 Initialize Razorpay payment
        const razorpayOptions = {
          key: properties.VITE_RAZORPAY_KEY_ID,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: properties.BrandName,
          description: orderId+" Payment",
          image: <CompanyLogo/>,
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
      setLoading(false);
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
      // NavigateTo(`/checkout?orderId=${order.id}`); // Pass the orderId in URL
    } catch (err) {
      console.error("Error creating draft order:", err);
      showSnackBar("Failed to create draft order", "error");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography>
          {Literal[lang].loadingCheckout || "Loading checkout..."}
        </Typography>
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
          <Box sx={{ border: `1px solid var(--color-gray-300)`, borderRadius: '16px', p: 2 }}>
            
            {selectedAddress ? (
              <div style={{display: 'flex', flexDirection: isMobile? 'column': 'row', width: '100%', justifyContent: isMobile? 'center':'space-between'}}>
                <div flex={3}>
                  <Typography variant="h6" gutterBottom fontWeight= '501 !important' letterSpacing='0.05em'>
                      {Literal[lang].deliveringTo}: {selectedAddress?.fullName}
                  </Typography>
                  <Box>
                      <Typography variant="body2">
                        {selectedAddress.streetAddress1}, {selectedAddress.streetAddress2}
                      </Typography>
                      <Typography variant="body2">
                        {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pinCode},
                      </Typography>
                      <Typography variant="body2">
                        {selectedAddress.country}
                      </Typography>
                      <Typography variant="body2">
                        <b>{Literal[lang].landmark}:</b> {selectedAddress.landmark}
                      </Typography>
                      <Typography variant="body2"><b>{Literal[lang].mobile}:</b> {selectedAddress.mobile}</Typography>
                  </Box>
                </div>
                <div flex={1} style={{display:'flex'}}>
                  <button
                    type="button"
                    className="form-skip-button"
                    style={{ width: "100px", height: "45px", flex: 1 }}
                    onClick={() => setAddressModalOpen(true)}
                  >
                    {Literal[lang].change}
                  </button>
                </div>
              </div>
            ) : (
              <Typography color="error">
                {Literal[lang].noAddressFound}
              </Typography>
            )}
          </Box>
          {orderItems?.length>1 && (
            <Box sx={{ border: `1px solid var(--color-gray-300)`, borderRadius: '16px', p: 2, mt:2 }}>
              <Box sx={{ flex: 1, minWidth: isMobile ? "100%" : "48%" }}>
                <BaseRadioGroup
                  required={true}
                  label="shipItems"
                  title="shipItems"
                  options={deliveryOpt}
                  value={shipType}
                  // disabled={readOnly}
                  onChange={(value) => handleTypeSelect(value)}
                />
              </Box>
            </Box>
          )}
          <Box sx={{ mt: 2 }} >
            {/* <Divider sx={{ mb: 2 }} /> */}
            <Typography variant="h6" gutterBottom sx={{ml:1}}>
              {Literal[lang].itemsInOrder}:
            </Typography>
            {orderItems?.map((item, i) => (
              <CheckoutItemTile key={item.id} item={item} />
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
            entity="checkout"
            coupon={coupon}
            disableButton={isEmpty(shipType) && orderItems.length>1}
            setCoupon={setCoupon}
            applyCouponCode={applyCouponCode}
            couponApplied={couponApplied}
            couponError={couponError}
            discount={discount}
            selectedItems={orderItems}
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
