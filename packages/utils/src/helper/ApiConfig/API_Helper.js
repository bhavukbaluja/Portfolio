import Cookies from "universal-cookie";
import { Refresh_UserInfo_URL, saveCartDataInDb } from "../../Config/URLs";

const cookies = new Cookies();

/**
 * Set Access Token in LocalStorage
 * @param {string} token - JWT Access Token
 */
export const setAuthToken = (token) => {
  localStorage.setItem("accessToken", token);
};

/**
 * Get Access Token from LocalStorage
 * @returns {string|null} Access Token
 */
export const getAuthToken = () => {
  return localStorage.getItem("accessToken");
};

/**
 * Set User Info in LocalStorage
 * @param {Object} user - User data (e.g., id, name, email, role)
 */
export const setUserInfo = (user) => {
  localStorage.setItem("userInfo", JSON.stringify(user));
};

/**
 * Get User Info from LocalStorage
 * @returns {Object|null} User data
 */
export const getUserInfo = () => {
  try {
    const userString = localStorage.getItem("userInfo");
    return userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error("❌ Failed to parse userInfo from localStorage:", error);
    return null;
  }
};

/**
 * Clear authentication and user info (logout)
 */
export const removeAuthDetails = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userInfo");
  // Refresh token (HttpOnly) is cleared on backend
};

/**
 * Set Cart Items in Cookies
 * @param {Array} cartItems - Array of cart items
 */
export const setCartItemsToCookies = (cartItems) => {
  cookies.set("cartItems", JSON.stringify(cartItems), {
    path: "/",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });
};

/**
 * Get Cart Items from Cookies
 * @returns {Array} Cart items (empty array if not present)
 */
export const getCartItemsFromCookies = () => {
  const cart = cookies.get("cartItems");
  try {
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("❌ Failed to parse cart items from cookie:", error);
    return [];
  }
};

/**
 * Clear Cart Items from Cookies
 */
export const clearCartItemsFromCookies = () => {
  cookies.remove("cartItems", { path: "/" });
};

/**
 * Function to sync Cart Items to the Backend on Login
 * @param {Function} CallApi - API call function
 * @param {number} userId - The user ID
 * @param {Array} cartItems - Array of cart items
 */
export const saveCartItemsToDatabase = async (CallApi, userId, cartItems) => {
  try {
    const jsonData = {
      userId,
      cartItems,
    };
    const response = await CallApi(saveCartDataInDb, "POST", jsonData);

    if (!response.ok) {
      throw new Error("Failed to save cart items");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error saving cart items to database:", error);
    return null;
  }
};

/**
 * Refresh User Info (Call API to refresh user data)
 * @param {Function} CallApi - API call function
 * @returns {Object|null} Refreshed user info
 */
export const refreshUserInfo = async (CallApi) => {
  try {
    const res = await CallApi(Refresh_UserInfo_URL, "GET");

    if (res?.userInfo) {
      const user = res.userInfo;
      setUserInfo(user);
      return user;
    } else {
      console.warn("⚠️ User info not present in refresh response.");
      return null;
    }
  } catch (err) {
    console.error("❌ Failed to refresh user info:", err);
    return null;
  }
};
