import { URL_CONFIG } from "@utils/Config/URLs";
import { useCallApi } from "@utils/helper/CallApi";

export const WebsiteServices = () => {
    const { CallApi } = useCallApi();

    const setWebsiteEnabled = async (data) => {
        let url = URL_CONFIG.ADMIN_URL+ URL_CONFIG.SITE_ENABLED;
        return await CallApi(url, "POST", data);
    };

    // const postMethodCalled = async (url, data) => {
    //     return await CallApi(url, "POST", data);
    // };

    const getEntities = async (url, data) => {
        return await CallApi(url, "GET", data);
    };

    // const updateEntity = async (url, data)=>{
    //     return await CallApi(url, "POST", data);
    // }
    return{
         getEntities, setWebsiteEnabled
        //  setWebsiteEnabled, postMethodCalled, getMethodCalled, updateEntity
    }
};

