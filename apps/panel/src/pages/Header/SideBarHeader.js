import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import Sidebar from "./SideBar";
import Diversity2OutlinedIcon from "@mui/icons-material/Diversity2Outlined";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import AppSettingsAltOutlinedIcon from "@mui/icons-material/AppSettingsAltOutlined";
import PowerSettingsNewOutlinedIcon from "@mui/icons-material/PowerSettingsNewOutlined";
import HorizontalSplitOutlinedIcon from "@mui/icons-material/HorizontalSplitOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import NoCrashOutlinedIcon from "@mui/icons-material/NoCrashOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import LoopOutlinedIcon from "@mui/icons-material/LoopOutlined";
import WhereToVoteOutlinedIcon from "@mui/icons-material/WhereToVoteOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import FilterFramesOutlinedIcon from "@mui/icons-material/FilterFramesOutlined";
import AssignmentReturnedOutlinedIcon from "@mui/icons-material/AssignmentReturnedOutlined";
import InputOutlinedIcon from "@mui/icons-material/InputOutlined";
import CancelScheduleSendOutlinedIcon from "@mui/icons-material/CancelScheduleSendOutlined";
import DoNotDisturbOffOutlinedIcon from "@mui/icons-material/DoNotDisturbOffOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { OrderServices } from "@utils/services/OrderServices";
import { LanguageContext } from "@ui/literals/LanguageProvider";
import Literal from "@ui/literals";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import { AuthContext } from '@utils/helper/ApiConfig/AuthProvider';

