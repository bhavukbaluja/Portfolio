import { Payment_URL } from "@utils/Config/URLs";
import { useCallApi } from "@utils/helper/CallApi";

export const PaymentServices = () => {
  const { CallApi } = useCallApi();

  const savePaymentInfo = async (data) => {
    const url = `${Payment_URL}/verify`;
    return await CallApi(url, "POST", data);
  };  

//   const getMyOrders = async () => {
//     const url = `${Order_URL}`;
//     return await CallApi(url, "GET");
//   };

//   const getOrdersByStatus = async (status) => {
//     const url = `${Order_URL}/status?status=${status}`;
//     return await CallApi(url, "GET");
//   };

  return {
    // getMyOrders,
    // getOrdersByStatus,
    savePaymentInfo
  };
};
