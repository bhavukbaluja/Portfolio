import React, { useEffect, useState } from "react";
import "./Products.scss";
import { Product_URL, URL_CONFIG } from "@utils/Config/URLs";
import { WebsiteServices } from "@utils/services/WebsiteServices";
import { useParams } from "react-router-dom";
import ProductImageViewer from "@ui/components/UI/fields/ProductImageViewer";
import ProductDetails from "./ProductDetails";
import { fetchImage } from "@utils/helper/Helper";
import fallbackImg from "@assets/NoImage.png";

const imageCache = new Map();

const WishlistPage = ({ isMobile, setLoading, loading, showSnackBar }) => {
  const [product, setProduct] = useState({});
  const [blobUrls, setBlobUrls] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedInventoryType, setSelectedInventoryType] = useState(null);
  const { id } = useParams();
  const { getEntities } = WebsiteServices();

  // Fetch product by ID
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

  // Set selected inventory and variant when product updates
  useEffect(() => {
    if (product?.inventories?.length > 0) {
      const sale = product.inventories.find(inv => inv?.type === "SALE");
      if (sale) {
        setSelectedInventoryType(sale);
        setSelectedVariant(sale?.inventoryVariants?.[0] || null);
      }
    }
  }, [product]);

  // Load images as blobs
  useEffect(() => {
    let isMounted = true;
    let createdUrls = [];

    const fetchAllImages = async () => {
      const imagePaths = product?.images || [];

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
        setBlobUrls(validUrls.length ? validUrls : [fallbackImg]);
      } else {
        createdUrls.forEach(url => URL.revokeObjectURL(url));
      }
    };

    fetchAllImages();

    return () => {
      isMounted = false;
    };
  }, [product]);

  return (
    <div className={`product-page-main-container ${isMobile ? "mobile" : "desktop"}`}>
      <div className="product-image-wrapper">
        <ProductImageViewer imageUrls={blobUrls} alt={product?.title} />
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
        />
      </div>
    </div>
  );
};

export default WishlistPage;
