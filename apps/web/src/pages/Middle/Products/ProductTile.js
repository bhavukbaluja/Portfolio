import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import {
  formatIndianPrice,
  fetchImage,
  getMaxMRP,
  getMinPrice,
  getMaxAvailableQuantity,
} from "@utils/helper/Helper";
import "../Middle.scss";
import { Box } from "@mui/material";
import { useFallbackImage } from '@utils/helper/FallbackImages';
import HoverImageCarousel from "@ui/components/UI/fields/HoverImageCarousel";
import { URL_CONFIG } from "@utils/Config/URLs";
import TextClamp from "@ui/components/UI/TextClamp";
import "./Products.scss";
import Literal from "@ui/literals";
import useNavigateTo from "@utils/helper/ApiConfig/useNavigateTo";
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import { useWishlist } from "@utils/helper/ApiConfig/WishlistContext";
import { useCart } from "@utils/helper/ApiConfig/CartContext";

// Shared cache for all images
const imageCache = new Map();

const ProductTile = ({ product, isMobile, style = {}, inventory=null, size=null, entity="product", setLoading, loading, showSnackBar, setRemovedItem }) => {

  const NavigateTo = useNavigateTo();
  const variant = inventory?.inventoryVariants?.find(variant=> variant?.size?.id==size?.id) || null;
  const mrp =  variant?.mrp || getMaxMRP(product?.inventories)?.mrp;
  const minPriceVariant = getMinPrice(product?.inventories);
  const price = (variant!=null ? variant?.salePrice - (variant?.salePrice * variant?.discount)/100 :
    minPriceVariant?.salePrice - (minPriceVariant?.salePrice * minPriceVariant?.discount)/100);
  const discount = Math.round(((mrp - price) / mrp) * 100);
  const maxAvailableQuantity = getMaxAvailableQuantity(product?.inventories);
  const isReadyToDispatch = maxAvailableQuantity > 0;
  
  const fallbackImg = useFallbackImage(entity);
  const { lang } = useContext(LanguageContext);

  const imagePaths = product?.images || [];
  const [blobUrls, setBlobUrls] = useState([]);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isWishlisted, setIsWishlisted] = useState(wishlist?.some(item=>item?.productId==product?.id));
  const { addToCart } = useCart();

  useEffect(()=>{
    setIsWishlisted(wishlist?.some(item=>item?.productId==product?.id));
  },[wishlist]);
  const toggleWishlist = async () => {
    setLoading(true);
    let sizeChartId = null;
    let productId = product?.id;
    let type= inventory || product.inventories.find(inv => inv?.type === "SALE") || product.inventories.find(inv => inv?.type === "RENTAL"); 
    if(size==null){
      sizeChartId = type?.inventoryVariants?.[0]?.size?.id;
    }
    else{
      sizeChartId = size?.id;
    }
    if (isWishlisted) {
      if(setRemovedItem) { setRemovedItem({"product": product, "sizeChartId": sizeChartId, "type": type?.type});}
      await removeFromWishlist(productId, sizeChartId, type?.type);
      showSnackBar(Literal[lang].itemAddedToWishlist);
    } else {
      await addToWishlist(product?.id, sizeChartId, type?.type);
      showSnackBar(Literal[lang].itemRemovedFromWishlist);
    }
    setLoading(false);
  };

  const handleAddToCart = async () => {
    if (!inventory || !size || !product?.id) return;
  
    setLoading(true);
  
    const inventoryType = inventory?.type;
    const sizeChartId = size?.id;
    const quantity = 1;
  
    try {
      await addToCart({
        productId: product.id,
        sizeChartId,
        inventoryType,
        quantity,
      });
      showSnackBar(Literal[lang].addedToCart);
    } catch (e) {
      console.error("Add to cart failed:", e);
      showSnackBar("Failed to add to cart", "error");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    let isMounted = true;

    const fetchAllImages = async () => {
      
      const urls = await Promise.all(
        imagePaths.map(async (path) => {
          if (imageCache.has(path)) {
            return imageCache.get(path);
          }
          try {
            const fullUrl = `${URL_CONFIG.API_URL}/${path}`;
            const blob = await fetchImage(fullUrl);
            if (blob) {
              imageCache.set(path, blob);
              return blob;
            }
          } catch (e) {
            return null;
          }
          return null;
        })
      );

      if (isMounted) {
        const validUrls = urls.filter(Boolean);
        // ✅ FIX 2: Only store valid fetched images in state. Do NOT store fallback here.
        setBlobUrls(validUrls); 
      }
    };

    fetchAllImages();

    return () => {
      isMounted = false;
    };
  }, [imagePaths]);
  const [isHovered, setIsHovered] = useState(false);
