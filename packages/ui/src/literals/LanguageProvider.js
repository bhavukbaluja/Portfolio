import React, { createContext, useState, useEffect } from "react";
import Constants from "./constants";

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(Constants.DEFAULT_LANGUAGE);

  // Fetch selected language from localStorage on mount
  useEffect(() => {
    const storedLang = localStorage.getItem("selectedLanguage");
    if (storedLang) {
      setLang(storedLang);
    }
  }, []);

  // Whenever language changes, update localStorage
  const updateLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem("selectedLanguage", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: updateLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
