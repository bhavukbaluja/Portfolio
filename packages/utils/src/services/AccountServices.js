import { useCallApi } from "../helper/CallApi";

export const AccountServices = () => {
  const { CallApi } = useCallApi();

  const getAboutUs = async (url, data) => {
    return await CallApi(url, "GET", data);
  };

  const updateAboutUs = async (url, data) => {
    return await CallApi(url, "POST", data);
  };
  
  const register = async (url, data) => {
    return await CallApi(url, "POST", data);
  };

  const validateOtp = async (url, data) => {
    return await CallApi(url, "POST", data);
  };  
  
  const updateDetails= async (url, data) => {
    return await CallApi(url, "POST", data);
  };

  const login = async (url, data) => {
    return await CallApi(url, "POST", data);
  };
  

  return { getAboutUs, register, validateOtp, login, updateAboutUs, updateDetails};
};
