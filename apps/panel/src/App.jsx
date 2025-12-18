import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from '@mui/material';
import { LanguageProvider } from '@ui/literals/LanguageProvider.js';
import LoginPage from './pages/Account/LoginPage.js';
import LogOutPage from '@ui/pages/Account/LogOut.js';
import Orders from '@ui/pages/Account/Orders.js';
import Profile from '@ui/pages/Account/Profile.js';
import VerifyPage from './pages/Account/VerifyPage.js';
import Wishlist from '@ui/pages/Account/Wishlist.js';
import { AuthProvider, AuthContext } from '@utils/helper/ApiConfig/AuthProvider.js';
import { ErrorProvider } from '@utils/helper/ApiConfig/ErrorContext.js';
import useNavigateTo from '@utils/helper/ApiConfig/useNavigateTo.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SnackbarProvider, useSnackbar } from 'notistack';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import CustomBackdrop from '@ui/components/UI/widgets/CustomBackdrop.js';
import { PublicServices } from "@utils/services/PublicServices";
import HomePage from './HomePage2.js';
import NotFound from '@ui/pages/Common/NotFound.js';
// import About_us from './pages/Management-Pages/About_us.js';
// import AboutUs from './pages/Company/AboutUs.js';
// import ContactUs from './pages/Company/ContactUs.js';
import Footer from './pages/Footer/Footer.js';
import Header from './pages/Header/Header.js';
import Products from './pages/Middle/Products/ProductsPage.js';
import ProtectedRoute from './routes/ProtectedRoute.js';
import SideBarHeader from "./pages/Header/SideBarHeader.js";
import DashboardLayout from "./layouts/DashboardLayout.js";
import Inventory from "./pages/Panel/Inventory/Inventory.js";
import Product from "./pages/Panel/Product/Product.js";
import Category from "./pages/Panel/Category/Category.js";
import Pages from "./pages/Panel/ComapnyPages/Pages.js";
import SizeChart from "./pages/Panel/SizeChart/SizeChart.js";
import SwitchOnOffWebsite from "./pages/Panel/WebConfigs/SwitchOnOffWebsite/SwitchOnOffWebsite.js";
import SiteMaintenancePage from "@ui/pages/Common/SiteMaintenancePage.jsx";
import WebTrendingBarWrapper from "./pages/Panel/WebConfigs/WebTrending/WebTrendingBarWrapper.js";
import HomeConfigs from "./pages/Panel/WebConfigs/HomePage/HomeConfigs.js";
import OrdersPage from "@ui/components/Account/Order/OrdersPage";
import OrderDetailsPage from "@ui/components/Account/Order/OrderDetailsPage.js";
import { AFTER_SALE_STATUSES } from "@utils/helper/Helper";
import Literal from "@ui/literals";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import AuditTrail from "./pages/Panel/AuditTrail/AuditTrail.js";
import QuotaUsage from "./pages/Panel/QuotaUsage/QuotaUsage.js";
import TeamUsers from "./pages/Panel/Users/TeamUsers.js";
import Customers from "./pages/Panel/Users/Customers.js";
import NotAllowed from '@ui/pages/Common/NotAllowed.js';
import ScrollToTop from '@ui/pages/Common/ScrollToTop.js';
import { Page_URL } from '@utils/Config/URLs';
import { convertEntities } from '@utils/helper/Helper';
import { PanelServices } from '@utils/services/PanelServices';
import SinglePageLoader from "@ui/pages/Company/SinglePageLoader.js";
import ContactUs from '@ui/pages/Company/ContactUs.js';
import { ThemeProvider } from "@utils/Config/ThemeProvider.js";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [siteEnabled, setSiteEnabled] = useState(true); // <- new
  const [siteStatusChecked, setSiteStatusChecked] = useState(false); // <- new
  const {isWebsiteEnabled} = PublicServices();
  const siteName = "panel-poshdori";

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
    // Fetch site enabled status
    isWebsiteEnabled(siteName)
    .then(res => {
        setSiteEnabled(res);
        setSiteStatusChecked(true);
      })
      .catch(() => {
        setSiteEnabled(false); // fallback to enabled
        setSiteStatusChecked(true);
      });
  }, []);

  if (!siteStatusChecked) return null; // or a spinner

  return (
    <ThemeProvider>
    <LanguageProvider>
      <ErrorProvider>
        <AuthProvider setLoading={setLoading}>
          <SnackbarProvider maxSnack={3}>
              <Router>
                {siteEnabled ? (
                    <>
                      <MainContent isMobile={isMobile} selectedItem={selectedItem} setSelectedItem={setSelectedItem} loading={loading} setLoading={setLoading}/>
                      <div>
                        <CustomBackdrop loading={loading}/>
                      </div>
                    </>
                  ) : (
                    <SiteMaintenancePage isMobile={isMobile}/>
                )}
              </Router>
          </SnackbarProvider>
        </AuthProvider>
      </ErrorProvider>
    </LanguageProvider>
    </ThemeProvider>
  );
}

