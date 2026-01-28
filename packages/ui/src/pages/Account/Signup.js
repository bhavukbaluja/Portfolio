import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import BaseTextField2 from "@ui/components/UI/fields/BaseTextField2";
import BaseRadioGroup from "@ui/components/UI/fields/BaseRadioGroup";
import "./Account.scss";
import BaseMobileField from "@ui/components/UI/fields/BaseMobileField";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { Register_Url } from "@utils/Config/URLs";
import { isEmpty, validateField } from "@utils/helper/Helper";
import { FormControl } from "@mui/material";
import { AccountServices } from "@utils/services/AccountServices";
import VerifyOTP from "./VerifyOTP";
import { useSearchParams } from "react-router-dom";
import SetPassword from "./SetPassword";

const Signup = ({loading, setAlertTitle, setLoading, setAlertMsg, setOpenAlert, setChildren, showSnackBar, setDialogOpen, action, setImageRefreshKey, isManager}) => {
  const { lang } = React.useContext(LanguageContext);
  const { register } = AccountServices();
  const [loadingParam, setLoadingParam] = useState("submit");
  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    countryCode: "",
  });
  const [selected, setSelected] = useState("email");
  const [res, setRes] = useState("");

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

  const clickSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    let newErrors = {};
    if (selected !== "mobile") {
      delete formData.mobile;
      delete formData.countryCode;
    } 
    else {
      delete formData.email;
    }
    
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
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }
    registerFunc();     
  };

  const resendOTP = async (mobileOrEmail)=>{
    setLoading(true);
    setLoadingParam("resend");
    await registerFunc(mobileOrEmail);
    setLoadingParam("submit");
  }

  const registerFunc = async (mobileOrEmail) => {
      const jsonData = {};
      jsonData["fullName"] = formData.fullName;
      jsonData["mobileOrEmail"] = mobileOrEmail || formData.email || formData.mobile;

      await register(Register_Url, jsonData ).then((response)=>{
        showSnackBar(response);
        setRes(response);
      })
      .catch((error)=>{
      // setOpenAlert(true);
      // setAlertMsg(error?.message);
    });
    setLoading(false);
  }
  
  const registerOpt = [
    { label: "email", value: "email" },
    { label: "mobile", value: "mobile" },
  ];




  return (
    <>
    { isEmpty(res) && isEmpty(searchParams.get("mobileOrEmail")) && isEmpty(searchParams.get("otp")) ? (
    <FormControl className="signup-login" 
        onSubmit={clickSubmit}
      >
      <BaseTextField2
        id="fullName-input"
        label="name"
        name="fullName"
        required={true}
        placeHolderText="fullNamePlaceholder"
        value={formData.fullName}
        onChange={handleChange}
        errorMsg={errors.fullName}
      />
        <BaseRadioGroup 
          name="registerOpt"
          options={registerOpt} 
          value={selected} 
          onChange={setSelected} 
          dress={true}
        />
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
        <div><b>{Literal[lang].note}:</b> {Literal[lang].receiveOTP.replace("{0}",Literal[lang].email)}</div>
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
          <div><b>{Literal[lang].note}:</b> {Literal[lang].receiveOTP.replace("{0}",Literal[lang].mobile)}</div>
          </>
      )}
      <div className="form-button-container">
        <button 
            disabled={loading || (Object.keys(errors).length > 0)} 
            type="submit" 
            className="form-button"
            onClick={clickSubmit}
        >
          {loading ? Literal[lang].registering : Literal[lang].register}
        </button>
      </div>
    </FormControl>
    ):
    (
      <VerifyOTP 
          lang={lang} 
          setLoading={setLoading} 
          loading={loading} 
          value={isEmpty(searchParams.get("mobileOrEmail"))? (selected=="mobile"? formData?.mobile: formData?.email) : searchParams.get("mobileOrEmail")}
          showSnackBar={showSnackBar}
          setAlertMsg={setAlertMsg}
          setAlertTitle={setAlertTitle}
          setOpenAlert={setOpenAlert}
          PreOtp={searchParams.get("otp")}
          resendOTP={resendOTP}
          loadingParam={loadingParam}
          setDialogOpen={setDialogOpen}
          action={action}
          setChildren={setChildren}
          setImageRefreshKey={setImageRefreshKey}
          isManager={isManager}
      />
  //     <SetPassword 
  //     lang={lang} 
  //     setLoading={setLoading} 
  //     loading={loading} 
  //     value={isEmpty(searchParams.get("mobileOrEmail"))? (selected=="mobile"? formData?.mobile: formData?.email) : searchParams.get("mobileOrEmail")}
  //     showSnackBar={showSnackBar}
  //     setAlertMsg={setAlertMsg}
  //     setAlertTitle={setAlertTitle}
  //     setOpenAlert={setOpenAlert}
  //     PreOtp={searchParams.get("otp")}
  //     resendOTP={resendOTP}
  //     loadingParam={loadingParam}
  //     setDialogOpen={setDialogOpen}
  //     action={action}
  //     setChildren={setChildren}
  // />
    )}

      </>
  );
};

export default Signup;
