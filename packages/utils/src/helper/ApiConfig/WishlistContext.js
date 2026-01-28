import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "@utils/helper/ApiConfig/AuthProvider";
import { WishlistServices } from "@utils/services/WishlistServices";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(AuthContext);
  const {
    fetchWishlist,
    addWishlistItem,
    addWishlistItems,
    removeWishlistItem
  } = WishlistServices();

  useEffect(() => {
    if (user?.id) {
      syncLocalToServer();
    } else {
      const local = JSON.parse(localStorage.getItem("guest_wishlist")) || [];
      setWishlist(local);
    }
  }, [user]);

  const addToWishlist = async (productId, sizeChartId, inventoryType) => {
    if (wishlist.find(item => item.productId === productId && item.sizeChartId === sizeChartId && item.inventoryType === inventoryType)) return;

    const updated = [...wishlist, { productId, sizeChartId, inventoryType }];
    setWishlist(updated);

    if (user?.id) {
      await addWishlistItem({productId, sizeChartId, inventoryType});
      syncLocalToServer();
    } else {
      localStorage.setItem("guest_wishlist", JSON.stringify(updated));
    }
  };

  const removeFromWishlist = async (productId) => {
    const updated = wishlist.filter((item) => item.productId !== productId);
    setWishlist(updated);

    if (user?.id) {
      await removeWishlistItem({productId});
      syncLocalToServer();
    } else {
      localStorage.setItem("guest_wishlist", JSON.stringify(updated));
    }
  };

  const syncLocalToServer = async () => {
    const local = JSON.parse(localStorage.getItem("guest_wishlist")) || [];

    if (local.length > 0) {
      await addWishlistItems(local);
      localStorage.removeItem("guest_wishlist");
    }

    const serverList = await fetchWishlist();
    setWishlist(serverList);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted: (id) => wishlist.some(w => w.productId === id),
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
