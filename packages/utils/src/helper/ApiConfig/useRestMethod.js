import axios from "axios";
import API_AUTH from "./API_AUTH";
import { isEmpty, removeLoginDetailCookies } from "../Helper";
import { handleAxiosError } from "../ErrorHandling";
import { useCallback, useContext } from "react";
import { useError } from "./ErrorContext";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";

export const useRestMethod = () => {
  const { showError } = useError();
  const { lang } = useContext(LanguageContext);
  
  const handleError = useCallback((error, hideErrorDialog) => {
    const response = error?.response;
    let errorMessage = Literal[lang].somethingWentWrong;
    let errorDetails = {};
    let title = Literal[lang].alert;
  
    if (response?.status === 401) {
      removeLoginDetailCookies();
      window.location.reload();
    } else if (!hideErrorDialog && response?.status >= 200 && response?.status < 300) {
      return response;
    } else if (!hideErrorDialog && !isEmpty(response) && !isEmpty(response?.status) && response?.status >= 400) {
      title = response?.statusText || title;
      errorMessage = response?.data?.message || response?.data?.error || response?.data || errorMessage;
      errorDetails = response?.data?.errors || {};
      showError(title, errorMessage, errorDetails);
    } else {
      title = response?.statusText || title;
      errorMessage = error?.message || errorMessage;
      errorDetails = error?.details || {};
      showError(title, errorMessage, errorDetails);
    }
  
    // 👇 Add this line to make sure something is returned
    return Promise.reject(error); 
  }, [showError]);
  

  // API Methods
  const GET = useCallback(async (url, params, options = {}, configs) => {
    try {
      return await API_AUTH.get(url, { params, headers: options?.headers ?? {} });
    } catch (error) {
      return handleError(error, configs?.hideErrorDialog);
    }
  }, [handleError]);

  const POST = useCallback(async (url, data, options = {}, configs) => {
    try {
      return await API_AUTH.post(url, data, { ...options });
    } catch (error) {
      return handleError(error, configs?.hideErrorDialog);
    }
  }, [handleError]);

  const PUT = useCallback(async (url, data, options = {}, configs) => {
    try {
      return await API_AUTH.put(url, data, { ...options });
    } catch (error) {
      return handleError(error, configs?.hideErrorDialog);
    }
  }, [handleError]);

  const DELETE = useCallback(async (url, options = {}, configs) => {
    try {
      return await API_AUTH.delete(url, { ...options });
    } catch (error) {
      return handleError(error, configs?.hideErrorDialog);
    }
  }, [handleError]);

  return { GET, POST, PUT, DELETE };
};
