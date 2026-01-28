import React, { useState, useContext } from "react";
import BaseTabs from "@ui/components/UI/fields/BaseTabs";
import Signup from "@ui/pages/Account/Signup";
import Login from "@ui/pages/Account/Login";
import CustomBackdrop from "@ui/components/UI/widgets/CustomBackdrop";
import CustomAlertBox from "@ui/components/UI/widgets/CustomAlertBox";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import Literal from "@ui/literals";
import BrandLogo from "@ui/components/BrandLogo/BrandLogo";
import { Box } from "@mui/material";
import "./Account.scss";
import HomeBgImage from "@assets/Home-bg.jpeg"
import SafeImage from "@utils/helper/SafeImage";

const LoginPage = ({action, showSnackBar, setImageRefreshKey, isMobile, isManager})=>{
    const { lang } = useContext(LanguageContext);
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [alertTitle, setAlertTitle] = useState("");
    const [children, setChildren] = useState([]);
    const [showOTPComponent, setShowOTPComponent] = useState(false);
    
    if(action!="login" && action !="signup"){
      action="login";
    }
    const BodyComponent = () => {
        const tabItems = [
            { label: Literal[lang].login, 
                value: "login", 
                PanelComponent: <Login 
                                    loading={loading} 
                                    setAlertTitle={setAlertTitle}
                                    setLoading={setLoading} 
                                    setAlertMsg={setAlertMsg} 
                                    setOpenAlert={setOpenAlert}
                                    setChildren={setChildren}
                                    showSnackBar={showSnackBar}
                                    isManager={isManager}
                                    // setDialogOpen={setOpen}
                                    action={action}
                                    setImageRefreshKey={setImageRefreshKey}
                                    mobileLogin={false}
                                    // showOTPComponent={showOTPComponent}
                                    // setShowOTPComponent={setShowOTPComponent}
                                /> },
            // { label: Literal[lang].signup, 
            //     value: "signup", 
            //     PanelComponent: <Signup 
            //                         loading={loading} 
            //                         setAlertTitle={setAlertTitle}
            //                         setLoading={setLoading}
            //                         setAlertMsg={setAlertMsg} 
            //                         setOpenAlert={setOpenAlert}
            //                         setChildren={setChildren}
            //                         showSnackBar={showSnackBar}
            //                         setDialogOpen={setOpen}
            //                         action={action}
            //                         setImageRefreshKey={setImageRefreshKey}
            //                         isManager={isManager}

            //                     /> },
          ];
          return( <BaseTabs 
            tabItems={tabItems} 
            defaultValue={action} 
            style={{
                display: 'flex',
                flexGrow: 1,
                width: '100%', 
                maxWidth: '80vw', 
                minWidth: isMobile? '350px': '600px',
                paddingBottom: '35px'
            }}
        />)
    }
    return(
        <div className="login-page">
            <SafeImage src={HomeBgImage} className="login-page"/>
            <Box className="login-page-box">
                <BrandLogo isMobile={isMobile}/>
                <BodyComponent/>
            </Box> 
            <CustomBackdrop loading={loading}/>
            <CustomAlertBox Msg={alertMsg} open={openAlert} setOpen={setOpenAlert} children={children}/>
        </div>
    )
}
export default LoginPage;
