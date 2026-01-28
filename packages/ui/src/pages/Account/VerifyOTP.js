import { FormControl } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Literal from "@ui/literals";
import { encodeEmailOrMobile, isEmpty, validateField } from "@utils/helper/Helper";
import { AccountServices } from "@utils/services/AccountServices";
import { Validate_OTP_Url } from "@utils/Config/URLs";
import BaseOtp from "@ui/components/UI/fields/BaseOtp";
import useNavigateTo from "@utils/helper/ApiConfig/useNavigateTo";
import { AuthContext } from "@utils/helper/ApiConfig/AuthProvider";

const VerifyOTP = ({lang, loading, setLoading, value, showSnackBar, setOpenAlert, setAlertMsg, PreOtp, resendOTP, loadingParam, setDialogOpen, action, setChildren, setImageRefreshKey, isManager}) =>{
    const [otp, setOtp] = useState(PreOtp || "");
    const [error, setError] = useState("");
    const { validateOtp } = AccountServices();
    const mobileOrEmail = value;
    const { setLogin } = useContext(AuthContext);
    const NavigateTo = useNavigateTo();
    const [autoSubmitted, setAutoSubmitted] = useState(isManager);

    useEffect(() => {
      if (!autoSubmitted && mobileOrEmail && otp && PreOtp) {
        setAutoSubmitted(true); // mark as submitted
        clickSubmitOTP(mobileOrEmail, otp);
      }
    }, [autoSubmitted, mobileOrEmail, otp, PreOtp]);
    

    const clickSubmitOTP = async (mobileOrEmail, otp) => {
        let newError = validateField("otp", otp);
        setError(newError);
        if(!isEmpty(newError)){
            return;
        }
        setLoading(true);
        const jsonData = {};
            jsonData["otp"] = otp;
            jsonData["mobileOrEmail"] = mobileOrEmail;
    
            await validateOtp(Validate_OTP_Url, jsonData )
            .then((response)=>{
                if(isEmpty(response?.status) || (response?.status && response?.status<300)){
                    if (response?.accessToken && response?.userInfo) {
                        const { accessToken, userInfo } = response;
                        setLogin(JSON.parse(userInfo), accessToken); 
                        setDialogOpen(false);
                    }
                    setChildren([
                        Literal[lang].otpChild1,
                        Literal[lang].otpChild2,
                        Literal[lang].otpChild3,
                        Literal[lang].otpChild4
                    ]);
                    if(action=="signup"){
                        if(response){
                            showSnackBar(Literal[lang].signedUp);
                            setDialogOpen(false);
                            NavigateTo("/");
                        }
                        else{
                            setOpenAlert(true);
                            setAlertMsg(Literal[lang].failedToSignUp);
                        }
                    }
                    else if(action === "login"){
                        if(response){
                            showSnackBar(Literal[lang].loggedIn);
                            setDialogOpen(false);
                            NavigateTo("/");
                        }
                        else{
                            setOpenAlert(true);
                            setAlertMsg(Literal[lang].failedToLogIn);
                        }
                    }
                }
                // setImageRefreshKey(Date.now());
            }).catch((error)=>{
                // setOpenAlert(true);
                console.log(error?.data?.message);
            });
        setLoading(false);
    }

    const handleChange = (e) => {
        let name, value;
        if(e?.target){
            name = e?.target?.name;
            value = e?.target?.value;
        }
        else{
            value = e;
        }

        setOtp(value);
        if(isEmpty(name)){
            name="otp";
        }
        setError(validateField(name, value)); 
    }    
    return(
        <>
            <FormControl className="signup-login" sx={{justifyContent:"space-between", gap:"100px", marginTop:"50px"}}>
                <div className="verify-login">
                    <div>{Literal[lang].enterOTP.replace("{value}",encodeEmailOrMobile(value))}</div>
                    <div>
                        <BaseOtp 
                            id="otp-input"
                            label="otp"
                            name="otp"
                            required={true}
                            placeHolderText="otpPlaceholder"
                            value={otp}
                            handleChange={handleChange}
                            errorMsg={error}
                        />
                    </div>
                </div>
                <div className="form-button-container">
                    <button 
                        disabled={loading && loadingParam=="resend"} 
                        type="submit" 
                        className="form-button"
                        onClick={()=>resendOTP(mobileOrEmail)}
                    >
                        {(loading && loadingParam=="resend")? Literal[lang].resendingOTP : Literal[lang].resendOTP}
                    </button>
                    <button 
                        disabled={loading && loadingParam=="submit"} 
                        type="submit" 
                        className="form-button"
                        onClick={()=>clickSubmitOTP(mobileOrEmail, otp)}
                    >
                        {(loading && loadingParam=="submit")? Literal[lang].submittingOTP : Literal[lang].submitOTP}
                    </button>
                </div>
            </FormControl>
        </>
    )
}
export default VerifyOTP;