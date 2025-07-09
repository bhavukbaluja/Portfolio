import fallbackImg from "@assets/NoImage.png";
import {
  Box,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { Product_URL, SizeChart_URL, URL_CONFIG } from "@utils/Config/URLs";
import { useCart } from "@utils/helper/ApiConfig/CartContext";
import { fetchImage } from "@utils/helper/Helper";
import { WebsiteServices } from "@utils/services/WebsiteServices";
import { OrderServices } from "@utils/services/OrderServices";
import React, { useContext, useEffect, useState } from "react";
import CartItemTile from "./CartItemTile";
import BaseTextField2 from "@ui/components/UI/fields/BaseTextField2";
import OrderSummary from "./OrderSummary";
import useNavigateTo from "@utils/helper/ApiConfig/useNavigateTo";

const DELIVERY_CHARGE = 49;
const FREE_DELIVERY_THRESHOLD = 999;
const COUPON_CODES = {
  SAVE10: 0.1,
  SAVE50: 0.5,
};

const imageCache = new Map();

const CartWrapper = ({ isMobile, showSnackBar, setLoading, loading }) => {
  const { cart, emptyCart } = useCart();
  const { getEntities } = WebsiteServices();
  const {createDraftOrder} = OrderServices();
  const { lang } = useContext(LanguageContext);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [enrichedCart, setEnrichedCart] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState(false);
  const [removedItem, setRemovedItem] = useState(null);
  const NavigateTo = useNavigateTo();

  const isAllSelected = enrichedCart.length > 0 && selectedIds.size === enrichedCart.length;

  const { addToCart } = useCart(); // Make sure this is included if not already

  const undoRemoveFromCart = () => {
    if (removedItem) {
      addToCart({
        productId: removedItem.productId,
        sizeChartId: removedItem.sizeChartId,
        inventoryType: removedItem.inventoryType,
        quantity: removedItem.quantity || 1,
      });
      showSnackBar(`${Literal[lang].itemRestored || "Item restored to cart"}`);
      setRemovedItem(null);
    }
  };

  const handleToggleSelect = (itemKey) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(itemKey)) {
      newSet.delete(itemKey);
    } else {
      newSet.add(itemKey);
    }
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      const allIds = new Set(
        enrichedCart.map(
          (item) => `${item.productId}_${item.sizeChartId || ""}_${item.inventoryType}`
        )
      );
      setSelectedIds(allIds);
    }
  };

  const applyCouponCode = () => {
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
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const enriched = await Promise.all(
          cart.map(async (item) => {
            const [productRes, sizeRes] = await Promise.all([
              getEntities(`${Product_URL}/${item.productId}`),
              item.sizeChartId
                ? getEntities(`${SizeChart_URL}/get/${item.sizeChartId}`)
                : Promise.resolve(null),
            ]);

            const imagePath = productRes?.images?.[0];
            let blobUrl = fallbackImg;

            if (imagePath) {
              if (imageCache.has(imagePath)) {
                blobUrl = imageCache.get(imagePath);
              } else {
                try {
                  const fullUrl = `${URL_CONFIG.API_URL}/${imagePath}`;
                  const blob = await fetchImage(fullUrl);
                  if (blob) {
                    imageCache.set(imagePath, blob);
                    blobUrl = blob;
                  }
                } catch {
                  blobUrl = fallbackImg;
                }
              }
            }

            return {
              ...item,
              product: productRes,
              size: sizeRes,
              imageUrl: blobUrl,
            };
          })
        );
        setEnrichedCart(enriched);

        const allIds = new Set(
          enriched.map(
            (item) => `${item.productId}_${item.sizeChartId || ""}_${item.inventoryType}`
          )
        );
        setSelectedIds(allIds);
      } catch (err) {
        console.error("Error enriching cart:", err);
      } finally {
        setLoading(false);
      }
    };

    if (cart.length > 0) {
      fetchDetails();
    } else {
      setEnrichedCart([]);
      setSelectedIds(new Set());
      setLoading(false);
    }
  }, [cart]);

  useEffect(() => {
    setCouponError(false);
  }, [coupon]);
  
  const selectedItems = enrichedCart.filter((item) =>
    selectedIds.has(
      `${item.productId}_${item.sizeChartId || ""}_${item.inventoryType}`
    )
  );

  const selectedTotal = selectedItems.reduce((acc, item) => {
    const inventories = item.product?.inventories || [];
    const inventory = inventories.find((inv) => inv?.type === item.inventoryType);

    const variant = inventory?.inventoryVariants?.find(
      (v) => v?.size?.id === item.sizeChartId
    );
    const price =
      variant?.salePrice - (variant?.salePrice * (variant?.discount || 0)) / 100 ||
      item?.price ||
      0;

    return acc + price * (item.quantity || 1);
  }, 0);

  const totalRefundableSecurity = selectedItems.reduce((acc, item) => {
    if (item.inventoryType === "RENTAL") {
      const inventories = item.product?.inventories || [];
      const inventory = inventories.find((inv) => inv?.type === item.inventoryType);
      const security = inventory?.security || 0;
      return acc + (security * (item.quantity || 1));
    }
    return acc;
  }, 0);

  const proceedToBuy= async () => {
    try {
      setLoading(true);
      const draftItems = selectedItems.map((item) => ({
        productId: item.productId,
        sizeChartId: item.sizeChartId,
        inventoryType: item.inventoryType,
        quantity: item.quantity || 1,
        // price: item.price || 0,
        // security: item.product?.inventories?.find((inv) => inv?.type === item.inventoryType)?.security || 0,
      }));
  
      const order = await createDraftOrder(draftItems, discount);
  
      showSnackBar("Draft order created!");
      NavigateTo(`/checkout?orderId=${order.id}`); // Pass the orderId in URL
    } catch (err) {
      console.error("Error creating draft order:", err);
      showSnackBar("Failed to create draft order");
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      <Typography variant="h4" gutterBottom>
        {Literal[lang].shoppingCart}
      </Typography>
      {removedItem && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            maxWidth: '100%',
            wordBreak: 'break-word',
            padding: '20px'
          }}
        >
          <span
            style={{
              color: `var(--primarytext-color)`,
              flex: 1,
              minWidth: 0,
              wordBreak: "break-word",
            }}
            dangerouslySetInnerHTML={{
              __html: Literal[lang].undoCartMsg?.replace?.("{name}", removedItem?.product?.title)
            }}
          />
          <span
            className="product-price"
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: `var(--maindark-color)`,
              whiteSpace: "nowrap",
            }}
            role="button"
            tabIndex={0}
            onClick={undoRemoveFromCart}
            onKeyDown={(e) => e.key === 'Enter' && undoRemoveFromCart()}
          >
            {Literal[lang].undo}
          </span>
        </div>
      )}


      {enrichedCart.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', padding: 25 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAllSelected}
                onChange={toggleSelectAll}
                sx={{ mb: 1 }}
              />
            }
            label={Literal[lang].selectAll}
          />
        </div>
      )}

      <Box
        className={`product-page-main-container ${isMobile ? "mobile" : "desktop"}`}
        style={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: "center",
          alignItems: isSmallScreen ? "center" : "flex-start",
          gap: '20px',
          paddingTop: 2,
          width: "100%",
        }}
      >
        <Box sx={{ flex: 2, width: "100%" }}>
          {loading ? (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <CircularProgress size={24} />
              <Typography>{Literal[lang].loadingCart}</Typography>
            </Box>
          ) : enrichedCart.length === 0 ? (
            <Typography>{Literal[lang].emptyCart}</Typography>
          ) : (
            <>
              {enrichedCart.map((item, index) => {
                const itemKey = `${item.productId}_${item.sizeChartId || ""}_${item.inventoryType}`;
                return (
                  <CartItemTile
                    key={index}
                    item={item}
                    isSelected={selectedIds.has(itemKey)}
                    onToggleSelect={() => handleToggleSelect(itemKey)}
                    setRemovedItem={setRemovedItem}
                    setLoading={setLoading}
                    loading={loading}
                    showSnackBar={showSnackBar}
                  /> 
                );
              })}
            </>
          )}
        </Box>

        {!loading && enrichedCart.length > 0 && (
          <OrderSummary
            lang={lang}
            entity="cart"
            selectedItems={selectedItems}
            coupon={coupon}
            selectedTotal={selectedTotal}
            setCoupon={setCoupon}
            applyCouponCode={applyCouponCode}
            discount={discount}
            couponApplied={couponApplied}
            couponError={couponError}
            totalRefundableSecurity={totalRefundableSecurity}
            emptyCart={emptyCart}
            proceedLabel={Literal[lang].proceedToBuy}
            onProceedToBuy={proceedToBuy}
            showButtons={true}
          />        
        )}
      </Box>
    </div>
  );
};

export default CartWrapper;