import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from '@mui/material';
import { LanguageProvider } from '@ui/literals/LanguageProvider.js';
import Login_Signup from '@ui/pages/Account/Login_Signup.js';
import LogOutPage from '@ui/pages/Account/LogOut.js';
import Orders from '@ui/pages/Account/Orders.js';
import Profile from '@ui/pages/Account/Profile.js';
import VerifyPage from './pages/Account/VerifyPage.js';
import Wishlist from '@ui/pages/Account/Wishlist.js';
import { ErrorProvider } from '@utils/helper/ApiConfig/ErrorContext.js';
import useNavigateTo from '@utils/helper/ApiConfig/useNavigateTo.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SnackbarProvider, useSnackbar } from 'notistack';
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import CustomBackdrop from '@ui/components/UI/widgets/CustomBackdrop.js';
import HomePage from './HomePage2.js';
import NotFound from '@ui/pages/Common/NotFound.js';
import ScrollToTop from '@ui/pages/Common/ScrollToTop.js';
// import About_us from './pages/Management-Pages/About_us.js';
import AboutUs from '@ui/pages/Company/AboutUs.js';
import ContactUs from '@ui/pages/Company/ContactUs.js';
import Footer from './pages/Footer/Footer.js';
import Header from './pages/Header/Header.js';
import ProtectedRoute from './routes/ProtectedRoute.js';
import { Page_URL } from '@utils/Config/URLs';
import { convertEntities } from '@utils/helper/Helper';
import { PanelServices } from '@utils/services/PanelServices';
import SinglePageLoader from "@ui/pages/Company/SinglePageLoader.js";
import SiteMaintenancePage from "@ui/pages/Common/SiteMaintenancePage.jsx";
import { PublicServices } from "@utils/services/PublicServices";
import TrendingBarHeader from "./pages/Header/TrendingBarHeader.js";
import ProductPage from "./pages/Middle/Products/ProductPage.js";
import SizeWrapper from "./pages/Account/SizeWrapper.js";
import { WishlistProvider } from "@utils/helper/ApiConfig/WishlistContext";
import WishlistPage from "./pages/Account/Wishlist/WishlistPage.js";
import AddressesWrapper from "./pages/Account/Address/AddressesWrapper.js";
import { CartProvider } from "@utils/helper/ApiConfig/CartContext";
import CartWrapper from "@ui/components/Account/Cart/CartWrapper.js";
import CheckoutPage from "@ui/components/Account/Cart/CheckoutPage.js";
import OrderDetailsPage from "@ui/components/Account/Order/OrderDetailsPage.js";
import OrdersPage from "@ui/components/Account/Order/OrdersPage.js";
import FloatingButtons from "@ui/components/FloatingButtons.js";
import LoginPage from "./pages/Account/LoginPage.js";
import { AuthProvider, AuthContext } from '@utils/helper/ApiConfig/AuthProvider.js';
import { ThemeProvider } from "@utils/Config/ThemeProvider.js";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [siteEnabled, setSiteEnabled] = useState(true); // <- new
  const [hideSite, setHideSite] = useState(true); // <- new
  const [siteStatusChecked, setSiteStatusChecked] = useState(false); // <- new
  const {isWebsiteEnabled} = PublicServices();
  const siteName = "web-poshdori";

  useEffect(() => {

    // Run once on mount to get initial window size
    const checkIsMobile = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
    
      const isTablet = /ipad|tablet|playbook|silk/.test(userAgent);
      const isMobileDevice = /android|iphone|ipod|blackberry|iemobile|opera mini/.test(userAgent);
    
      setIsMobile(isMobileDevice || isTablet || width <= 1024);
    };
    
    checkIsMobile(); // Set initial value on client
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

    useEffect(() => {
      const checkSiteStatus = async () => {
        try {
          // Step 1: Check if main site is enabled
          const siteStatus = await isWebsiteEnabled(siteName);
          setSiteEnabled(siteStatus);

          // Step 2: If site is disabled, check "hide-site" flag
          if (!siteStatus) {
            try {
              const hideStatus = await isWebsiteEnabled("hide-site");
              setHideSite(hideStatus);
            } catch {
              setHideSite(true);
            }
          }
        } catch (err) {
          // If first call itself fails, treat as disabled
          try {
            const hideStatus = await isWebsiteEnabled("hide-site");
            setHideSite(hideStatus);
          } catch {
            setHideSite(true);
          } finally {
            setSiteEnabled(false);
          }
        } finally {
          setSiteStatusChecked(true);
        }
      };

      checkSiteStatus();
    }, []);


  if (!siteStatusChecked) return null; // or a spinner
  
  return (
    <ThemeProvider>
    <LanguageProvider>
      <ErrorProvider>
        <AuthProvider setLoading={setLoading}>
          <WishlistProvider>
            <CartProvider>
              <SnackbarProvider maxSnack={3}>
                <Router>
                  <Routes>
                    {siteEnabled ? (
                      <Route
                        path="/*"
                        element={
                          <>
                            <MainContent
                              isMobile={isMobile}
                              selectedItem={selectedItem}
                              setSelectedItem={setSelectedItem}
                              loading={loading}
                              setLoading={setLoading}
                            />
                            <CustomBackdrop loading={loading} />
                          </>
                        }
                      />
                    ) : hideSite ? (
                      // ✅ SITE DISABLED + hideSite true → redirect all to contactUs
                      <>
                        <Route path="*" element={<Navigate to="/contactUs" replace />} />
                        <Route path="/contactUs" element={<ContactUs isMobile={isMobile} setLoading={setLoading} loading={loading}/>} />
                      </>
                    ) : (
                      // ✅ SITE DISABLED but NOT hidden → maintenance + contact page accessible
                      <>
                        <Route path="*" element={<SiteMaintenancePage isMobile={isMobile} />} />
                        <Route path="/contactUs" element={<ContactUs isMobile={isMobile} setLoading={setLoading} loading={loading}/>} />
                      </>
                    )}
                  </Routes>
                </Router>
              </SnackbarProvider>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
      </ErrorProvider>
    </LanguageProvider>
    </ThemeProvider>
  );
}

