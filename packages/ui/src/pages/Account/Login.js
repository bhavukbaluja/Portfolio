import React, { useContext, useEffect, useState } from "react";
import "react-phone-input-2/lib/style.css";
import BaseTextField2 from "@ui/components/UI/fields/BaseTextField2";
import BaseRadioGroup from "@ui/components/UI/fields/BaseRadioGroup";
import "./Account.scss";
import BaseMobileField from "@ui/components/UI/fields/BaseMobileField";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { Login_URL } from "@utils/Config/URLs";
import { isEmpty, validateField } from "@utils/helper/Helper";
import { FormControl } from "@mui/material";
import { AccountServices } from "@utils/services/AccountServices";
import VerifyOTP from "./VerifyOTP";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "@utils/helper/ApiConfig/AuthProvider";

const Login = ({loading, setAlertTitle, setLoading, setAlertMsg, setOpenAlert, setChildren, showSnackBar, setDialogOpen, action, setImageRefreshKey, mobileLogin=true, isManager}) => {
  const { lang } = React.useContext(LanguageContext);
  const { login } = AccountServices();
  const [loadingParam, setLoadingParam] = useState("submit");
  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams();
  const { setLogin } = useContext(AuthContext);
  const [preOtp, setPreOtp] = useState('');
  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    password: "",
    otp: ""
  });
  const [selected, setSelected] = useState("email");
  const [selectedPassword, setSelectedPassword] = useState(null);
  const [showOTPComponent, setShowOTPComponent] = useState(false);
  // const [otpSent, setOtpSent] = useState(false);

  // useEffect(() => {
  //   if (otpSent) setShowOTPComponent(true);
  // }, [otpSent]);

  useEffect(() => {
    console.log("showOTPComponent state changed:", showOTPComponent);
  }, [showOTPComponent]);
  

  useEffect(() => {
    const otpFromParams = searchParams.get("otp");
    setPreOtp(otpFromParams || "");
  
    if (!isEmpty(otpFromParams)) {
      setSelectedPassword("otp");
      setShowOTPComponent(true);
    } else {
      setSelectedPassword(null);
      setShowOTPComponent(false);
    }
  }, [searchParams]);
  
  

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({ ...prev, [name]: value }));
  
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name in newErrors) delete newErrors[name]
      const error = validateField(name, value);
      if (error) newErrors[name] = error;
      return { ...newErrors }; 
    });
  };

  const validateEachField = () =>{
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "countryCode") {
        let error = validateField(key, formData[key]); 
        if(!isEmpty(error)){
          newErrors[key] = error;
        }
      }
      if (!formData[key]?.toString().trim()){
         newErrors[key] = "This field is required.";
      }
    });
    return newErrors;
  }

  const clickSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    let mobileOrEmail;
    if (selected == "mobile") {
      delete formData.email;
      mobileOrEmail = formData?.mobile;
    } 
    else if(selected == "email"){
      delete formData.mobile;
      mobileOrEmail= formData?.email;
    }
    if(selectedPassword == "otp"){
      delete formData.password;
    }
    delete formData.otp;
    
    const newErrors = validateEachField();
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }
    loginFunc(mobileOrEmail);     
  };

  const handleChangeSelected =(item,action) =>{
    if(!formData?.hasOwnProperty(item)) {
      formData[item]="";
    }
    if(action=="selected"){
      setSelected(item);
    }
    else if(action=="selectedPassword"){
      setSelectedPassword(item);
    }
  }


  const resendOTP = async (mobileOrEmail)=>{
    setLoading(true);
    setLoadingParam("resend");
    await loginFunc(mobileOrEmail);
    setLoadingParam("submit");
  }

  const loginFunc = async (mobileOrEmail) => {
      const jsonData = {};
      jsonData["password"] = formData.password;
      jsonData["mobileOrEmail"] = mobileOrEmail || formData.email || formData.mobile;

      await login(Login_URL, jsonData ).then((response)=>{
        if (response?.accessToken && response?.userInfo) {
          const { accessToken, userInfo } = response;
          setLogin(JSON.parse(userInfo), accessToken); 
          setImageRefreshKey(Date.now());
          if(setDialogOpen){
            setDialogOpen(false);
          }
        }
        else if (selectedPassword === "otp" && response?.message) {
          console.log("OTP flow triggered");
          setShowOTPComponent(true); // ✅ Triggers OTP screen
        }
        showSnackBar(response?.message || response);
      }).catch((error)=>{
      });
      setLoading(false);
  }
  
  const loginOpt = [
    { label: "email", value: "email" },
    { label: "mobile", value: "mobile" },
  ];

  const passwordOpt = [
    { label: "otp", value: "otp" },
    { label: "password", value: "password" },
  ];

  console.log("RENDER => selectedPassword:", selectedPassword, "showOTPComponent:", showOTPComponent);

  return (
    <>
    { !showOTPComponent && (
    <FormControl className="signup-login" 
        onSubmit={clickSubmit}
      >
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', flexGrow: 1}}>
        {mobileLogin && (
        <BaseRadioGroup 
          name="loginOpt"
          options={loginOpt} 
          value={selected} 
          onChange={(item)=> handleChangeSelected(item,"selected")} 
          dress={true}
        />
        )}
      {selected === "email" ? (
        <>
        <BaseTextField2
          id="email-input"
          label="email"
          name="email"
          required
          placeHolderText="emailPlaceHolder"
          value={formData.email}
          onChange={handleChange}
          errorMsg={errors.email}
        />
        {selectedPassword=="otp" && (<div><b>{Literal[lang].note}:</b> {Literal[lang].receiveOTP.replace("{0}",Literal[lang].email)}</div>)}
        </>
      ) : (
        <>
          <div className="mobile-container">
              <BaseMobileField 
                formData={formData}  
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
                required={true}
              />
          </div>
          {selectedPassword=="otp" && (<div><b>{Literal[lang].note}:</b> {Literal[lang].receiveOTP.replace("{0}",Literal[lang].mobile)}</div>)}
          </>
      )}
        <BaseRadioGroup 
          name="passwordOpt"
          options={passwordOpt} 
          value={selectedPassword} 
          onChange={(item)=> handleChangeSelected(item,"selectedPassword")} 
        />
        {selectedPassword=="password" && (
          <BaseTextField2
            id="password-input"
            label="password"
            name="password"
            required={true}
            type='password'
            placeHolderText="passwordPlaceHolder"
            value={formData.password}
            onChange={handleChange}
            errorMsg={errors.password}
          />
        )}
      </div>
      <div className="form-button-container">
        <button 
            disabled={loading || 
              (selected=="email" && !isEmpty(validateField("email",formData?.email))) ||
              (selected=="mobile" && !isEmpty(validateField("mobile",formData?.mobile))) ||
              selectedPassword=="" || 
              (selectedPassword=="password" && !isEmpty(validateField("password",formData?.password)))
            } 
            type="submit" 
            className="form-button"
            onClick={clickSubmit}
        >
          {loading ? Literal[lang].logingin : Literal[lang].login}
        </button>
      </div>
    </FormControl>
    )}
    { selectedPassword=="otp" && showOTPComponent && (
      <VerifyOTP 
          lang={lang} 
          setLoading={setLoading} 
          loading={loading} 
          value={isEmpty(searchParams.get("mobileOrEmail"))? (selected=="mobile"? formData?.mobile: formData?.email) : searchParams.get("mobileOrEmail")}
          showSnackBar={showSnackBar}
          setAlertMsg={setAlertMsg}
          setAlertTitle={setAlertTitle}
          setOpenAlert={setOpenAlert}
          PreOtp={preOtp}
          resendOTP={resendOTP}
          loadingParam={loadingParam}
          setDialogOpen={setDialogOpen}
          action={"login"}
          setChildren={setChildren}
          isManager={isManager}
      />
    )}

      </>
  );
};

export default Login;
