import React, { useState } from "react";
import BaseDialog from "@ui/components/UI/fields/BaseDialog";
import BaseTabs from "@ui/components/UI/fields/BaseTabs";
import Signup from "./Signup";
import Login from "./Login";
import CustomBackdrop from "@ui/components/UI/widgets/CustomBackdrop";
import CustomAlertBox from "@ui/components/UI/widgets/CustomAlertBox";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import Literal from "@ui/literals";

const Login_Signup = ({open, setOpen, action, showSnackBar, setImageRefreshKey, isMobile, isManager}) => {
    const { lang } = React.useContext(LanguageContext);
    const [loading, setLoading] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [alertTitle, setAlertTitle] = useState("");
    const [children, setChildren] = useState([]);
    if(action!="login" && action !="signup"){
      action="signup";
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
                                    setDialogOpen={setOpen}
                                    action={action}
                                    setImageRefreshKey={setImageRefreshKey}
                                    isManager={isManager}
                                /> },
            { label: Literal[lang].signup, 
                value: "signup", 
                PanelComponent: <Signup 
                                    loading={loading} 
                                    setAlertTitle={setAlertTitle}
                                    setLoading={setLoading}
                                    setAlertMsg={setAlertMsg} 
                                    setOpenAlert={setOpenAlert}
                                    setChildren={setChildren}
                                    showSnackBar={showSnackBar}
                                    setDialogOpen={setOpen}
                                    action={action}
                                    setImageRefreshKey={setImageRefreshKey}
                                    isManager={isManager}
                                /> },
          ];
          return( <BaseTabs 
                    tabItems={tabItems} 
                    defaultValue={action} 
                    style={{
                            display: 'flex',
                            flexGrow: 1,
                            width: '100%', 
                            maxWidth: '80vw', 
                            minWidth: isMobile? '300px': '600px'
                        }}
                    />
                )
    }
    return(
        <div>
            <BaseDialog 
                open={open} 
                setOpen={setOpen}
                bodyComponent={BodyComponent()} 
            />
            <CustomBackdrop loading={loading}/>
            <CustomAlertBox Msg={alertMsg} open={openAlert} setOpen={setOpenAlert} children={children}/>
        </div>
    )
}
export default Login_Signup;