const Header = forwardRef(
  (
    {
      isMobile,
      loading,
      setLoading,
      selectedItem,
      setSelectedItem,
      onLoginClick,
      imageRefreshKey,
      setImageRefreshKey,
    },
    ref
  ) => {
    const { getOrdersCountforAllStatuses } = OrderServices();
    const [counts, setCounts] = useState({});
    const { lang } = useContext(LanguageContext);
    
    // ✅ Get User Role
    const { user } = useContext(AuthContext);
    // Ensure we handle case sensitivity if DB returns 'admin' vs 'ADMIN'
    const userRole = user?.role ? user.role.toUpperCase() : null; 

    useEffect(() => {
      fetchOrdersCount();
    }, []);

    const fetchOrdersCount = async () => {
      setLoading(true);
      await getOrdersCountforAllStatuses()
        .then((res) => {
          const countMap = {};
          Object.entries(res || {}).forEach(([status, count]) => {
            countMap[status] = count;
          });
          setCounts(countMap);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    useImperativeHandle(ref, () => ({
      fetchOrdersCount,
    }));

    // Wrapped in useMemo to recalculate when counts/lang/userRole changes
    const sideBarContent = useMemo(() => {
      
      // Helper function defined inside useMemo to access 'counts'
      const getAlertCount = (textKeys = []) => {
        let total = 0;
        textKeys.forEach((key) => {
          const statuses = Literal[lang].orderPages[key]?.statuses || [];
          statuses.forEach((status) => {
            total += counts?.[status] || 0;
          });
        });
        return total;
      };

      // 1. Define All Possible Items
      // Note: If 'allowedRoles' is missing, it implies accessible by BOTH Admin & Manager
      const allMenuItems = [
        {
          text: "orders",
          icon: <FilterFramesOutlinedIcon />,
          // allowedRoles: ["ADMIN", "MANAGER"], // Optional: implied since only they can login
          alert: getAlertCount([
            "newOrders", "pendingOrders", "confirmedOrders", "processingOrders",
            "readyToDispatchOrders", "onTheWayOrders", "deliveredOrders",
          ]),
          subItems: [
            { text: "newOrders", icon: <NewReleasesOutlinedIcon />, alert: getAlertCount(["newOrders"]) },
            { text: "pendingOrders", icon: <ErrorOutlineOutlinedIcon />, alert: getAlertCount(["pendingOrders"]) },
            { text: "confirmedOrders", icon: <ThumbUpAltOutlinedIcon />, alert: getAlertCount(["confirmedOrders"]) },
            { text: "processingOrders", icon: <LoopOutlinedIcon />, alert: getAlertCount(["processingOrders"]) },
            { text: "readyToDispatchOrders", icon: <NoCrashOutlinedIcon />, alert: getAlertCount(["readyToDispatchOrders"]) },
            { text: "onTheWayOrders", icon: <LocalShippingOutlinedIcon />, alert: getAlertCount(["onTheWayOrders"]) },
            { text: "deliveredOrders", icon: <WhereToVoteOutlinedIcon />, alert: getAlertCount(["deliveredOrders"]) },
            { text: "completedOrders", icon: <TaskAltOutlinedIcon />, alert: getAlertCount(["completedOrders"]) },
          ],
        },
        {
          text: "returns",
          icon: <AssignmentReturnedOutlinedIcon />,
          alert: getAlertCount([
            "return_requested", "returned", "return_rejected", "cancellation_requested",
            "cancelled", "cancellation_rejected", "rto_requested", "rto_rejected",
            "rto_approved", "rto_in_progress", "rto_delivered", "rto_verified", "rto_refunded",
          ]),
          subItems: [
            { text: "return_requested_orders", icon: <InputOutlinedIcon />, alert: getAlertCount(["return_requested"]) },
            { text: "returned_orders", icon: <ArchiveOutlinedIcon />, alert: getAlertCount(["returned"]) },
            { text: "return_rejected_orders", icon: <ThumbDownAltOutlinedIcon />, alert: getAlertCount(["return_rejected"]) },
            { text: "cancellation_requested_orders", icon: <CancelScheduleSendOutlinedIcon />, alert: getAlertCount(["cancellation_requested"]) },
            { text: "cancelled_orders", icon: <CancelOutlinedIcon />, alert: getAlertCount(["cancelled"]) },
            { text: "cancellation_rejected_orders", icon: <DoNotDisturbOffOutlinedIcon />, alert: getAlertCount(["cancellation_rejected"]) },
            { text: "rto_requested_orders", icon: <AssignmentLateOutlinedIcon />, alert: getAlertCount(["rto_requested"]) },
            { text: "rto_rejected_orders", icon: <BlockOutlinedIcon />, alert: getAlertCount(["rto_rejected"]) },
            { text: "rto_approved_orders", icon: <CheckCircleOutlineOutlinedIcon />, alert: getAlertCount(["rto_approved"]) },
            { text: "rto_in_progress_orders", icon: <AutorenewOutlinedIcon />, alert: getAlertCount(["rto_in_progress"]) },
            { text: "rto_delivered_orders", icon: <MoveToInboxOutlinedIcon />, alert: getAlertCount(["rto_delivered"]) },
            { text: "rto_verified_orders", icon: <VerifiedOutlinedIcon />, alert: getAlertCount(["rto_verified"]) },
            { text: "return_refunded_orders", icon: <CreditScoreOutlinedIcon />, alert: getAlertCount(["returned_refunded"]) },
            { text: "cancellation_refunded_orders", icon: <PriceCheckOutlinedIcon />, alert: getAlertCount(["cancellation_refunded"]) },
            { text: "rto_refunded_orders", icon: <PaidOutlinedIcon />, alert: getAlertCount(["rto_refunded"]) },
          ],
        },
        { text: "inventory", icon: <Inventory2OutlinedIcon /> },
        { text: "products", icon: <WidgetsOutlinedIcon /> },
        { text: "category", icon: <CategoryOutlinedIcon /> },
        { text: "customers", icon: <Groups2OutlinedIcon /> },
        
        // 🔒 ADMIN ONLY: Team Management
        { 
            text: "teamUsers", 
            icon: <Diversity2OutlinedIcon />,
            allowedRoles: ["ADMIN"] 
        },
        
        { text: "pages", icon: <ArticleOutlinedIcon /> },
        { text: "sizeChart", icon: <StraightenOutlinedIcon /> },
        
        // 🔒 ADMIN ONLY: Audit Trail
        { 
            text: "auditTrail",
            icon: <AssignmentOutlinedIcon />,
            allowedRoles: ["ADMIN"],
            subItems: [
                { text: "quotaUsage", icon: <DataUsageIcon /> },
            ]
        },
        
        // 🔒 ADMIN ONLY: Web Configs
        {
          text: "webConfigs",
          icon: <AppSettingsAltOutlinedIcon />,
          // allowedRoles: ["ADMIN"],
          subItems: [
            { text: "webTrendingBar", icon: <HorizontalSplitOutlinedIcon /> },
            { text: "homePage", icon: <HouseOutlinedIcon /> },
            { text: "switchOnOffWebsite", icon: <PowerSettingsNewOutlinedIcon />, allowedRoles: ["ADMIN"]  },
          ],
        },
      ];

      // 2. Filter Function based on 'userRole'
      const filterMenuItems = (items) => {
        return items.reduce((acc, item) => {
          // Rule 1: Check Permissions
          if (item.allowedRoles && !item.allowedRoles.includes(userRole)) {
            return acc; // Skip this item if role doesn't match
          }

          // Rule 2: Recursively filter subItems if they exist
          let processedSubItems = item.subItems;
          if (item.subItems && item.subItems.length > 0) {
            processedSubItems = filterMenuItems(item.subItems);
          }

          // Push to accumulator
          acc.push({ ...item, subItems: processedSubItems });
          return acc;
        }, []);
      };

      return filterMenuItems(allMenuItems);

    }, [counts, lang, userRole]); 

    return (
      <div className="header-main-container">
        <Sidebar
          isMobile={isMobile}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          onLoginClick={onLoginClick}
          imageRefreshKey={imageRefreshKey}
          setImageRefreshKey={setImageRefreshKey}
          sideBarContent={sideBarContent}
        />
      </div>
    );
  }
);

export default Header;