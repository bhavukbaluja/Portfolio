import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "@utils/helper/ApiConfig/AuthProvider";
import { CartServices } from "@utils/services/CartServices";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  const {
    fetchCart,
    addCartItem,
    removeCartItem,
    updateCartItem,
    addCartItems,
    clearCart,
  } = CartServices();

  useEffect(() => {
    if (user?.id) {
      syncLocalToServer();
    } else {
      const local = JSON.parse(localStorage.getItem("guest_cart")) || [];
      setCart(local);
    }
  }, [user]);

  const syncLocalToServer = async () => {
    const local = JSON.parse(localStorage.getItem("guest_cart")) || [];

    if (local.length > 0) {
      const unique = Object.values(
        local.reduce((acc, item) => {
          const key = `${item.productId}_${item.sizeChartId || ""}_${item.inventoryType}`;
          if (!acc[key]) acc[key] = { ...item };
          else acc[key].quantity += item.quantity;
          return acc;
        }, {})
      );

      await addCartItems(unique);
      localStorage.removeItem("guest_cart");
    }

    const serverCart = await fetchCart();
    setCart(serverCart?.items || []);
  };

  const addToCart = async ({
    productId,
    sizeChartId,
    inventoryType,
    quantity = 1,
  }) => {
    const existing = cart.find(
      item =>
        item.productId === productId &&
        item.sizeChartId === sizeChartId &&
        item.inventoryType === inventoryType
    );

    let updatedCart;

    if (existing) {
      updatedCart = cart.map(item =>
        item === existing
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      const newItem = { productId, sizeChartId, inventoryType, quantity };
      updatedCart = [newItem, ...cart];
    }

    setCart(updatedCart);

    const dto = { productId, sizeChartId, inventoryType, quantity };

    if (user?.id) {
      await addCartItem(dto);
    } else {
      localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = async ({ productId, sizeChartId, inventoryType }) => {
    const updated = cart.filter(
      item =>
        item.productId !== productId ||
        item.sizeChartId !== sizeChartId ||
        item.inventoryType !== inventoryType
    );

    setCart(updated);

    const dto = { productId, sizeChartId, inventoryType };

    if (user?.id) {
      await removeCartItem(dto);
    } else {
      localStorage.setItem("guest_cart", JSON.stringify(updated));
    }
  };

  const updateQuantity = async ({ productId, sizeChartId, inventoryType, quantity }) => {
    const updated = cart.map(item =>
      item.productId === productId &&
      item.sizeChartId === sizeChartId &&
      item.inventoryType === inventoryType
        ? { ...item, quantity }
        : item
    );

    setCart(updated);

    const dto = { productId, sizeChartId, inventoryType, quantity };

    if (user?.id) {
      await updateCartItem(dto);
    } else {
      localStorage.setItem("guest_cart", JSON.stringify(updated));
    }
  };

  const emptyCart = async () => {
    setCart([]);

    if (user?.id) {
      await clearCart();
    } else {
      localStorage.removeItem("guest_cart");
    }
  };

  const cartContextValue = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    emptyCart,
    isInCart: (productId, sizeChartId, inventoryType) =>
      cart.some(
        c =>
          c.productId === productId &&
          c.sizeChartId === sizeChartId &&
          c.inventoryType === inventoryType
      ),
    getQuantity: (productId, sizeChartId, inventoryType) =>
      cart.find(
        c =>
          c.productId === productId &&
          c.sizeChartId === sizeChartId &&
          c.inventoryType === inventoryType
      )?.quantity || 0,
  }), [cart]);

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};