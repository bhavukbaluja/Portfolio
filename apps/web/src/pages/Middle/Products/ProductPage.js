import React, { useEffect, useState } from "react";
import "./Products.scss";
import { Product_URL, URL_CONFIG } from "@utils/Config/URLs";
import { WebsiteServices } from "@utils/services/WebsiteServices";
import { useParams, useSearchParams } from "react-router-dom";
import ProductImageViewer from "@ui/components/UI/fields/ProductImageViewer";
import ProductDetails from "./ProductDetails";
import { fetchImage } from "@utils/helper/Helper";
import { useFallbackImage } from '@utils/helper/FallbackImages';

// Cache outside component to persist across re-renders
const imageCache = new Map();

const ProductPage = ({ isMobile, setLoading, loading, showSnackBar, setIsLoginSignupOpen }) => {

  const entity = "product";
  
  // ✅ FIX 1: Call hook at top level so it updates on theme change
  const fallbackImg = useFallbackImage(entity);

  const [product, setProduct] = useState({});
  const [blobUrls, setBlobUrls] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedInventoryType, setSelectedInventoryType] = useState(null);

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { getEntities } = WebsiteServices();

  // Fetch product
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const res = await getEntities(`${Product_URL}/${id}`, {});
        setProduct(res);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  // Set default inventory and variant based on search params
  useEffect(() => {
    if (!product?.inventories || product?.inventories?.length === 0) return;

    const inventoryTypeParam = searchParams.get("inventoryType")?.toUpperCase() || "SALE";
    const sizeIdParam = searchParams.get("sizeId");

    const inventory = product.inventories.find((inv) => inv?.type === inventoryTypeParam);
    if (inventory) {
      setSelectedInventoryType(inventory);

      // Try to find variant by sizeId
      let defaultVariant = inventory?.inventoryVariants?.[0];
      if (sizeIdParam) {
        const matched = inventory?.inventoryVariants?.find(
          (v) => `${v.size?.id}` === sizeIdParam
        );
        if (matched) {
          defaultVariant = matched;
        }
      }
      setSelectedVariant(defaultVariant);
    }
  }, [product, searchParams]);

  // Load product images
  useEffect(() => {
    let isMounted = true;
    let createdUrls = [];

    const fetchAllImages = async () => {
      const imagePaths = product?.images || [];
      // ❌ Removed useFallbackImage call from here

      const urls = await Promise.all(
        imagePaths.map(async (path) => {
          if (imageCache.has(path)) return imageCache.get(path);
          try {
            const fullUrl = `${URL_CONFIG.API_URL}/${path}`;
            const objectUrl = await fetchImage(fullUrl);
            if (objectUrl) {
              imageCache.set(path, objectUrl);
              createdUrls.push(objectUrl);
              return objectUrl;
            }
          } catch (e) {
            console.error("Failed to fetch image", e);
            return null;
          }
        })
      );

      if (isMounted) {
        const validUrls = urls.filter(Boolean);
        // ✅ FIX 2: Only store valid fetched images. Do not bake fallback into state.
        setBlobUrls(validUrls);
      } else {
        createdUrls.forEach(url => URL.revokeObjectURL(url));
      }
    };

    fetchAllImages();

    return () => {
      isMounted = false;
    };
  }, [product]);

  // ✅ FIX 3: Dynamic Selection at Render Time
  const displayImages = blobUrls.length > 0 ? blobUrls : [fallbackImg];

  return (
    <div className={`product-page-main-container ${isMobile ? "mobile" : "desktop"}`}>
      <div className="product-image-wrapper">
        <ProductImageViewer 
            imageUrls={displayImages} // ✅ Pass the dynamic list
            alt={product?.title} 
        />
      </div>
      <div className="product-details-wrapper">
        <ProductDetails
          product={product}
          isMobile={isMobile}
          showSnackBar={showSnackBar}
          loading={loading}
          setLoading={setLoading}
          selectedVariant={selectedVariant}
          setSelectedVariant={setSelectedVariant}
          selectedInventoryType={selectedInventoryType}
          setSelectedInventoryType={setSelectedInventoryType}
          setIsLoginSignupOpen={setIsLoginSignupOpen}
        />
      </div>
    </div>
  );
};

export default ProductPage;