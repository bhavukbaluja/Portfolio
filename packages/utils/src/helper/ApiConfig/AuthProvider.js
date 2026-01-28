import React, { createContext, useEffect, useState } from "react";
import {
  getUserInfo,
  setUserInfo,
  getAuthToken,
  setAuthToken,
  removeAuthDetails,
  getCartItemsFromCookies,
  setCartItemsToCookies,
  clearCartItemsFromCookies,
  saveCartItemsToDatabase,
  refreshUserInfo
} from "./API_Helper";
import { refreshAccessToken, logoutUser } from "./AuthService.js";
import { useCallApi } from "../CallApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children, setLoading }) => {
  const [user, setUser] = useState(getUserInfo());
  const [token, setToken] = useState(getAuthToken());
  const [cartItems, setCartItems] = useState(getCartItemsFromCookies());
  const { CallApi } = useCallApi();

  const setLogin = (userData, accessToken) => {
    setUserInfo(userData);
    setAuthToken(accessToken);
    setUser(userData);
    setToken(accessToken);

    if (userData && cartItems.length > 0) {
      saveCartItemsToDatabase(CallApi, userData?.id, cartItems);
    }

    clearCartItemsFromCookies();
  };

  const logout = async () => {
    removeAuthDetails();
    await logoutUser();
    setUser(null);
    setToken(null);
    setCartItems([]);
    clearCartItemsFromCookies();
  };

  const tryRestoreSession = async () => {
    setLoading(true);   // 🔥 show backdrop
    const currentToken = getAuthToken();

    try {
      if (currentToken) {
        const updatedUser = await refreshUserInfo(CallApi);
        if (updatedUser) {
          setUserInfo(updatedUser);
          setUser(updatedUser);
        }
      } else {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          const updatedUser = await refreshUserInfo(CallApi);
          if (updatedUser) {
            setLogin(updatedUser, newAccessToken);
          }
        }
      }
    } catch (err) {
      console.error("Session restoration failed:", err);
    } finally {
      setLoading(false);   // 🔥 hide backdrop
    }
  };

  useEffect(() => {
    tryRestoreSession();

    const syncAuth = () => {
      setUser(getUserInfo());
      setToken(getAuthToken());
      setCartItems(getCartItemsFromCookies());
    };

    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const updateCart = (newCartItems) => {
    setCartItems(newCartItems);
    setCartItemsToCookies(newCartItems);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setLogin, logout, cartItems, updateCart }}>
      {children}
    </AuthContext.Provider>
  );
};
