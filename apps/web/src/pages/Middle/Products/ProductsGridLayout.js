import React, { useEffect, useState } from "react";
import { Product_URL } from "@utils/Config/URLs";
import { WebsiteServices } from "@utils/services/WebsiteServices";
import ProductTile from "./ProductTile";
import BaseGridLayout from "@ui/components/UI/layout/BaseGridLayout";

const ProductsGridLayout = ({ productIds = [], isMobile = false, setLoading, loading, showSnackBar  }) => {
  const [products, setProducts] = useState([]);
  const { getEntities } = WebsiteServices();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetched = await Promise.all(
          productIds.map((id) => getEntities(`${Product_URL}/${id}`))
        );
        setProducts(fetched);
      } catch (e) {
        console.error("Error fetching products", e);
      }
    };

    if (productIds.length > 0) {
      fetchProducts();
    }
  }, [productIds]);

  return (
    <BaseGridLayout
      items={products}
      renderItem={(product) => <ProductTile 
                                  product={product} 
                                  isMobile={isMobile} 
                                  setLoading={setLoading}
                                  loading={loading}
                                  showSnackBar={showSnackBar}  
                                />
                              }
      isMobile={isMobile}
    />
  );
};

export default ProductsGridLayout;
