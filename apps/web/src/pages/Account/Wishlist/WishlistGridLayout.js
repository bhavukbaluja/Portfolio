import React, { useContext, useEffect, useState } from "react";
import { Product_URL, SizeChart_URL } from "@utils/Config/URLs";
import { WebsiteServices } from "@utils/services/WebsiteServices";
import BaseGridLayout from "@ui/components/UI/layout/BaseGridLayout";
import ProductTile from "../../Middle/Products/ProductTile";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { CircularProgress, Typography, Box } from "@mui/material";

const WishlistGridLayout = ({
  wishlist,
  isMobile = false,
  setLoading,
  loading,
  showSnackBar,
  setRemovedItem,
}) => {
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const { getEntities } = WebsiteServices();
  const { lang } = useContext(LanguageContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetched = await Promise.all(
          wishlist.map((item) =>
            getEntities(`${Product_URL}/${item?.productId}`)
          )
        );
        setProducts(fetched);
      } catch (e) {
        console.error("Error fetching products", e);
      }
    };

    const fetchSizes = async () => {
      try {
        const fetched = await Promise.all(
          wishlist.map(async (item) =>{
            if(item?.sizeChartId){
             return await getEntities(`${SizeChart_URL}/get/${item?.sizeChartId}`);
            }
            else{
              return {};
            }
          })
        );
        setSizes(fetched);
      } catch (e) {
        console.error("Error fetching sizes", e);
      }
    };

    if (wishlist.length > 0) {
      fetchProducts();
      fetchSizes();
    }
  }, [wishlist]);

  return (
    loading ? (
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <CircularProgress size={24} />
        <Typography>{Literal[lang].loadingCart}</Typography>
      </Box>
    ) : wishlist.length === 0 ? (
      <Typography>{Literal[lang].emptyWishlist}</Typography>
    ) : 
    (
      <BaseGridLayout
        items={products}
        maxCols={5}
        mobileCols={2}
        renderItem={(product, index) => {
          const wishlistItem = wishlist.find(
            (item) => item.productId === product.id
          );
          return (
            <ProductTile
              key={product.id || index}
              product={product}
              isMobile={isMobile}
              entity="wishlist"
              setLoading={setLoading}
              loading={loading}
              showSnackBar={showSnackBar}
              inventory={product?.inventories?.find(
                (inv) => inv?.type === wishlistItem?.inventoryType
              )}
              size={sizes[index]}
              isWishlisted={true}
              setRemovedItem={setRemovedItem}
            />
          );
        }}
      />
    )
  );
};

export default WishlistGridLayout;
