import { Wishlist_URL } from "@utils/Config/URLs";
import { useCallApi } from "@utils/helper/CallApi";

export const WishlistServices = () => {
  const { CallApi } = useCallApi();

  const fetchWishlist = async () => {
    const url = `${Wishlist_URL}`;
    return await CallApi(url, "GET");
  };

  const addWishlistItem = async (item) => {
    const url = `${Wishlist_URL}/add` ;
    return await CallApi(url, "POST", item);
  };

  const addWishlistItems = async (items) => {
    const url = `${Wishlist_URL}/addAll`;
    return await CallApi(url, "POST", items);
  };

  const removeWishlistItem = async ({productId, sizeChartId = null, inventoryType = null}) => {
    const url = `${Wishlist_URL}/remove?productId=${productId}` +
      (sizeChartId ? `&sizeChartId=${sizeChartId}` : "") +
      (inventoryType ? `&inventoryType=${inventoryType}` : "");
    return await CallApi(url, "DELETE");
  };

  return {
    fetchWishlist,
    addWishlistItem,
    addWishlistItems,
    removeWishlistItem,
  };
};
