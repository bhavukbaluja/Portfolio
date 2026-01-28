import React, { createContext, useState, useContext } from "react";
import CustomAlertBox from "@ui/components/UI/widgets/CustomAlertBox";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import { isEmpty } from "@utils/helper/Helper";
import PropertiesData from "@utils/Config/Properties.json";

const ErrorContext = createContext();

// Custom hook to use error handling
export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
    const { lang } = React.useContext(LanguageContext);
    const properties = PropertiesData[lang];
    const [error, setError] = useState({ open: false, title: "Alert", message: "", details: [
        Literal[lang].failureMessage,
        Literal[lang].technicalGlitch,
        Literal[lang].contactSupport.replaceAll("{supportEmail",properties.email)
    ] });

    // Function to show error message
    const showError = (title, message, details = []) => {
        setError({ open: true, title: title, message, details: Array.isArray(details) ? details : !isEmpty(details)?[details]:[
            Literal[lang].failureMessage,
            Literal[lang].technicalGlitch,
            Literal[lang].contactSupport.replaceAll("{supportEmail}",properties.email)
        ] });
    };

    // Function to close error alert
    const closeError = () => {
        setError({ open: false, message: "", details: [], title: "Alert" });
    };

    return (
        <ErrorContext.Provider value={{ showError, closeError }}>
            {children}

            {/* 🔥 Global Error Dialog */}
            <CustomAlertBox 
                Msg={error?.message} 
                children={error?.details} 
                title={error?.title}
                open={error?.open} 
                setOpen={closeError} 
            />
        </ErrorContext.Provider>
    );
};