// ✅ FIX 3: Decide what to show at Render Time
  // If we have fetched blobs, show them. If not, show the current theme's fallback.
  const displayImages = blobUrls.length > 0 ? blobUrls : [fallbackImg];
  return (
    <>
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%", // ensure it fills parent tile height
          padding: "8px",
          cursor: "pointer",
          boxSizing: "border-box",
          width: "100%",
          overflow: "hidden",
          borderRadius: "8px",
          // backgroundColor: "#fff", // optional
          border: "1px solid #ddd", // optional
        }}
        style={style}
        onClick={(e) => {
          e.stopPropagation();
          if (!loading) {
            const inventoryType =
              inventory?.type ||
              product?.inventories?.find((inv) => inv?.type)?.type ||
              "SALE";
            const sizeValue = size?.id || "default";

            NavigateTo(
              `/product/${product?.id}?inventoryType=${inventoryType}&sizeId=${encodeURIComponent(sizeValue)}`
            );
          }
        }}
      >
        <Box style={{flex:1}}>

          <div className="BaseImageWrapper">
            <HoverImageCarousel
              imageUrls={displayImages}
              alt={product?.title}
              aspectRatio={2 / 3}
              isHovered={isHovered} // ⬅️ Pass this down
              isWishlisted={isWishlisted}
              toggleWishlist={toggleWishlist}
            />
          </div>

          {product && (
            <div>
              <TextClamp
                lines={1}
                style={{
                  fontSize: "14px",
                  marginTop: "8px",
                  textAlign: "left",
                  lineHeight: "1.2em",
                  maxHeight: "1.2em",
                }}
              >
                {product?.title}
              </TextClamp>
              {entity=="wishlist" && (
                <div className="price-row">
                  <div style={{fontWeight: '550'}}>
                    {Literal[lang][inventory?.type?.toLowerCase()=="sale"? "purchase": "rent"] || inventory}
                  </div>
                  <div>
                    <span>{Literal[lang].size}: </span>

                    <span style={{color: `var(--secondarytext-color)`, fontWeight: '400'}}>{(size?.userId!=1? "(Custom)":"")}<span style={{color: `var(--primarytext-color)`}}>{size?.size}</span></span>
                  </div>
                </div>
              )}

              <div className="price-row">
                <div className="product mrp price">
                  {Literal[lang].mrp}:{" "}
                  <span className="product mrp price">₹{formatIndianPrice(mrp)}</span>
                </div>
                <span className="product discount">-{discount}%</span>
              </div>

              <div className="price-row">
                <span className="product salePrice">₹{formatIndianPrice(price,isMobile?0:0)}</span>
                {isReadyToDispatch && (
                  <Box className="product isReadyToDispatch">
                    <span className="dispatch-banner">
                      <RocketLaunchOutlinedIcon />
                      {Literal[lang].rtd}
                    </span>
                  </Box>
                )}
              </div>
            </div>
          )}
        </Box>
        {entity=="wishlist" && (
          <div style={{ marginTop: "auto", paddingTop: "10px", width: "100%" }}>
            <button
              type="submit"
              className="form-button"
              onClick={(e) => {
                e.stopPropagation(); // prevent tile click
                handleAddToCart();
              }}
              style={{
                height: "45px",
                width: isMobile ? "100%" : "100%",
              }}
            >
              {Literal[lang].addToCart}
            </button>
          </div>
        )}
      </Box>

    </>  
  );
};

export default ProductTile;
