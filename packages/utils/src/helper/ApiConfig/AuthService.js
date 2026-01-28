import { setAuthToken, getAuthToken, removeAuthDetails } from "./API_Helper";
import { Logout_URL, RefreshAccessToken_URL, URL_CONFIG } from "../../Config/URLs";
import { navigateTo } from "@utils/helper/ApiConfig/NavigateService"; // adjust path accordingly
import API_AUTH from "./API_AUTH";
import axios from "axios";
import { getAppName } from "../Helper";

/**
 * Refresh the access token using the refresh token (stored in HTTP-only cookie)
 * @returns {Promise<string|null>} New access token
 */
export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      URL_CONFIG.API_URL + RefreshAccessToken_URL, 
      {}, // Body is empty
      { 
          withCredentials: true,
          headers: {
              'X-App-Client': getAppName()
          }
      }
    );

    const newAccessToken = response?.data?.accessToken;

    if (newAccessToken) {
      setAuthToken(newAccessToken);
      return newAccessToken;
    }
  } catch (error) {
    const status = error.response?.status || error.status;

    if (status === 401) {
      removeAuthDetails();
      // navigateTo("/login", "", true);
    } else if (status === 403) {
      console.warn("Forbidden – no permission");
    } else {
      console.error("API error:", error);
    }
  }
  return null;
};

/**
 * Logout the user → clears refresh cookie + local access token
 */
export const logoutUser = async () => {
  try {
    await API_AUTH.post(Logout_URL, {}, { withCredentials: true });
    return true; // logout success (no new token expected)
  } catch (error) {
    const status = error.response?.status || error.status;

    if (status === 401) {
      // Unauthorized → session expired or refresh invalid
      removeAuthDetails();
      navigateTo("/login", "", true);
    } else if (status === 403) {
      console.warn("Forbidden: You don't have permission to logout.");
    } else if (!error.response) {
      // Network / CORS issue
      console.error("Network or CORS error during logout:", error.message);
    } else {
      console.error("Unexpected logout error:", error.response?.data || error.message);
    }

    return null;
  }
};

/**
 * Make API requests with automatic token refresh
 * @param {string} method - HTTP method (GET, POST, etc.)
 * @param {string} endpoint - API endpoint (e.g., "/user/13")
 * @param {Object} [data] - Request payload (for POST, PUT)
 * @param {Object} [headers] - Additional headers
 * @returns {Promise<any>} API response
 */
export const apiRequest = async (method, endpoint, data = {}, headers = {}) => {
  try {
    let token = getAuthToken();

    const response = await API_AUTH({
      method,
      url: endpoint, // baseURL already set in API_AUTH
      data,
      headers: {
        ...headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      withCredentials: true, // Ensures cookies (refresh token) are sent
    });

    return response.data;
  } catch (error) {
    // Access token might be expired
    if (error.response?.status === 401) {
      const newToken = await refreshAccessToken();
      if (newToken) {
        return apiRequest(method, endpoint, data, headers); // Retry original request
      }
    }

    // Re-throw for external handling
    throw error;
  }
};