function MainContent({ isMobile, selectedItem, setSelectedItem, loading, setLoading }) {
  const location = useLocation();
  const NavigateTo = useNavigateTo();
  const { user } = useContext(AuthContext);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [imageRefreshKey, setImageRefreshKey] = useState(Date.now());
  const { lang } = useContext(LanguageContext);
  const headerRef = useRef();
  const [openTracking, setOpenTracking] = useState(false);
  const [activePages, setActivePages] = useState([]);
  const { getGridData } = PanelServices();

  const refreshSidebarCounts = () => {
    headerRef.current?.fetchOrdersCount(); // 🔥 Call Header's method
  };


  useEffect(() => {
    if (location?.pathname) {
      const firstPart = "/" + location.pathname.split("/")[1]; // "/orders"
      setSelectedItem(firstPart);
    }
  }, [location]);  

  useEffect(() => {
    const fetchActivePages = async () => {
      setLoading(true);
      try {
        const res = await getGridData(Page_URL + "/allActive");
        const result = convertEntities(res?.data, "", "ACTIVE", "/company");
        setActivePages(result || []);
      } catch (err) {
        console.error("Failed to load pages", err);
      }
      setLoading(false);
    };

    fetchActivePages();
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
        {/* Public Routes */}
        <Route
          path="/notAllowed"
          element={
            <NotAllowed
              // isMobile={isMobile}
              // setImageRefreshKey={setImageRefreshKey}
              // showSnackBar={showSnackBar}
              // action={location?.pathname?.substring(location.pathname.lastIndexOf("/") + 1)}
              // isManager={true}
            />
          }
        />
        <Route path="/contactUs" element={<ContactUs isMobile={isMobile} setLoading={setLoading} loading={loading}/>} />
        <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : (
            <LoginPage
              isMobile={isMobile}
              setImageRefreshKey={setImageRefreshKey}
              showSnackBar={showSnackBar}
              action={location?.pathname?.substring(location.pathname.lastIndexOf("/") + 1)}
              isManager={true}
            />
            )
          }
        />
        <Route
          path="/verify/login"
          element={
            <LoginPage
              isMobile={isMobile}
              setImageRefreshKey={setImageRefreshKey}
              showSnackBar={showSnackBar}
              action="login"
              isManager={true}
            />
          }
        />
        <Route path="/logout" element={<LogOutPage setLoading={setLoading} />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
            {/* Routes with Dashboard layout and specific styles/components */}
            <Route
              element={
                <DashboardLayout
                  isMobile={isMobile}
                  ref={headerRef} 
                  loading={loading}
                  setLoading={setLoading}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  imageRefreshKey={imageRefreshKey}
                  setImageRefreshKey={setImageRefreshKey}
                />
              }
            >
              {/* <Route path="/" element={<HomePage isMobile={isMobile} />} /> */}
                                        {/* OR */}
              <Route path="/" element={<Navigate to="orders" replace />} />
              <Route path="/logout" element={<LogOutPage setLoading={setLoading} />} />
              <Route path="/order" element={<Navigate to="/orders"/>} />
              <Route path="/orders/confirmation" element={<OrderDetailsPage openTracking={openTracking} setOpenTracking={setOpenTracking} refreshSidebarCounts={refreshSidebarCounts} isMobile={isMobile} isManager={true} action="confirmation" setLoading={setLoading} loading={loading} showSnackBar={showSnackBar} setImageRefreshKey={setImageRefreshKey} imageRefreshKey={imageRefreshKey}/>} />
              <Route path="/orders/details" element={<OrderDetailsPage openTracking={openTracking} setOpenTracking={setOpenTracking} refreshSidebarCounts={refreshSidebarCounts} isMobile={isMobile} action="details" isManager={true} setLoading={setLoading} loading={loading} showSnackBar={showSnackBar} setImageRefreshKey={setImageRefreshKey} imageRefreshKey={imageRefreshKey}/>} />
              <Route
                path="/orders"
                element={
                  <OrdersPage
                    key="allOrders"
                    isMobile={isMobile}
                    refreshSidebarCounts={refreshSidebarCounts}
                    isManager={true}
                    setLoading={setLoading}
                    showSnackBar={showSnackBar}
                    page={Literal[lang].orderPages["allOrders"]}
                    setImageRefreshKey={setImageRefreshKey} 
                    imageRefreshKey={imageRefreshKey}
                  />
                }
              />
              <Route path="/company/contactUs" element={<ContactUs isMobile={isMobile} setLoading={setLoading} loading={loading}/>} />
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
              <Route
                path="/pendingOrders"
                element={
                  <OrdersPage
                    key="pendingOrders"
                    isMobile={isMobile}
                    isManager={true}
                    refreshSidebarCounts={refreshSidebarCounts}
                    setLoading={setLoading}
                    showSnackBar={showSnackBar}
                    page={Literal[lang].orderPages["pendingOrders"]}
                    setImageRefreshKey={setImageRefreshKey} 
                    imageRefreshKey={imageRefreshKey}
                  />
                }
              />

              <Route
                path="/newOrders"
                element={
                  <OrdersPage
                    key="newOrders"
                    isMobile={isMobile}
                    isManager={true}
                    refreshSidebarCounts={refreshSidebarCounts}
                    setLoading={setLoading}
                    showSnackBar={showSnackBar}
                    page={Literal[lang].orderPages["newOrders"]}
                    setImageRefreshKey={setImageRefreshKey} 
                    imageRefreshKey={imageRefreshKey}
                  />
                }
              />

              <Route
                path="/confirmedOrders"
                element={
                  <OrdersPage
                    key="confirmedOrders"
                    isMobile={isMobile}
                    isManager={true}
                    refreshSidebarCounts={refreshSidebarCounts}
                    setLoading={setLoading}
                    showSnackBar={showSnackBar}
                    page={Literal[lang].orderPages["confirmedOrders"]}
                    setImageRefreshKey={setImageRefreshKey} 
                    imageRefreshKey={imageRefreshKey}
                  />
                }
              />

              <Route
                path="/processingOrders"
                element={
                  <OrdersPage
                    key="processingOrders"
                    isMobile={isMobile}
                    isManager={true}
                    refreshSidebarCounts={refreshSidebarCounts}
                    setLoading={setLoading}
                    showSnackBar={showSnackBar}
                    page={Literal[lang].orderPages["processingOrders"]}
                    setImageRefreshKey={setImageRefreshKey} 
                    imageRefreshKey={imageRefreshKey}
                  />
                }
              />

              <Route
                path="/readyToDispatchOrders"
                element={
                  <OrdersPage
                    key="readyToDispatchOrders"
                    isMobile={isMobile}
                    isManager={true}
                    refreshSidebarCounts={refreshSidebarCounts}
                    setLoading={setLoading}
                    showSnackBar={showSnackBar}
                    page={Literal[lang].orderPages["readyToDispatchOrders"]}
                    setImageRefreshKey={setImageRefreshKey} 
                    imageRefreshKey={imageRefreshKey}
                  />
                }
              />

              <Route
                path="/onTheWayOrders"
                element={
                  <OrdersPage
                    key="onTheWayOrders"
                    isMobile={isMobile}
                    isManager={true}
                    refreshSidebarCounts={refreshSidebarCounts}
                    setLoading={setLoading}
                    showSnackBar={showSnackBar}
                    page={Literal[lang].orderPages["onTheWayOrders"]}
                    setImageRefreshKey={setImageRefreshKey} 
                    imageRefreshKey={imageRefreshKey}
                  />
                }
              />

              <Route
                path="/deliveredOrders"
                element={
                  <OrdersPage
                    key="deliveredOrders"
                    isMobile={isMobile}
                    isManager={true}
                    refreshSidebarCounts={refreshSidebarCounts}
                    setLoading={setLoading}
                    showSnackBar={showSnackBar}
                    page={Literal[lang].orderPages["deliveredOrders"]}
                    setImageRefreshKey={setImageRefreshKey} 
                    imageRefreshKey={imageRefreshKey}
                  />
                }
              />

              {/* <Route
                path="/cancelledOrders"
                element={
                  <OrdersPage
                    key="cancelledOrders"
                    isMobile={isMobile}
                    isManager={true}
                    setLoading={setLoading}
                    page={Literal[lang].orderPages["cancelledorders"]}
                    setImageRefreshKey={setImageRefreshKey} 
                    imageRefreshKey={imageRefreshKey}
                  />
                }
              /> */}

              <Route
                path="/returns"
                element={
                  <OrdersPage
                    key="returns"
                    isMobile={isMobile}
                    isManager={true}
                    refreshSidebarCounts={refreshSidebarCounts}
                    setLoading={setLoading}
                    showOrderStatuses={false}
                    showSnackBar={showSnackBar}
                    page={Literal[lang].orderPages["returns"]}
                    setImageRefreshKey={setImageRefreshKey} 
                    imageRefreshKey={imageRefreshKey}
                  />
                }
              />

              {/* Dynamically generate after-sale pages */}
              {AFTER_SALE_STATUSES.map((status) => {
                const pathName = status.toLowerCase();
                return (
                  <Route
                    key={pathName}
                    path={`/${pathName}_orders`}
                    element={
                      <OrdersPage
                        key={pathName}
                        isMobile={isMobile}
                        isManager={true}
                        setLoading={setLoading}
                        refreshSidebarCounts={refreshSidebarCounts}
                        showSnackBar={showSnackBar}
                        page={Literal[lang].orderPages[pathName]}
                        setImageRefreshKey={setImageRefreshKey} 
                        imageRefreshKey={imageRefreshKey}
                      />
                    }
                  />
                );
              })}

              <Route path="/category" element={
                    <Category 
                      isMobile={isMobile} 
                      loading={loading}
                      setLoading={setLoading}
                      showSnackBar={showSnackBar}
                      imageRefreshKey={imageRefreshKey}
                      setImageRefreshKey={setImageRefreshKey}
                    />
                  } />
              <Route path="/auditTrail" element={
                    <AuditTrail 
                      isMobile={isMobile} 
                      loading={loading}
                      setLoading={setLoading}
                      showSnackBar={showSnackBar}
                      imageRefreshKey={imageRefreshKey}
                      setImageRefreshKey={setImageRefreshKey}
                    />
                  } />
              <Route path="/quotaUsage" element={
                <QuotaUsage 
                  isMobile={isMobile} 
                  loading={loading}
                  setLoading={setLoading}
                  showSnackBar={showSnackBar}
                  imageRefreshKey={imageRefreshKey}
                  setImageRefreshKey={setImageRefreshKey}
                />
              } />
              <Route path="/teamUsers" element={
                <TeamUsers 
                  isMobile={isMobile} 
                  loading={loading}
                  setLoading={setLoading}
                  showSnackBar={showSnackBar}
                  imageRefreshKey={imageRefreshKey}
                  setImageRefreshKey={setImageRefreshKey}
                />
              } />
              <Route path="/customers" element={
                <Customers 
                  isMobile={isMobile} 
                  loading={loading}
                  setLoading={setLoading}
                  showSnackBar={showSnackBar}
                  imageRefreshKey={imageRefreshKey}
                  setImageRefreshKey={setImageRefreshKey}
                />
              } />
              <Route path="/products" element={
                    <Product 
                      isMobile={isMobile} 
                      loading={loading}
                      setLoading={setLoading}
                      showSnackBar={showSnackBar}
                      setImageRefreshKey={setImageRefreshKey}
                      imageRefreshKey={imageRefreshKey}
                    />
                  } />
              <Route path="/inventory" element={
                    <Inventory 
                      isMobile={isMobile} 
                      loading={loading}
                      setLoading={setLoading}
                      showSnackBar={showSnackBar}
                      setImageRefreshKey={setImageRefreshKey}
                    />
                  } />
              <Route path="/pages" element={
                  <Pages 
                    isMobile={isMobile} 
                    loading={loading}
                    setLoading={setLoading}
                    showSnackBar={showSnackBar}
                    setImageRefreshKey={setImageRefreshKey}
                    location={location}
                  />
              } />
               <Route path="/sizeChart" element={
                  <SizeChart 
                    isMobile={isMobile} 
                    loading={loading}
                    setLoading={setLoading}
                    showSnackBar={showSnackBar}
                    setImageRefreshKey={setImageRefreshKey}
                    location={location}
                  />
              } />
              <Route path="/wishlist" element={<Wishlist isMobile={isMobile} />} />
              <Route path="/webConfigs" element={<Navigate to="/webTrendingBar" replace />} />
              <Route path="/switchOnOffWebsite" element={<SwitchOnOffWebsite isMobile={isMobile} setLoading={setLoading} showSnackBar={showSnackBar}/>} />
              <Route path="/webTrendingBar" element={<WebTrendingBarWrapper isMobile={isMobile} setLoading={setLoading} showSnackBar={showSnackBar}/>} />
              <Route path="/homePage" element={<HomeConfigs isMobile={isMobile} setLoading={setLoading} showSnackBar={showSnackBar}  setImageRefreshKey={setImageRefreshKey} imageRefreshKey={imageRefreshKey}/>} />
              <Route path="/pendingOrders" element={<Orders isMobile={isMobile} />} />
              <Route
                path="/profile"
                element={
                  <Profile
                    isMobile={isMobile}
                    setLoading={setLoading}
                    showSnackBar={showSnackBar}
                    imageRefreshKey={imageRefreshKey}
                    setImageRefreshKey={setImageRefreshKey}
                  />
                }
              />
              {/* <Route path="/pages/about_us" element={<AboutUs isMobile={isMobile} />} />
            <Route path="/company/about_us" element={<AboutUs isMobile={isMobile} />} /> */}
            <Route path="*" element={<NotFound />} />
            </Route>

            {/* Routes WITHOUT Sidebar or custom styles */}
            {/* <Route path="/company/contact_us" element={<ContactUs isMobile={isMobile} />} /> */}
            <Route path="*" element={<NotFound />} />
          </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App;