import { useCallApi } from "@utils/helper/CallApi";

export const PanelServices = () => {
    const { CallApi } = useCallApi();

    async function getGridData(url, payload){
    return await CallApi(url, "GET");
    }

    const fetchSubcategories = async (url, data) => {
        return await CallApi(url, "GET", data);
    };

    const setSubcategories = async (url, data) => {
    return await CallApi(url, "POST", data);
    };

    const postMethodCalled = async (url, data) => {
        return await CallApi(url, "POST", data);
    };

    const getMethodCalled = async (url, data) => {
        return await CallApi(url, "POST", data);
    };

    const updateEntity = async (url, data)=>{
        return await CallApi(url, "POST", data);
    }
    return{
        getGridData, fetchSubcategories, setSubcategories, postMethodCalled, getMethodCalled, updateEntity
    }
};

