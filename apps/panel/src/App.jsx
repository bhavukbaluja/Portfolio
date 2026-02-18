import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from '@mui/material';
import { LanguageProvider } from '@ui/literals/LanguageProvider.js';
import NotFound from '@ui/pages/Common/NotFound.js';
import { ErrorProvider } from '@utils/helper/ApiConfig/ErrorContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SnackbarProvider, useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import { Route, HashRouter as Router, Routes, useLocation } from 'react-router-dom';
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

  // 1. Initial Load: Read from React Router
  useEffect(() => {
    if (location?.pathname) {
      const firstPart = location.pathname.split("/")[1]; 
      setSelectedItem(firstPart ? firstPart : "home");
    }
  }, [location, setSelectedItem]); 

  // 2. ✅ FIX: Listen for Scroll Spy updates from Home.js
  useEffect(() => {
    const handleScrollUpdate = (e) => {
      // e.detail is exactly "portfolio", "about", etc.
      if (e.detail) {
        setSelectedItem(e.detail);
      }
    };

    window.addEventListener('active-section-update', handleScrollUpdate);
    return () => window.removeEventListener('active-section-update', handleScrollUpdate);
  }, [setSelectedItem]);

  // useEffect(() => {
  //   if (location?.pathname) {
  //     const firstPart = location.pathname.split("/")[1]; 
  //     // ✅ FIX: Default to "home" if firstPart is empty (e.g., when path is just "/")
  //     setSelectedItem(firstPart ? firstPart : "home");
  //   }
  // }, [location, setSelectedItem]); 
  
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
            
            {/* ✅ FIX: Add a dynamic route so any section parameter renders Home */}
            <Route path="/" element={<Home isMobile={isMobile}/>} />
            <Route path="/:section" element={<Home isMobile={isMobile}/>} />
            
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <FloatingButtons handleDrawerToggle={handleDrawerToggle} isMobile={isMobile}/>
    </div>
  );
}

export default App;