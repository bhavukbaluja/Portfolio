import { useEffect } from "react";
import HomePage from "../../HomePage2";

const VerifyPage = ({isMobile, onLoginSignupVerify}) =>{
    useEffect(()=>{
        onLoginSignupVerify();
    },[])
    return(
        <HomePage isMobile={isMobile} />
    )
}
export default VerifyPage;