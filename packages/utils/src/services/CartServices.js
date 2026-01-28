import { Cart_URL } from "@utils/Config/URLs";
import { useCallApi } from "@utils/helper/CallApi";

export const CartServices = () => {
  const { CallApi } = useCallApi();

  const fetchCart = async () => {
    const url = `${Cart_URL}/get`;
    return await CallApi(url, "GET");
  };

  const addCartItem = async (item) => {
    const url = `${Cart_URL}/add`;
    return await CallApi(url, "POST", item);
  };

  const addCartItems = async (items) => {
    const url = `${Cart_URL}/addAll`;
    return await CallApi(url, "POST", items);
  };

  const removeCartItem = async (dto) => {
    const url = `${Cart_URL}/remove`;
    return await CallApi(url, "POST", dto); // changed from DELETE with query params to POST with body
  };

  const updateCartItem = async (item) => {
    const url = `${Cart_URL}/update`;
    return await CallApi(url, "POST", item);
  };

  const clearCart = async () => {
    const url = `${Cart_URL}/clear`;
    return await CallApi(url, "POST");
  };

  return {
    fetchCart,
    addCartItem,
    addCartItems,
    removeCartItem,
    updateCartItem,
    clearCart,
  };
};
