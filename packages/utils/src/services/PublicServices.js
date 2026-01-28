import { URL_CONFIG } from "@utils/Config/URLs";
import { useCallApi } from "@utils/helper/CallApi";

export const PublicServices = () => {
    // const { CallApi } = useCallApi();

    async function isWebsiteEnabled(webSiteId, payload){
        try{
            let url = URL_CONFIG.API_URL+URL_CONFIG.PUBLIC_URL+ URL_CONFIG.SITE_ENABLED + "?websiteId=" + webSiteId;
            const res = await fetch(url, {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                // You can add authorization or custom headers here if needed
                },
            });
        
            if (!res.ok) {
                console.error("Server returned error:", res.status);
                return false;
            }
        
            const data = await res.json(); // this needs `await`
            return data; // or data.siteEnabled if you're returning the flag only
        } catch (error) {
            console.error("Fetch error:", error);
            throw e;
        }
    }

    return{
        isWebsiteEnabled
    }
};

