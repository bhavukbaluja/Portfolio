import { useRestMethod } from "./ApiConfig/useRestMethod";
import { isEmpty } from "./Helper";

export const useCallApi = () => {
  const { GET, POST, PUT, DELETE } = useRestMethod(); // Get API methods from the hook

  /**
   * Call API with the provided method, data, options, and configs.
   * @param {string} api - The API endpoint.
   * @param {string} Method - The HTTP method (GET, POST, PUT, DELETE).
   * @param {object} data - The request payload (if applicable).
   * @param {object} options - Additional options like headers.
   * @param {object} configs - Configs (e.g., hideErrorDialog, resdataOnly).
   */
  const CallApi = async (api, Method, data, options, configs) => {
    try {
      const response = await { GET, POST, PUT, DELETE }[Method](api, data, options, configs);
      if (isEmpty(response) || isEmpty(response?.status) || response?.status!== 200) {
        throw response;
        return;
      }
      else if(response?.status == 200){
        return response?.data;
      }
      else {return;}
    } catch (res) {
      let resStatus = res?.status,
        responseData = res?.response?.data,
        resData = res?.data;
  
      if (configs?.resdataOnly === true) {
        return responseData ?? resData;
      } else {
        throw {
          status: isEmpty(resStatus) ? false : resStatus,
          data: responseData ? responseData : isEmpty(resData) ? "error" : resData,
        };
      }
    }
  };

  return { CallApi };
};
