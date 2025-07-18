import React, { useContext } from "react";
import { Box, Typography, Divider } from "@mui/material";
import BaseTextField2 from "@ui/components/UI/fields/BaseTextField2";
import Literal from "@ui/literals";
import { AuthContext } from '@utils/helper/ApiConfig/AuthProvider';

const DELIVERY_CHARGE = 49;
const FREE_DELIVERY_THRESHOLD = 999;
const COUPON_CODES = {
  SAVE10: 0.1,
  SAVE50: 0.5,
};

const OrderSummary = ({
  lang,
  coupon,
  entity,
  setCoupon,
  applyCouponCode,
  couponApplied,
  couponError,
  discount,
  selectedItems,
  totalRefundableSecurity,
  selectedTotal,
  emptyCart,
  onProceedToBuy,
  proceedLabel,
  setIsLoginSignupOpen
}) => {

  const { user } = useContext(AuthContext);
  
  return (
      <Box sx={{ border: `1px solid var(--color-gray-300)`, borderRadius: '16px', p: 2 }}>
          
        <Typography variant="h6" gutterBottom>
          {Literal[lang].orderSummary}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {Literal[lang].applyCoupon}
          </Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: 'center' }}>
            <BaseTextField2
              id="coupon"
              label="coupon"
              type="text"
              name="coupon"
              required
              placeHolderText={Literal[lang].textPlaceholder.replace("{0}", Literal[lang]["coupon"])}
              value={coupon}
              onChange={(e) => setCoupon(e.target.value.trim().toUpperCase())}
            />
            <button
              type="button"
              className="form-skip-button"
              style={{ minWidth: '50px', height: '48px', width: '80px', marginTop: '-4px' }}
              onClick={applyCouponCode}
            >
              {Literal[lang].apply}
            </button>
          </Box>
          {couponApplied && (
            <Typography variant="caption" color={`var(--success-color)`}>
              {Literal[lang].couponApplied}{coupon} ({COUPON_CODES[coupon] * 100}% off)
            </Typography>
          )}
          {couponError && (
            <Typography variant="caption" color="error">
              {Literal[lang].invalidCoupon}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {Literal[lang].itemsSelected}:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              {selectedItems.length}
            </Typography>
          </div>
          {selectedItems.filter(item => item.inventoryType === "RENTAL").length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">• {Literal[lang].itemsForRenting}:</Typography>
              <Typography variant="body2">{selectedItems.filter(item => item.inventoryType === "RENTAL").length}</Typography>
            </div>
          )}
          {selectedItems.filter(item => item.inventoryType === "SALE").length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2">• {Literal[lang].itemsForPurchasing}:</Typography>
              <Typography variant="body2">{selectedItems.filter(item => item.inventoryType === "SALE").length}</Typography>
            </div>
          )}
        </Box>

        <Divider sx={{ mb: 1 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1">{Literal[lang].subTotal}:</Typography>
          <Typography variant="body1">₹{selectedTotal.toFixed(2)}</Typography>
        </div>

        {discount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1" color="var(--success-color)">
              {Literal[lang].discount}:
            </Typography>
            <Typography variant="body1" color="var(--success-color)">
              -₹{(selectedTotal * discount).toFixed(2)}
            </Typography>
          </div>
        )}
        {totalRefundableSecurity > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1" color="primary">
              {Literal[lang].refundableSecurityTotal || "Refundable Security Deposit"}:
            </Typography>
            <Typography variant="body1" color="primary">
              ₹{totalRefundableSecurity.toFixed(2)}
            </Typography>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1">{Literal[lang].deliveryCharges}:</Typography>
          {selectedTotal >= FREE_DELIVERY_THRESHOLD ? (
            <Typography variant="body1" color="var(--success-color)">
              {Literal[lang].freeCaps}
            </Typography>
          ) : (
            <Typography variant="body1">₹{DELIVERY_CHARGE}</Typography>
          )}
        </div>

        <Divider sx={{ my: 1 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">{Literal[lang].total}:</Typography>
          <Typography variant="h6">
            ₹{
              (selectedTotal * (1 - discount) + totalRefundableSecurity +
                (selectedTotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE))
                .toFixed(2)
            }
          </Typography>
        </div>

        <div style={{ display: "flex", justifyContent: 'space-between', gap: '20px', marginTop: '16px' }}>
          <button
            type="button"
            className="form-button"
            style={{ minWidth: '180px', height: '45px', flex: 1.8 }}
            disabled={selectedItems.length === 0}
            onClick={()=> {user? onProceedToBuy(): setIsLoginSignupOpen(true)}}
          >
            {proceedLabel}
          </button>
          {entity=="cart" && 
              <button
              type="button"
              className="form-cancel-button"
              style={{ minWidth: '100px', height: '45px', flex: 1 }}
              onClick={emptyCart}
              >
              {Literal[lang].clearCart}
              </button>
          }
        </div>
      </Box>
    // </Card>
  );
};

export default OrderSummary;
