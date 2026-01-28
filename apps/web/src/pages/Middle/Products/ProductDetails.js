import React, { useContext, useEffect, useState } from "react";
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Box, Chip, Stack, Tooltip } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from '@utils/helper/ApiConfig/AuthProvider';
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { WishlistServices } from "@utils/services/WishlistServices";
import { WebsiteServices } from "@utils/services/WebsiteServices";
import { useWishlist } from "@utils/helper/ApiConfig/WishlistContext";
import { useCart } from "@utils/helper/ApiConfig/CartContext";
import { SizeChart_URL } from "@utils/Config/URLs";
import { formatIndianPrice, isEmpty, shareProduct, shareOnWhatsApp } from "@utils/helper/Helper";
import Literal from "@ui/literals";
import HeartWishlistButton from "@ui/components/UI/widgets/HeartWishlistButton";
import BaseShareButton from "@ui/components/UI/widgets/BaseShareButton";
import SizeGuideDialog from "./SizeGuide/SizeGuideDialog";
import SizeGuideComponent from './SizeGuide/SizeGuideComponent';
import "./Products.scss";

const ProductDetails = ({
  product,
  selectedVariant,
  setSelectedVariant,
  selectedInventoryType,
  setSelectedInventoryType,
  isMobile,
  showSnackBar,
  loading,
  setLoading,
  setIsLoginSignupOpen
}) => {
  const { lang } = useContext(LanguageContext);
  const { user } = useContext(AuthContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { getEntities } = WebsiteServices();
  const [searchParams] = useSearchParams();

  const [customSizes, setCustomSizes] = useState([]);
  const [selectedCustomSize, setSelectedCustomSize] = useState(null);
  const [openAddSize, setOpenAddSize] = useState(false);
  const [openSizeGuide, setOpenSizeGuide] = useState(false);
  const [mrp, setMrp] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const isWishlisted = wishlist.some((item) => {
    let sizeChartId = selectedVariant?.size?.size?.toLowerCase() === "custom"
      ? selectedCustomSize?.id
      : selectedVariant?.size?.id;

    return (
      item?.productId === product?.id &&
      item?.sizeChartId === sizeChartId &&
      item?.inventoryType === selectedInventoryType?.type
    );
  });

  const toggleWishlist = async () => {
    setLoading(true);
    let sizeChartId = selectedVariant?.size?.size?.toLowerCase() === "custom"
      ? selectedCustomSize?.id
      : selectedVariant?.size?.id;

    const inventoryType = selectedInventoryType?.type || null;

    if (isWishlisted) {
      await removeFromWishlist(product?.id, sizeChartId, inventoryType);
      showSnackBar(Literal[lang].itemAddedToWishlist);
    } else {
      await addToWishlist(product?.id, sizeChartId, inventoryType);
      showSnackBar(Literal[lang].itemRemovedFromWishlist);
    }
    setLoading(false);
  };

  const handleAddToCart = async () => {
    setLoading(true);
    if (!selectedVariant || !selectedInventoryType) return;
    const sizeChartId = selectedVariant?.size?.size?.toLowerCase() === "custom"
      ? user? selectedCustomSize?.id: selectedVariant?.size?.id
      : selectedVariant?.size?.id;

    const inventoryType = selectedInventoryType?.type || null;
    const quantity = 1;

    await addToCart({
      productId: product.id,
      sizeChartId,
      inventoryType,
      quantity,
    });

    showSnackBar(Literal[lang].addedToCart);
    setLoading(false);
  };

  const handleSelect = (variant) => setSelectedVariant(variant);
  const handleSelectCustomSize = (size) => setSelectedCustomSize(size);

  const clickChip = (value) => {
    if (!product?.inventories?.length) return;
    const newInventory = product.inventories.find((inv) => inv?.type === value);
    setSelectedInventoryType(newInventory);
    setSelectedVariant(newInventory?.inventoryVariants?.[0] || null);
  };


  useEffect(() => {
    const inventoryTypeParam = (searchParams.get("inventoryType") || "SALE").toUpperCase();
    const sizeIdParam = searchParams.get("sizeId");

    if (!product?.inventories?.length) return;

    const newInventory = product.inventories.find((inv) => inv?.type === inventoryTypeParam);
    setSelectedInventoryType(newInventory);

    if (newInventory && newInventory?.inventoryVariants?.length) {
      const foundVariant = newInventory.inventoryVariants.find(
        (variant) => variant?.size?.id === sizeIdParam
      );
      if (foundVariant) {
        setSelectedVariant(foundVariant);
      } else {
        setSelectedVariant(newInventory.inventoryVariants[0]);
      }
    }
  }, [product?.id]);

  const loadCustomSizes = async () => {
    try {
      if (user) {
        setLoading(true);
        const res = await getEntities(`${SizeChart_URL}/custom-sizes`);
        setCustomSizes(res?.data || []);

        const sizeIdParam = searchParams.get("sizeId");
        if (sizeIdParam) {
          const matched = res?.data?.find((s) => `${s.id}` === sizeIdParam);
          if (matched) {
            setSelectedCustomSize(matched);
            return;
          }
        }

        setSelectedCustomSize(res?.data?.[0] || null);
      }
    } catch (err) {
      console.error("Error loading custom sizes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomSizes();
  }, [user]);

  const refreshCustomSizes = () => {
    loadCustomSizes();
  };

  const handleShareProduct = () => {
    const sizeChartId =
      selectedVariant?.size?.size?.toLowerCase() === "custom"
        ? selectedCustomSize?.id
        : selectedVariant?.size?.id;
    
        shareOnWhatsApp({
      title: product?.title,
      productId: product?.id,
      inventoryType: selectedInventoryType?.type ?? "SALE", // FIXED HERE ✅
      sizeChartId: sizeChartId,
      imagePath: product?.images?.[0], // optional
    });
  
  };

  useEffect(() => {
    if (selectedVariant) {
      const _mrp = selectedVariant?.mrp || 0;
      const _salePrice = selectedVariant?.salePrice || 0;
      const _discountPercent = selectedVariant?.discount || 0;

      const _price = _salePrice - (_salePrice * _discountPercent) / 100;
      const _discount = Math.round((((_mrp - _price) / _mrp) * 100) || 0);

      setMrp(_mrp);
      setPrice(_price);
      setDiscount(_discount);
    } else {
      setMrp(0);
      setPrice(0);
      setDiscount(0);
    }
  }, [selectedVariant]);

  if (!product) return null;

  return (
    <div className="product-details-container">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '90%' }}>
          <h1 className="product-title">{product?.title}</h1>
          <div className="product-pricing">
            <span className="product-mrp">
              {Literal[lang]?.mrp || "MRP"}: ₹{formatIndianPrice(mrp)}
            </span>
            <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
              <span className="product-discount">-{discount}%</span>
              <span className="product-price">₹{formatIndianPrice(price)}</span>
            </div>
            <span className="product-price-note">{(selectedInventoryType?.type === "RENTAL" ? Literal[lang].rentInclusiveTax: Literal[lang].inclusiveTax)}</span>
            {selectedInventoryType?.type === "RENTAL" && (
              <div>
                <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
                  <span className="product-discount" style={{ color: `var(--primary-color)` }}>
                    {Literal[lang]?.refundableSecurity}:
                  </span>
                  <span className="product-price" style={{ color: `var(--primary-color)` }}>
                    ₹{formatIndianPrice(selectedInventoryType?.security - price)}
                  </span>
                </div>
                <span className="product-price-note" style={{ fontSize: '1rem' }}>{Literal[lang].refundSecurity}</span>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', width: '10%' }}>
          <HeartWishlistButton isActive={isWishlisted} onToggle={toggleWishlist} />
          <BaseShareButton onShare={handleShareProduct}/>
        </div>
      </div>

      <Stack direction="row" spacing={1} justifyContent="space-around">
        {product?.inventories?.some((inv) => inv?.type === "SALE") && (
          <Chip
            label={Literal[lang].purchase}
            variant={selectedInventoryType?.type !== "SALE" ? "outlined" : "filled"}
            onClick={() => clickChip("SALE")}
            sx={{ fontSize: '16px', height: 40, px: 2, width: '40%' }}
          />
        )}
        {product?.inventories?.some((inv) => inv?.type === "RENTAL") && (
          <Chip
            label={Literal[lang].rent}
            variant={selectedInventoryType?.type === "SALE" ? "outlined" : "filled"}
            onClick={() => clickChip("RENTAL")}
            sx={{ fontSize: '16px', height: 40, px: 2, width: '40%' }}
          />
        )}
      </Stack>

      <div style={{ display: "flex", alignItems: "center", marginTop: "8px", justifyContent: 'space-between' }}>
          <span >{Literal[lang].sizes}:</span>
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            role="button"Add commentMore actions
            tabIndex={0}
            onClick={() => setOpenSizeGuide(true)}
            onKeyDown={(e) => e.key === 'Enter' && setOpenSizeGuide(true)}
          >
            {Literal[lang].sizeGuide}
          </span>
      </div>
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ rowGap: 1, alignItems: "center" }}>
          {selectedInventoryType?.inventoryVariants.map((variant) => (
            <Chip
              key={variant?.size?.id}
              label={
                <>
                  {variant?.size?.size}
                  {variant?.quantity > 0 && (
                    <RocketLaunchOutlinedIcon sx={{ fontSize: 16, ml: 0.5 }} />
                  )}
                </>
              }
              onClick={() => handleSelect(variant)}
              variant={selectedVariant?.size?.id === variant?.size?.id ? "filled" : "outlined"}
              color={selectedVariant?.size?.id === variant?.size?.id ? "primary" : "default"}
              sx={{ fontSize: "14px", height: 36, px: 2 }}
            />
          ))}
        </Stack>

      {selectedVariant?.quantity>0 && (
        <Box className="product isReadyToDispatch" style={{justifyContent:'flex-start'}}>
          <span className="dispatch-banner">
            <RocketLaunchOutlinedIcon/>
            {Literal[lang]?.rtd || "Ready to Dispatch"}
          </span>
        </Box>
      )}

      {selectedVariant?.size?.size === "Custom" && (
        <>
          <div className="label-row">
            <span>{Literal[lang].yourCustomSizes}:</span>
          </div>
          {isEmpty(user)?
            (
              <div style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <Tooltip title={Literal[lang].loginToAddCustomSize}>
                  <button type="button" className="refresh-Button" onClick={() => setIsLoginSignupOpen(true)}>
                    <AddOutlinedIcon />
                  </button>
                </Tooltip>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', flex: 1}}>
                  <div style={{width: '80%', display: 'flex', justifyContent: 'center'}}>
                    <Box className="Add-Button" paddingTop='8px' textAlign='center' onClick={()=>setIsLoginSignupOpen(true)}>
                      {Literal[lang].loginToAddCustomSize}
                    </Box>
                  </div>
                </div>
              </div>
            ):
            (
              <Stack direction="row" spacing={1} flexWrap="wrap"   sx={{ rowGap: 1, alignItems: 'center' }}>
                {  customSizes.map((size) => (
                    <Chip
                      key={size?.id}
                      label={size?.size}
                      onClick={() => handleSelectCustomSize(size)}
                      variant={selectedCustomSize?.id === size?.id ? "filled" : "outlined"}
                      color={selectedCustomSize?.id === size?.id ? "secondary" : "default"}
                      sx={{ fontSize: "14px", height: 36, px: 2 }}
                    />
                  ))
                }
                <button type="button" className="refresh-Button" onClick={() => setOpenAddSize(true)}>
                  <AddOutlinedIcon />
                </button>
              </Stack>
            )
          }
        </>
      )}

       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 2, alignItems: 'center', justifyContent: 'center' }}>
          <button        
            type="submit" 
            className="form-button"
            onClick={handleAddToCart}
            style={{minWidth:'250px', height: '45px', width: isMobile? '100%':'150px', flex: 1}}
            sx={{ backgroundColor: "#ffc107", color: "#111" }}
          >
            {Literal[lang].addToCart}
          </button>
          {/* <button
            type="button"
            className="form-skip-button"
            style={{minWidth:'250px', height: '45px', width: isMobile? '100%':'150px', flex: 1}}
            onClick={() => onEdit(address)}
          >
              {Literal[lang].buyNow}
          </button> */}
      </Box>

      <SizeGuideComponent
        isMobile={isMobile}
        loading={loading}
        setLoading={setLoading}
        showSnackBar={showSnackBar}
        displayComp={false}
        openAddSize={openAddSize}
        refresh={refreshCustomSizes}
        setIsLoginSignupOpen={setIsLoginSignupOpen}
      />
      <SizeGuideDialog
        isMobile={isMobile}
        loading={loading}
        setLoading={setLoading}
        showSnackBar={showSnackBar}
        openSizeGuide={openSizeGuide}
        setOpenSizeGuide={setOpenSizeGuide}
        setIsLoginSignupOpen={setIsLoginSignupOpen}
      />
    </div>
  );
};

export default ProductDetails;
