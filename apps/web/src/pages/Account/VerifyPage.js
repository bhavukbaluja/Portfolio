import { useEffect } from "react";
import HomePage from "../../HomePage2";

const VerifyPage = ({isMobile, onLoginSignupVerify, loading, setLoading, setImageRefreshKey, imageRefreshKey}) =>{
    useEffect(()=>{
        onLoginSignupVerify();
    },[])
    return(
        <HomePage isMobile={isMobile} loading={loading} setLoading={setLoading} setImageRefreshKey={setImageRefreshKey} imageRefreshKey={imageRefreshKey} />
    )
}
export default VerifyPage;