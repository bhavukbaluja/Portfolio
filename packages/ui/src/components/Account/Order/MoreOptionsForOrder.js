import { IconButton, Tooltip } from "@mui/material";
import React, { useContext, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { LanguageContext } from "@ui/literals/LanguageProvider";
import Literal from "@ui/literals";
import { URL_CONFIG, URL_Get_Profile_Img } from "@utils/Config/URLs";
import useNavigateTo from "@utils/helper/ApiConfig/useNavigateTo.js";
import OrderStatusPopover from "./OrderStatusPopover"; // import new file
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { OrderServices } from "@utils/services/OrderServices";
import TrackingDialog from "./TrackingDialog";
import ModeOfTravelOutlinedIcon from '@mui/icons-material/ModeOfTravelOutlined';
import AvatarWithAuth from "@ui/components/UI/widgets/AvatarWithAuth";
import AutoAwesomeMotionOutlinedIcon from '@mui/icons-material/AutoAwesomeMotionOutlined';

const MoreOptionsForOrder = ({order, entity, isMobile, setImageRefreshKey, imageRefreshKey, refreshSidebarCounts, isManager, setLoading, openDetails, showSnackBar, refresh})=>{

    const { lang } = useContext(LanguageContext);
    const [anchorEl, setAnchorEl] = useState(null); // for popover
    const NavigateTo = useNavigateTo();
    const { updateOrderStatus } = OrderServices();
    const [openTracking, setOpenTracking] = useState(false);
    const clickedTracking = () =>{
        setOpenTracking(true);
    }

    const clickedUserDetails=()=>{
        console.log(order?.user?.id);
    }

    const handleAction = async (action, status) => {
        setLoading(true);
        // console.log("Action:", action, "Status:", status, "Order ID:", order.id);
        try{
          const res = await updateOrderStatus(order?.id, action);
          if(res?.msg){
            showSnackBar(res?.msg);
            setLoading(false);
          }
          refresh();
          refreshSidebarCounts();
        }
        catch(error){
          console.error(error);
        }
        finally{
          setLoading(false);
        }
    };

    const clickedAllOrders=()=>{
        NavigateTo("/orders","", true);
    }
    
    return(
        <>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: isMobile? 'space-evenly':'flex-end', width:isMobile? '100%':'20', alignItems: 'center', gap:'10px'}}>
        {isManager && (            
          <Tooltip title={Literal[lang].userDetails}>
              <IconButton size="small"  onClick={clickedUserDetails}>
                <AvatarWithAuth
                      imageRefreshKey={imageRefreshKey} 
                      setImageRefreshKey={setImageRefreshKey} 
                      user={order?.user} 
                      size={40} 
                      name={order?.user?.firstName + " " + order?.user?.lastName} imageUrl={URL_CONFIG.API_URL+URL_Get_Profile_Img+"/"+order?.user?.id}
                />
              </IconButton>
          </Tooltip>
        )}
        <Tooltip title={Literal[lang].trackStatus}>
            <IconButton size="small"  onClick={clickedTracking}>
                <ModeOfTravelOutlinedIcon sx={{ fontSize: 30 }} />
            </IconButton>
        </Tooltip>
        {entity=="tile" ? (
            <Tooltip title={Literal[lang].details}>
                <IconButton size="small"  onClick={openDetails} >
                    <InfoOutlinedIcon sx={{ fontSize: 30 }}/>
                </IconButton>
            </Tooltip>
        ):(
            <Tooltip title={Literal[lang].allOrders}>
                <IconButton size="small"  onClick={clickedAllOrders} >
                    <AutoAwesomeMotionOutlinedIcon sx={{ fontSize: 30 }}/>
                </IconButton>
            </Tooltip>
        )}
        {isManager && (
          /* 👇 Downward arrow icon */
          <Tooltip title={Literal[lang].moreOptions}>
            <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
              <KeyboardArrowDownIcon sx={{ fontSize: 30 }}/>
            </IconButton>
          </Tooltip>
        )}
      </div>

            {/* Popover */}
            <OrderStatusPopover
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            orderStatus={order?.status}
            onAction={handleAction}
          />
          <TrackingDialog
              open={openTracking}
              setOpen={setOpenTracking}
              entity="order"
              entityId={order?.id}
              setLoading={setLoading}
          />
        </>
    )
}
export default MoreOptionsForOrder;