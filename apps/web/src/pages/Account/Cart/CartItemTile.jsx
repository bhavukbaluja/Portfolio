import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Checkbox,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import { useCart } from "@utils/helper/ApiConfig/CartContext";
import { useWishlist } from "@utils/helper/ApiConfig/WishlistContext";
import { formatIndianPrice, shareProduct } from "@utils/helper/Helper";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import useNavigateTo from "@utils/helper/ApiConfig/useNavigateTo";
import BaseShareButton from "@ui/components/UI/widgets/BaseShareButton";
import HeartWishlistButton from "@ui/components/UI/widgets/HeartWishlistButton";

const CartItemTile = ({ item, isSelected, onToggleSelect, setRemovedItem, key, showSnackBar, setLoading, loading  }) => {
  const { removeFromCart, updateQuantity } = useCart();
  const { lang } = React.useContext(LanguageContext);
  const NavigateTo = useNavigateTo();
  const { addToWishlist, wishlist } = useWishlist();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleQuantityChange = (delta) => {
    const newQty = item.quantity + delta;
    if (newQty > 0) {
      updateQuantity({
        productId: item.productId,
        sizeChartId: item.sizeChartId,
        inventoryType: item.inventoryType,
        quantity: newQty,
      });
    }
  };

  const handleChangeSize = () => {
    NavigateTo(`/product/${item.product?.id}?inventoryType=${item.inventoryType}&sizeId=${item.sizeChartId || "default"}`);
  };

  const handleNavigateToProduct = () => {
    NavigateTo(`/product/${item.product?.id}?inventoryType=${item.inventoryType}&sizeId=${item.sizeChartId || "default"}`);
  };

  const handleRemove = () => {
    setLoading(true);
    removeFromCart(item); // Your remove logic
    setRemovedItem({
      productId: item.productId,
      sizeChartId: item.sizeChartId,
      inventoryType: item.inventoryType,
      quantity: item.quantity,
      product: item.product, // For name in message
    });
    showSnackBar(Literal[lang].itemRemoved);
    setLoading(false);
  };
  

  const toggleWishlist = () => {
    setLoading(true);
    addToWishlist(
      item.productId,
      item.sizeChartId,
      item.inventoryType,
    );
    removeFromCart({
      productId: item.productId,
      sizeChartId: item.sizeChartId,
      inventoryType: item.inventoryType,
    });
    showSnackBar(Literal[lang].itemMovedToWishlist)
    setLoading(false);
  };

  const inventory = item.product?.inventories?.find(inv => inv?.type === item.inventoryType);
  const variant = item.size?.userId !== 1
    ? inventory?.inventoryVariants?.find(v => v?.size?.size?.toLowerCase() === "custom")
    : inventory?.inventoryVariants?.find(v => v?.size?.id === item.sizeChartId);

  const image = item.imageUrl;
  const mrp = variant?.mrp;
  const price = variant?.salePrice - (variant?.salePrice * (variant?.discount || 0)) / 100 || item?.price;
  const discount = Math.round((mrp-price)*100/mrp || 0);
  const selectedInventoryType = inventory;

  const isWishlisted = wishlist.some(w =>
    w?.productId === item?.productId &&
    w?.sizeChartId === item?.sizeChartId &&
    w?.inventoryType === item?.inventoryType
  );

  const handleShareProduct = () => {
    const imagePath = item.product?.images?.[0]; // Use first image if available
  
    shareProduct({
      title: item.product?.title,
      productId: item.product?.id,
      inventoryType: item.inventoryType,
      sizeChartId: item.sizeChartId,
      imagePath,
    });
  };
  
  const isReadyToDispatch = variant?.quantity > 0;

  const ActionBar = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        mt: 2,
        width: "100%",
        pt: 1,
        borderTop: "1px solid #ddd",
      }}
    >
      <div style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'space-between', flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            justifyContent: 'center',
            border: "1px solid var(--secondarytext-color)",
            borderRadius: "35px",
            px: 1,
          }}
        >
          {item.quantity === 1 ? (
            <IconButton
              onClick={() =>
                handleRemove()
              }
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => handleQuantityChange(-1)}>
              <RemoveOutlinedIcon />
            </IconButton>
          )}
          <Typography>{item.quantity}</Typography>
          <IconButton onClick={() => handleQuantityChange(1)}>
            <AddOutlinedIcon />
          </IconButton>
        </Box>
      </div>

      <Box sx={{ display: "flex", gap: 1, flexGrow: 1, justifyContent: 'space-evenly' }}>
        <Tooltip title={Literal[lang].delete}>
          <IconButton className="share-button" onClick={() => handleRemove()}>
            <DeleteOutlineOutlinedIcon style={{ fontSize: '1.7rem' }} />
          </IconButton>
        </Tooltip>

        <HeartWishlistButton isActive={isWishlisted} onToggle={toggleWishlist} tooltipmsg={Literal[lang].moveToWishlist} />

        <Tooltip title={Literal[lang].changeSize}>
          <IconButton className="share-button" onClick={handleChangeSize}>
            <SwapHorizOutlinedIcon style={{ fontSize: '2.2rem' }} />
          </IconButton>
        </Tooltip>

        <Tooltip title={Literal[lang].share}>
          <BaseShareButton onShare={handleShareProduct} />
        </Tooltip>
      </Box>
    </Box>
  );

  const rtd = () => isReadyToDispatch && (
    <Box className="product isReadyToDispatch" style={{ justifyContent: 'flex-start' }}>
      <span
        className="dispatch-banner"
        style={{
          whiteSpace: "normal",
          overflowWrap: "break-word",
          wordBreak: "break-word",
          textAlign: 'center'
        }}
      >
        <RocketLaunchOutlinedIcon />
        {Literal[lang]?.rtd}</span>
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100%",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.08)",
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        p: 2,
        mb: 2,
        backgroundColor: "#fff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Checkbox checked={isSelected} onChange={onToggleSelect} />
        <Typography variant="subtitle2">{Literal[lang].selectItem || "Select Item"}</Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Box sx={{ width: "170px", flexShrink: 0, cursor: "pointer" }} onClick={handleNavigateToProduct}>
          <img
            src={image}
            alt={item.product?.title}
            style={{ objectFit: "cover", width: "100%", height: "auto", aspectRatio: "2 / 3" }}
          />
        </Box>

        <Box sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <Typography
            variant="h6"
            sx={{
              cursor: "pointer",
              whiteSpace: "normal",
              overflowWrap: "break-word",
              wordBreak: "break-word",
              display: "-webkit-box",
              WebkitLineClamp: isMobile? 4: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
            onClick={handleNavigateToProduct}
          >
            {item.product?.title}
          </Typography>

          <Typography variant="body2" sx={{ mb: 0.5 }}>{Literal[lang].type}: {item.inventoryType.toLowerCase()=="sale"? Literal[lang].purchase: Literal[lang].rent}</Typography>

          {item.size && (
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              {Literal[lang].size}: {item.size?.userId !== 1 ? "(Custom) " : ""}{item.size?.size}
            </Typography>
          )}

          <div className="product-pricing" style={{ gap: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <span className="product-mrp">{Literal[lang]?.mrp || "MRP"}: ₹{mrp}</span>
              <span className="product-price-note">{(selectedInventoryType?.type === "RENTAL" ? Literal[lang].rentInclusiveTax : Literal[lang].inclusiveTax)}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent:'space-between', flexWrap: 'wrap' }}>
              <span className="product-discount">-{discount}%</span>
              {/* <div style={{ display: "flex", alignItems: "center", justifyContent:'flex-end', flexWrap: 'wrap', width: '100%' }}> */}
                <span className="product-price" style={{ margin: 0, fontSize: isMobile? '1.5rem': '2rem' }}>₹{formatIndianPrice(price)}</span>
              {/* </div> */}
            </div>
            {selectedInventoryType?.type === "SALE" && !isMobile && rtd()}
            {selectedInventoryType?.type === "RENTAL" && (
              <>
                <div style={{ display: "flex", justifyContent: 'space-between', flexDirection: 'row' }}>
                  {!isMobile && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {rtd()}
                    </div>
                  )}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <span className="product-price" style={{ color: `var(--primarytext-color)`, margin: '0px', fontSize: '1.2rem' }}>+</span>
                      <span className="product-price" style={{ color: `var(--primary-color)`, margin: '0px', fontSize: '1.2rem' }}>₹{formatIndianPrice(selectedInventoryType?.security)}</span>
                    </div>
                    {!isMobile && (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", flexGrow:1 }}>
                        <span className="product-discount" style={{ color: `var(--primary-color)`, fontSize: '1.3rem' }}>
                          {Literal[lang]?.securityDeposit}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                {!isMobile && <span className="product-price-note" style={{ fontSize: '1rem' }}>{Literal[lang].refundSecurity}</span>}
              </>
            )}
          </div>
          {!isMobile && ActionBar}
        </Box>
      </Box>
      {isMobile && (
        <>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            {selectedInventoryType?.type === "RENTAL" && (
              <span className="product-discount" style={{ color: `var(--primary-color)`, fontSize: '1.3rem' }}>
                {Literal[lang]?.securityDeposit}
              </span>
            )}
            {rtd()}
            {selectedInventoryType?.type === "RENTAL" && (
              <span className="product-price-note" style={{ fontSize: '1rem' }}>{Literal[lang].refundSecurity}</span>
            )}
          </div>
          <Box mt={2}>{ActionBar}</Box>
        </>
      )}
    </Box>
  );
};

export default React.memo(CartItemTile);