function MainContent({ isMobile, selectedItem, setSelectedItem, loading, setLoading }) {
  const location = useLocation();  // ✅ Now it is inside <Router>
  const NavigateTo = useNavigateTo();

  const { user } = useContext(AuthContext);
  const [isLoginSignupOpen, setIsLoginSignupOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [imageRefreshKey, setImageRefreshKey] = useState(Date.now());
  const openLoginSignup = () => setIsLoginSignupOpen(true);
  const [openTracking, setOpenTracking] = useState(false);

  const [activePages, setActivePages] = useState([]);

  const { getGridData } = PanelServices();
  
  useEffect(() => {
    setSelectedItem(location.pathname);
  
    return () => {}; // ✅ Ensures a valid cleanup function exists (even if empty)
  }, [location]);
  
  useEffect(() => {
    const fetchActivePages = async () => {
      setLoading(true);
      try {
        const res = await getGridData(Page_URL + "/allActive");
        const result = convertEntities(res?.data, "", "ACTIVE", "");
        setActivePages(result || []);
      } catch (err) {
        console.error("Failed to load pages", err);
      }
      setLoading(false);
    };

    fetchActivePages();
  }, []);


  // Function to close modal and NOT navigate away
  const closeLoginSignup = (action) => {
    if(location?.pathname=="/login"){
      NavigateTo("/");
    }
    setIsLoginSignupOpen(false);
  }

  const showSnackBar = (snackMessage, variant) => {
      enqueueSnackbar(snackMessage, {
        variant: variant || "success",
        ContentProps: {
          style: { fontSize: "1.2rem", padding: "16px", minWidth: "300px" }, // Larger snackbar
        },
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)} style={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        ),
      });
    };

  return (
    <>
      <TrendingBarHeader isMobile/>
      <Header isMobile={isMobile} setLoading={setLoading} selectedItem={selectedItem} setSelectedItem={setSelectedItem} onLoginClick={openLoginSignup}  imageRefreshKey={imageRefreshKey} setImageRefreshKey={setImageRefreshKey}/>
      <ScrollToTop/>
      <Routes>
        <Route path="/contactUs" element={<ContactUs isMobile={isMobile} setLoading={setLoading} loading={loading}/>} />
        <Route path="/" element={<HomePage isMobile={isMobile} setLoading={setLoading} loading={loading} setImageRefreshKey={setImageRefreshKey} imageRefreshKey={imageRefreshKey}/>} />
        <Route path="/login" element={ user ? <Navigate to="/" replace /> : (
            <LoginPage openLoginSignup={openLoginSignup}/>
            )
          }
        /><Route path="/wishlist" element={<WishlistPage isMobile={isMobile} setLoading={setLoading} loading={loading} showSnackBar={showSnackBar}/>} />
        <Route path="/cart" element={<CartWrapper isMobile={isMobile} setIsLoginSignupOpen={setIsLoginSignupOpen} setLoading={setLoading} loading={loading} showSnackBar={showSnackBar}/>} />
        <Route path="/logout" element={<LogOutPage setLoading={setLoading}/>} />
        <Route path="/product/:id" element={<ProductPage isMobile={isMobile} setIsLoginSignupOpen={setIsLoginSignupOpen} setLoading={setLoading} loading={loading} showSnackBar={showSnackBar}/>} />
        <Route path="/product" element={<Navigate to="/"/>} />
        <Route path="/company" element={<Navigate to="/about_us" />} />
        {/* {/* <Route path="/company/about_us" element={<AboutUs isMobile={isMobile} />} /> */}
        <Route path="/sizes" element={       
           <SizeWrapper
              isMobile={isMobile}
              loading={loading}
              setLoading={setLoading}
              showSnackBar={showSnackBar}
            />} 
          />
        <Route path="/verify/signup" element={<VerifyPage isMobile={isMobile} onLoginSignupVerify={openLoginSignup} loading={loading} setLoading={setLoading} setImageRefreshKey={setImageRefreshKey} imageRefreshKey={imageRefreshKey}/>} />
        <Route path="/verify/login" element={<VerifyPage isMobile={isMobile} onLoginSignupVerify={openLoginSignup} loading={loading} setLoading={setLoading} setImageRefreshKey={setImageRefreshKey} imageRefreshKey={imageRefreshKey}/>} />
        {/* <Route path="/management/aboutus/edit" element={<About_us isMobile={isMobile} loading={loading} setLoading={setLoading} showSnackBar={showSnackBar}/>} /> */}
        
        {/* Dynamic active page routes */}
          {activePages.map((page) => (
            <Route
              key={page.value}
              path={page.path}
              element={
                <SinglePageLoader
                  page={page}
                  isMobile={isMobile}
                  setLoading={setLoading}
                  loading={loading}
                />
              }
            />
          ))}
        <Route element={<ProtectedRoute />}>
          <Route path="/addresses" element={<AddressesWrapper isMobile={isMobile} setLoading={setLoading} loading={loading} showSnackBar={showSnackBar}/>} />
          <Route path="/order" element={<Navigate to="/orders"/>} />
          <Route path="/orders" element={<OrdersPage isMobile={isMobile} setLoading={setLoading} loading={loading} showSnackBar={showSnackBar} setImageRefreshKey={setImageRefreshKey} imageRefreshKey={imageRefreshKey}/>} />
          <Route path="/orders/confirmation" element={<OrderDetailsPage openTracking={openTracking} setOpenTracking={setOpenTracking} isMobile={isMobile} action="confirmation" isManager={false} setLoading={setLoading} loading={loading} showSnackBar={showSnackBar} setImageRefreshKey={setImageRefreshKey} imageRefreshKey={imageRefreshKey}/>} />
          <Route path="/orders/details" element={<OrderDetailsPage openTracking={openTracking} setOpenTracking={setOpenTracking} isMobile={isMobile} action="details" isManager={false} setLoading={setLoading} loading={loading} showSnackBar={showSnackBar} setImageRefreshKey={setImageRefreshKey} imageRefreshKey={imageRefreshKey}/>} />
          <Route path="/checkout" element={<CheckoutPage openTracking={openTracking} setOpenTracking={setOpenTracking} isMobile={isMobile} setLoading={setLoading} loading={loading} showSnackBar={showSnackBar}/>} />
          <Route path="/profile" element={<Profile isMobile={isMobile} setLoading={setLoading} showSnackBar={showSnackBar} imageRefreshKey={imageRefreshKey} setImageRefreshKey={setImageRefreshKey} />} />
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>

      {/* Show Login/Signup Dialog when /login_signup is visited */}
      {isLoginSignupOpen && (
        <Login_Signup isMobile={isMobile} isManager={false} setImageRefreshKey={setImageRefreshKey} showSnackBar={showSnackBar} open={isLoginSignupOpen} action={location?.pathname?.substring(location.pathname.lastIndexOf("/") + 1)} setOpen={closeLoginSignup} />
      )}
      <FloatingButtons/>
      <Footer isMobile={isMobile} setLoading={setLoading}/>
    </>
  );
}

export default App;
