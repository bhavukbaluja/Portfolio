import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from '@mui/material';
import { LanguageProvider } from '@ui/literals/LanguageProvider.js';
import NotFound from '@ui/pages/Common/NotFound.js';
import { ErrorProvider } from '@utils/helper/ApiConfig/ErrorContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SnackbarProvider, useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
// ✅ FIXED: Changed BrowserRouter to HashRouter
import { Navigate, Route, HashRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import ScrollToTop from '@ui/pages/Common/ScrollToTop.js';
import { ThemeProvider } from "@utils/Config/ThemeProvider.js";
import DashboardLayout from "./layouts/DashboardLayout.js";
import Home from "./pages/Middle/Home.js";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import FloatingButtons from "@ui/components/FloatingButtons.js";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      const isTablet = /ipad|tablet|playbook|silk/.test(userAgent);
      const isMobileDevice = /android|iphone|ipod|blackberry|iemobile|opera mini/.test(userAgent);
      setIsMobile(isMobileDevice || isTablet || width <= 1024);
    };
    checkIsMobile(); 
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <ThemeProvider>
    <LanguageProvider>
      <ErrorProvider>
          <SnackbarProvider maxSnack={3}>
              {/* ✅ Router is now HashRouter */}
              <Router>
                <MainContent isMobile={isMobile} selectedItem={selectedItem} setSelectedItem={setSelectedItem} loading={loading} setLoading={setLoading}/>
              </Router>
          </SnackbarProvider>
      </ErrorProvider>
    </LanguageProvider>
    </ThemeProvider>
  );
}

function MainContent({ isMobile, selectedItem, setSelectedItem, loading, setLoading }) {
  const location = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [imageRefreshKey, setImageRefreshKey] = useState(Date.now());
  const headerRef = useRef();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (location?.pathname) {
      // In HashRouter, pathname will be just "/" or "/about", avoiding the "/Portfolio" prefix issue
      const firstPart = "/" + location.pathname.split("/")[1]; 
      setSelectedItem(firstPart);
    }
  }, [location]); 
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      scrollContainer: '.dashboard-content' 
    });
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const showSnackBar = (snackMessage) => {
    enqueueSnackbar(snackMessage, {
      variant: "success",
      ContentProps: {
        style: { fontSize: "1.2rem", padding: "16px", minWidth: "300px" },
      },
      action: (key) => (
        <IconButton onClick={() => closeSnackbar(key)} style={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      ),
    });
  };

  return (
    <div className="main-app-class">
      <ScrollToTop/>
      <Routes>
        <Route
              element={
                <DashboardLayout
                  isMobile={isMobile}
                  ref={headerRef} 
                  loading={loading}
                  setLoading={setLoading}
                  selectedItem={selectedItem}
                  mobileOpen={mobileOpen}
                  setMobileOpen={setMobileOpen}
                  handleDrawerToggle={handleDrawerToggle}
                  setSelectedItem={setSelectedItem}
                  imageRefreshKey={imageRefreshKey}
                  setImageRefreshKey={setImageRefreshKey}
                />
              }
            >
            <Route path="/" element={<Home isMobile={isMobile}/>} />
            <Route path="" element={<Home isMobile={isMobile}/>} />
            
            {/* Catch-all for sub-routes */}
            <Route path="*" element={<NotFound />} />
        </Route>

        {/* Catch-all for root level */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <FloatingButtons handleDrawerToggle={handleDrawerToggle} isMobile={isMobile}/>
    </div>
  );
}

export default App;