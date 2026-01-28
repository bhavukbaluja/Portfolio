import { FormControl } from "@mui/material";
import React, { useState } from "react";
import PasswordRequirementComponent from "@ui/components/Account/PasswordRequirementComponent";
import SetPasswordComp from "@ui/components/Account/SetPasswordComp";
import { changePassword_Url } from "@utils/Config/URLs";
import useNavigateTo from "@utils/helper/ApiConfig/useNavigateTo";
import Literal from "@ui/literals";
import { AccountServices } from "@utils/services/AccountServices";

const SetPassword = ({lang, loading, setLoading, value, showSnackBar, setOpenAlert, setAlertMsg, setAlertTitle, loadingParam, setDialogOpen, action, setChildren}) =>{
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
        oldPassword: ""
    });
   const [errors, setErrors] = useState({}); 
    const { updateDetails } = AccountServices();
    const mobileOrEmail = value;

    const NavigateTo = useNavigateTo();

    const handlePasswordSubmit = async () => {
        setLoading(true);
        const jsonData = {};
            jsonData["password"] = formData?.password;
            jsonData["mobileOrEmail"] = mobileOrEmail;
            if(action=="update"){
                jsonData["oldPassword"] = formData?.oldPassword;
            }
            await updateDetails(changePassword_Url, jsonData )
            .then((response)=>{
                // if(isEmpty(response?.status) || (response?.status && response?.status<300)){
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
                    else if(action=="login"){
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
                    else if(action=="update"){
                        if(response){
                            showSnackBar(Literal[lang].passwordUpdated);
                            setDialogOpen(false);
                            NavigateTo("/");
                        }
                        // else{
                        //     setOpenAlert(true);
                        //     setAlertMsg(Literal[lang].failedToLogIn);
                        // }
                    }
                // }
            }).catch((error)=>{
                // setOpenAlert(true);
                // setAlertMsg(error?.message);
            });
        setLoading(false);
    }

    const handleSkip = ()=>{
        NavigateTo("/");
        setDialogOpen(false);
    }

    return(
        <>
            <FormControl className="signup-login" >
                <div className="verify-login">
                    <PasswordRequirementComponent />
                </div>
                <SetPasswordComp
                    SubmitButton={
                        action=="update"? 
                        (
                            <div className="form-button-container">
                                <button type="button"
                                    className="form-cancel-button"
                                    onClick={()=>setDialogOpen(false)}
                                >
                                    {Literal[lang].cancel}
                                </button> 
                                <button
                                    onClick={handlePasswordSubmit}
                                    variant="contained"
                                    type="submit" 
                                    className="form-button"
                                    disabled={
                                        formData?.password=="" ||
                                        formData?.confirmPassword=="" ||
                                        formData?.password!=formData?.confirmPassword
                                        || formData?.oldPassword==""
                                    }
                                >
                                    {Literal[lang].update}
                                </button>
                            </div>
                        ):
                        (
                            <div className="form-button-container">
                                <button
                                    onClick={handleSkip}
                                    variant="contained"
                                    type="submit" 
                                    className="form-skip-button"
                                    >
                                    {Literal[lang].skip}
                                    </button>
                                    <button
                                    onClick={handlePasswordSubmit}
                                    variant="contained"
                                    type="submit" 
                                    className="form-button"
                                    disabled={
                                        formData?.password=="" 
                                        // confirmPassword=="" ||
                                        // password!=confirmPassword
                                    }
                                >
                                    {Literal[lang].setPassword}
                                </button>
                            </div>
                        )
                    }
                    lang={lang} 
                    setLoading={setLoading} 
                    loading={loading} 
                    value={value}
                    showSnackBar={showSnackBar}
                    setAlertMsg={setAlertMsg}
                    setAlertTitle={setAlertTitle}
                    setOpenAlert={setOpenAlert}
                    loadingParam={loadingParam}
                    setDialogOpen={setDialogOpen}
                    action={action}
                    setChildren={setChildren}
                    setFormData={setFormData}
                    formData={formData}
                    errors={errors}
                    setErrors={setErrors}
                />
            </FormControl>
        </>
    )
}
export default SetPassword;